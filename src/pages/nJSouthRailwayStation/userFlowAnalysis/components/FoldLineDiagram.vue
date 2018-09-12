<template>
  <div :class="className" style="width:100%;height:100%;" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
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
    chartId: {
      type: String,
      default: 'yeterdayPassenger'
    },
    yeterdayPassenger: {
      type: Array,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      n: 1
    }
  },
  watch: {
    yeterdayPassenger () {
      this.setOption()
    }
  },
  mounted () {
    this.drawBar(this.chartId)
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
  //   window.removeEventListener('resize', this.__resizeHanlder)
  //   this.chart.dispose()
  //   this.chart = null
  // },
  methods: {
    drawBar (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.setOption()
    },
    setOption () {
      this.charts.setOption({
        title: {
          text: '昨日分时段客流', // this.fldData.chartName
          left: 'left',
          top: '0',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '15px',
          left: 'center',
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          padding: [20, 10, 20, 10],
          data: ['1', '2', '3']
        },
        xAxis: [{
          name: '时间',
          show: true,
          type: 'category',
          align: 'center',
          boundaryGap: false,
          data: this.yeterdayPassenger && this.yeterdayPassenger.map(item => item.date),
          axisLabel: {
            color: '#000',
            rotate: 0
          }
        }],
        yAxis: [{
          name: '客流量(人)',
          type: 'value',
          axisLabel: {
            color: '#000'
          }
        }],
        series: [
          {
            name: '',
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#4B71C3',
                borderColor: '#fff',
                borderWidth: 2
              }
            },
            lineStyle: {
              normal: {
                color: '#4B71C3'
              }
            },
            areaStyle: {
              normal: {
                color: '#DAE1F3'
              }
            },
            data: this.yeterdayPassenger && this.yeterdayPassenger.map(item => item.value),
            markPoint: {
              itemStyle: {
                normal: {
                  color: '#cb3d58'
                }
              },
              data: [
                {type: 'max', name: '最大值'}
              ]
            }
          }
        ]
      })
    }
  }
}
</script>
