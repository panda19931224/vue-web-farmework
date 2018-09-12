<template>
  <div :class="className" :style="{height:height,width:width}" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  components: {},
  props: {
    chartId: {
      type: String,
      default: 'lineChart'
    },
    className: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '98%'
    },
    height: {
      type: String,
      default: '100%'
    },
    title: {
      type: String
    },
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
          x: 'left',
          left: '2%',
          top: '5%',
          textStyle: {
            color: '#000',
            fontSize: 14,
            fontWeight: 400
          }
        },
        legend: {
          right: 0,
          textAlign: 'center',
          x: 'center',
          top: '15%',
          data: this.legendData
        },
        grid: {
          left: '15%',
          right: '2%',
          bottom: '18%',
          top: '30%'
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
        xAxis: {
          name: '',
          type: 'category',
          boundaryGap: false,
          data: this.xAxis,
          axisLabel: {
            rotate: 30 // 刻度旋转45度角
          }
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
    // 初始化表格
    initChart () {
      this.charts = echarts.init(document.getElementById(this.chartId))
      this.charts.setOption(this.setOption)
    }
  }
}
</script>

<style lang="scss">
.over-view-line-no-area-chart {
  background-color: #fff;
}
</style>
