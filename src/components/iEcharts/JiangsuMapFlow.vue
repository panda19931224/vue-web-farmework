<template>
  <div :style="{width: width,height: height}" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'
import '../../../static/echartsJs/jiangsu'

export default {
  components: {},
  props: {
    isAllProvince: {
      type: Boolean,
      default: true
    }, // 是否为全省
    chartId: {
      type: String,
      default: ''
    },
    data: {
      type: Array
    }, // 数据
    title: {
      type: String,
      default: ''
    }, // 标题
    width: {
      type: String,
      default: '100%'
    }, // 宽度
    height: {
      type: String,
      default: '100%'
    } // 高度
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
      let geoCoordMap = {
        '南京': [118.8062, 31.9208],
        '宿迁': [118.5535, 33.7775],
        '常州': [119.4543, 31.5582],
        '徐州': [117.5208, 34.3268],
        '扬州': [119.4653, 32.8162],
        '无锡': [120.3442, 31.5527],
        '淮安': [118.927, 33.4039],
        '盐城': [120.2234, 33.5577],
        '苏州': [120.6519, 31.3989],
        '连云港': [119.1248, 34.552],
        '泰州': [120.0586, 32.5525],
        '南通': [121.1023, 32.1625],
        '镇江': [119.4763, 31.9702]
      } // 江苏省全部地市信息
      let convertData = function (data) {
        let res = []
        for (let i = 0; i < data.length; i++) {
          let dataItem = data[i]
          let fromCity = geoCoordMap[dataItem[0].name]
          let toCity = geoCoordMap[dataItem[1].name]
          if (fromCity && toCity) {
            res.push([{
              coord: fromCity
            }, {
              coord: toCity
            }])
          }
        }
        return res
      } // 给数据中的地市赋经纬度信息
      let color = ['#896739', '#408c8a']
      let series = [];
      [['南京', this.data]].forEach((item, i) => {
        series.push(
          {
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: 'pin',
              symbolSize: 15
            },
            lineStyle: {
              normal: {
                type: 'dashed',
                color: color[0],
                width: 2,
                opacity: 0.8,
                curveness: -0.3
              }
            },
            data: convertData(item[1])
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}'
              }
            },
            symbolSize: function (val) {
              return val[2] / 8
            }, // 光圈大小计算
            itemStyle: {
              normal: {
                color: color[1]
              }
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
              }
            })
          })
      })
      let option = {
        backgroundColor: '#ffffff',
        title: {
          text: this.title,
          x: 'center',
          y: '5%',
          textStyle: {
            color: '#000',
            fontSize: 18,
            fontWeight: 400
          }
        },
        legend: {
          show: true,
          orient: 'vertical',
          textStyle: {
            color: '#fff'
          },
          selectedMode: 'single'
        },
        geo: {
          show: true,
          map: '江苏',
          label: {
            normal: {
              show: false,
              color: '#318585'
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#cbdabd',
              borderColor: '#ffffff'
            }, // 背景色、borer颜色
            emphasis: {
              areaColor: '#ebb47c'
            } // 鼠标 hover 的背景色
          }
        },
        series: series
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
    initChart () {
      this.charts = echarts.init(document.getElementById(this.chartId))
      this.charts.setOption(this.setOption)
    }
  }
}
</script>

<style lang="scss">
</style>
