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
      default: 'holidayPassenger'
    },
    holidayPassenger: {
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
    holidayPassenger () {
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
          text: '节日客流对比', // this.fldData.chartName
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
          data: ['元旦', '春节', '清明', '端午', '五一', '中秋', '国庆', '昨日']
        },
        xAxis: [{
          name: '时间',
          show: true,
          type: 'category',
          align: 'center',
          boundaryGap: false,
          data: this.holidayPassenger && this.holidayPassenger.map(item => item.date),
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
            name: '元旦',
            type: 'line',
            lineStyle: {
              normal: {
                color: '#b8498a'
              }
            },
            data: this.holidayPassenger && this.holidayPassenger.map(item => item.newYear)
          },
          {
            name: '春节',
            type: 'line',
            lineStyle: {
              normal: {
                color: '#6c49b8'
              }
            },
            data: this.holidayPassenger && this.holidayPassenger.map(item => item.chineseNewYear)
          },
          {
            name: '清明',
            type: 'line',
            lineStyle: {
              normal: {
                color: '#4588d6'
              }
            },
            data: this.holidayPassenger && this.holidayPassenger.map(item => item.qingMing)
          },
          {
            name: '端午',
            type: 'line',
            lineStyle: {
              normal: {
                color: '#43adc5'
              }
            },
            data: this.holidayPassenger && this.holidayPassenger.map(item => item.dragonBoatFestival)
          },
          {
            name: '五一',
            type: 'line',
            lineStyle: {
              normal: {
                color: '#379392'
              }
            },
            data: this.holidayPassenger && this.holidayPassenger.map(item => item.labourDay)
          },
          {
            name: '中秋',
            type: 'line',
            lineStyle: {
              normal: {
                color: '#519337'
              }
            },
            data: this.holidayPassenger && this.holidayPassenger.map(item => item.midAutumn)
          },
          {
            name: '国庆',
            type: 'line',
            lineStyle: {
              normal: {
                color: '#938337'
              }
            },
            data: this.holidayPassenger && this.holidayPassenger.map(item => item.nationalDay)
          },
          {
            name: '昨日',
            type: 'line',
            lineStyle: {
              normal: {
                color: '#912927'
              }
            },
            data: this.holidayPassenger && this.holidayPassenger.map(item => item.yesterday)
          }
        ]
      })
    }
  }
}
</script>
