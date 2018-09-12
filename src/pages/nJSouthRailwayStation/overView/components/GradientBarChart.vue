<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    // 图表需要传递的数据
    GBarName: {
      require: false,
      type: String,
      default: ''
    },
    GBarData: {
      require: false,
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      chart: null
      // eOptions:
    }
  },
  watch: {
    GBarData () {
      this.setOption()
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
  // beforeDestroy() {
  //   if (!this.chart) {
  //     return
  //   }
  //   // window.removeEventListener('resize', this.__resizeHanlder)
  //   this.chart.dispose()
  //   this.chart = null
  // },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOption()
    },
    setOption () {
      this.chart.setOption({
        title: {
          text: this.GBarName,
          padding: ['10', '0', '20', '20'],
          textStyle: {
            fontSize: 14,
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '10%',
          right: '21%',
          bottom: '-10',
          top: '30',
          containLabel: true
        },
        yAxis: [{
          data: this.GBarData.cityNames,
          type: 'category',
          position: 'left',
          offset: 0,
          inverse: true,
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 12,
              color: '#000'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#2548ac'
            }
          }
        }],
        xAxis: [{
          type: 'value',
          axisLabel: {
            show: false,
            textStyle: {
              fontSize: 12,
              color: '#53a8fa'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#192469'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#17367c'
            }
          }
        }],
        backgroundColor: '#fff',
        series: [{
          type: 'bar',
          barWidth: '60%',
          barCategoryGap: '50%',
          data: this.GBarData.cityPercents,
          label: {
            normal: {
              show: true,
              position: 'right',
              distance: 15,
              formatter: function (params) {
                return params.value + '%'
              },
              textStyle: {
                color: '#000'
              }
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#29C1BE'
              }, {
                offset: 1,
                color: '#6B70C0'
              }], false),
              barBorderRadius: [50, 50, 50, 50],
              shadowColor: 'rgba(0,0,0,0.1)',
              shadowBlur: 3,
              shadowOffsetY: 3
            }
          }
        }]
      })
    }
  }
}
</script>
