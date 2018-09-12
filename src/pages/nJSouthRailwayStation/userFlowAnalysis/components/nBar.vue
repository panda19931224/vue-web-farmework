<template>
  <div :class="className" style="width:100%;height:100%;" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
// import { debounce } from '@/utils'
var dataShadow = []
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
    chartId: {
      type: String,
      default: 'bv'
    },
    xAxis: {
      type: Array,
      default: () => {
        return ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    },
    fldData: {
      type: Array,
      default: () => {
        return [100, 200, 300, 400, 500, 600, 700]
      }
    }
  },
  data () {
    return {

    }
  },
  watch: {
    xAxis () {
      this.setOption()
    },
    fldData () {
      this.setOption()
    }
  },
  mounted () {
    this.drawBar(this.chartId)
  },
  methods: {
    drawBar (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.setOption()
    },
    setOption () {
      this.charts.setOption({
        title: {
          text: '过去一周每日候车时长'
        },
        xAxis: {
          data: this.xAxis,
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#000'
            },
            interval: 0
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          name: '(分钟)',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0.05)'
              }
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow,
            animation: false
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {
                      offset: 0,
                      color: '#83bff6'
                    },
                    {
                      offset: 0.5,
                      color: '#188df0'
                    },
                    {
                      offset: 1,
                      color: '#188df0'
                    }
                  ]
                )
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {
                      offset: 0,
                      color: '#2378f7'
                    },
                    {
                      offset: 0.7,
                      color: '#2378f7'
                    },
                    {
                      offset: 1,
                      color: '#83bff6'
                    }
                  ]
                )
              }
            },
            data: this.fldData
          }
        ]
      })
    }
  }
}
</script>
