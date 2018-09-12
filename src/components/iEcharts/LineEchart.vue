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
      default: '90%'
    },
    height: {
      type: String,
      default: '80%'
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
          x: 'center',
          textStyle: {
            color: '#000',
            fontSize: 18,
            fontWeight: 400
          }
        },
        legend: {
          data: this.legendData,
          x: 'center',
          y: '9%'
        },
        grid: {
          left: '5%',
          right: '8%',
          bottom: '1%',
          top: '20%',
          containLabel: true
        },
        toolbox: {
          show: false
        },
        xAxis: {
          name: '时间',
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
    // 初始化表格
    initChart () {
      this.charts = echarts.init(document.getElementById(this.chartId))
      this.charts.setOption(this.setOption)
    }
  }
}
</script>

<style lang="scss">
.line-chart {
  background-color: #fff;
}
</style>
