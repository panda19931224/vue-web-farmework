<template>
  <div class="lu-kou-airport-line-chart" :id="chartId" style="width: 100%;height: 100%;">
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  components: {},
  props: {
    chartId: {
      type: String,
      default: ''
    },
    legendData: {
      type: Array
    },
    xAxis: {
      type: Array,
      default: () => {
        return null
      }
    },
    yAxis: {
      type: Array
    },
    data: {
      type: Array,
      default: () => {
        return null
      }
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
    // 折线图的 option
    setOptions () {
      let option = {
        title: {
          text: '每日客流对比',
          x: 'center',
          top: '5%',
          textStyle: {
            color: '#000',
            fontSize: 18,
            fontWeight: 400
          }
        },
        legend: {
          data: ['从南到北', '从北到南'],
          x: 'center',
          top: '10%'
        },
        grid: {
          left: '5%',
          right: '10%',
          bottom: '1%',
          top: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              width: 1
            }
          },
          boundaryGap: false,
          data: this.xAxis,
          axisLine: {
            lineStyle: {
              color: '#ccc',
              width: 1
            }
          },
          axisLabel: {
            color: '#333',
            rotate: 45 // 刻度旋转45度角
          }
        },
        yAxis: {
          name: '人',
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ccc',
              width: 1
            }
          },
          axisLabel: {
            color: '#333'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              width: 1
            }
          }
        },
        series: [
          {
            name: '从南到北',
            data: this.data[0].data,
            type: 'line'
          },
          {
            name: '从北到南',
            data: this.data[1].data,
            type: 'line'
          }
        ]
      }
      return option
    }
  },
  watch: {
    'data': {
      handler (val, oldVal) {
        this.setOptions.series[0].data = val[0].data
        this.setOptions.series[1].data = val[1].data
        this.initChart()
      }
    },
    'xAxis': {
      handler (val, oldVal) {
        this.setOptions.xAxis.data = val
        this.initChart()
      }
    }
  },
  methods: {
    // 加载echarts
    initChart () {
      this.charts = echarts.init(document.getElementById(this.chartId))
      this.charts.setOption(this.setOptions)
    }
  }
}
</script>

<style lang="scss">
  .lu-kou-airport-line-chart {
    background-color: #fff;
  }
</style>
