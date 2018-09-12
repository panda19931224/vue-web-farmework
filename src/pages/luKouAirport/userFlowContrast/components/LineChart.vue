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
        series: [{
          data: this.data,
          type: 'line',
          symbol: 'diamond',
          symbolSize: 14,
          lineStyle: {
            normal: {
              color: '#039acf',
              width: 2,
              type: 'solid'
            }
          },
          itemStyle: {
            normal: {
              borderWidth: 2,
              borderColor: '#039acf',
              color: '#039acf'
            }
          }
        }]
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
