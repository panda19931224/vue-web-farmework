<template>
  <div :class="className" :style="{height:height,width:width}" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'
import '../../../static/echartsJs/jiangsu'

require('echarts/theme/macarons') // echarts theme
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    chartId: {
      type: String,
      default: 'jiangsu'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    touristName: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  watch: {
    data () {
      this.drawBar(this.chartId)
    }
  },
  mounted () {
    this.drawBar(this.chartId)
  },
  methods: {
    drawBar (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title: {
          text: this.touristName,
          x: 'center',
          y: '5%',
          textStyle: {
            color: '#000',
            fontSize: 18,
            fontWeight: 400
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: ({c}%)'
        },
        dataRange: {
          min: 0,
          max: 5,
          x: '5%',
          y: '70%',
          splitList: [
            {
              start: 30,
              end: 100,
              label: '>30%',
              color: '#67ced7'
            },
            {
              start: 10,
              end: 30,
              label: '10%~30%',
              color: '#63ddc6'
            },
            {
              start: 5,
              end: 10,
              label: '5%~10%',
              color: '#62e4b4'
            },
            {
              start: 1,
              end: 5,
              label: '1%~5%',
              color: '#a5c6e5'
            },
            {
              end: 1,
              label: '1%以下',
              color: '#a5c6e5'
            }
          ]
        },
        visualMap: {
          show: true,
          min: 0,
          max: 500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ['#DCEBF5', '#DCEBF5']
          }
        },
        geo: {
          show: true,
          map: '江苏',
          label: {
            normal: {
              show: true,
              color: '#298182'
            },
            emphasis: {
              show: true
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#2B91B7',
              borderColor: '#fff'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          }
        },
        series: [
          {
            name: 'credit_pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: this.data,
            label: {
              normal: {
                formatter: '{b}',
                position: 'center',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#67d0d4'
              }
            }
          },
          {
            type: 'map',
            map: 'jiangsu',
            geoIndex: 0,
            aspectScale: 0.75, // 长宽比
            showLegendSymbol: true, // 存在legend时显示
            label: {
              normal: {
                show: true,
                offset: [100, 40],
                position: 'inside'
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: '#28837c'
                }
              }
            },
            zoom: 0.5,
            roam: false,
            itemStyle: {
              normal: {
                areaColor: '#a5c6e5',
                borderColor: '#a5c6e5'
              },
              emphasis: {
                areaColor: '#28837c'
              }
            },
            animation: true,
            data: this.data
          }
        ]
      })
    }
  }
}
</script>
