<template>
  <div :id="chartsId" :style="{height:height,width:width}" ref="barChart"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
// import { debounce } from '@/utils'
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    chartsId: '',
    legends: {
      type: Array,
      default: null
    },
    lineChartData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      eOptions: {
        title: {
          text: '停留时长分析',
          textStyle: {
            color: '#000'
          },
          left: '43%',
          top: '0'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.legends,
          top: '5%'
        },
        grid: {
          top: '10%',
          left: '8%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: [
          {
            name: '',
            type: 'category',
            axisLabel: {
              color: '#000',
              rotate: 15
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#5ab1ef'
              }
            },
            data: (this.lineChartData.xAxis === undefined) ? this.lineChartData.xAxis : this.lineChartData.xAxis.map(item => item.replace(/(^\s*)|(\s*$)/g, ''))
          }
        ],
        yAxis: [
          {
            name: '时间(h)',
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#5ab1ef'
              }
            },
            axisLabel: {
              color: '#000'
            }
          }
        ],
        series: [
          {
            name: '总平均停留时长',
            type: 'bar',
            barGap: 0,
            barWidth: '18%',
            itemStyle: {
              normal: {
                color: '#3898BE',
                barBorderRadius: [15, 15, 0, 0],
                shadowColor: 'rgba(0,0,0,0.1)',
                shadowBlur: 3,
                shadowOffsetY: 3
              }
            },
            data: this.lineChartData.f_duration
          },
          {
            name: '省内停留时长',
            type: 'bar',
            barGap: 0,
            barWidth: '18%',
            itemStyle: {
              normal: {
                color: '#29C2BD',
                barBorderRadius: [15, 15, 0, 0],
                shadowColor: 'rgba(0,0,0,0.1)',
                shadowBlur: 3,
                shadowOffsetY: 3
              }
            },
            data: this.lineChartData.f_duration_inpro
          },
          {
            name: '省外停留时长',
            type: 'bar',
            barGap: 0,
            barWidth: '18%',
            itemStyle: {
              normal: {
                color: '#D6B0BF',
                barBorderRadius: [15, 15, 0, 0],
                shadowColor: 'rgba(0,0,0,0.1)',
                shadowBlur: 3,
                shadowOffsetY: 3
              }
            },
            data: this.lineChartData.f_duration_outpro
          }
        ]
      }
    }
  },
  mounted () {
    this.initChart()
    // this.__resizeHanlder = debounce(() => {
    //   if (this.chart) {
    //     this.chart.resize()
    //   }
    // }, 100)
    // window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    'lineChartData': {
      handler (val, oldval) {
        this.eOptions.xAxis[0].data = val.xAxis
        this.eOptions.series[0].data = val.f_duration
        this.eOptions.series[1].data = val.f_duration_inpro
        this.eOptions.series[2].data = val.f_duration_outpro
        this.chart.setOption(this.eOptions)
      }
    }
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption(this.eOptions)
    }
  }
}
</script>
