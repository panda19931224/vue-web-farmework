<template>
  <div :id="chartId" :style="{width:width,height:height}">
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  components: {},
  props: {
    chartId: {
      type: String
    }, // id
    height: {
      type: String,
      default: '100%'
    }, // 高度
    width: {
      type: String,
      default: '100%'
    }, // 宽度
    title: {
      type: String
    }, // 标题
    legendData: {
      type: Array
    },
    xAxis: {
      type: Array
    },
    yAxis: {
      type: Array
    },
    data: {
      type: Array
    }
  },
  data () {
    return {}
  },
  created () {
  },
  mounted () {
    this.initChart()
  },
  computed: {
    setOption () {
      let option = {
        title: {
          text: this.title,
          left: '1%',
          top: '5%',
          textAlign: 'left',
          textStyle: {
            color: '#000',
            fontSize: 14,
            fontWeight: 400
          }
        },
        grid: {
          left: '12%',
          top: '30%',
          right: '3%',
          bottom: '10%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ddd'
            }
          },
          backgroundColor: 'rgba(255,255,255,1)',
          padding: [5, 10],
          textStyle: {
            color: '#7588E4'
          },
          extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        legend: {
          right: 0,
          textAlign: 'center',
          x: 'center',
          top: '15%',
          data: this.legendData
        },
        xAxis: {
          name: '',
          type: 'category',
          boundaryGap: false,
          data: this.xAxis
        },
        yAxis: {
          name: '人数(人)',
          type: 'value',
          data: this.yAxis
        },
        series: this.data
      }
      return option
    }
  },
  watch: {
    data (val) {
      if (val) {
        this.initChart()
      }
    }
  },
  methods: {
    initChart () {
      this.charts = echarts.init(document.getElementById(this.chartId))
      this.charts.setOption(this.setOption)
    }
  }
}
</script>

<style lang="scss">
.MyContain {
  background-color: #fff;
}
</style>
