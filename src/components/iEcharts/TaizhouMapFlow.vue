<template>
  <div class="nanjing-mao-flow" :id="chartId" :style="{width: width,height: height}"></div>
</template>

<script>
import echarts from 'echarts'
import MapJson from '../../../static/echartsJs/321200'

export default {
  components: {},
  props: {
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
    fromLocation: {
      type: Object,
      default: () => {
        return {
          name: '江阴大桥',
          location: [120.288774, 31.934733]
        }
      }
    }, // 出发地点
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
    this.drawMap()
  },
  computed: {},
  watch: {
    data (val) {
      if (val.length > 0) {
        this.drawMap()
      }
    }
  },
  methods: {
    // 地图参数
    setOptions () {
      let allData = {
        citys: [
          {
            name: '兴化市',
            value: [119.85, 32.92]
          },
          {
            name: '靖江市',
            value: [120.27, 32.02]
          },
          {
            name: '泰兴市',
            value: [120.02, 32.17]
          },
          {
            name: '姜堰区',
            value: [120.15, 32.52]
          },
          {
            name: '高港区',
            value: [119.889569, 32.320713]
          },
          {
            name: '海陵区',
            value: [119.925789, 32.490449]
          }
        ],
        moveLines: []
      }
      // 格式化数据
      if (this.data.length > 0) {
        allData.moveLines.length = 0
        this.data.forEach((_x, index) => {
          let toObj = allData.citys.find(_y => _y.name === _x)
          if (toObj) {
            let _obj = {
              fromName: this.fromLocation.name,
              toName: _x,
              coords: [this.fromLocation.location, toObj.value]
            }
            allData.moveLines.push(_obj)
          }
        })
      }
      // 格式化源数据
      allData.citys.forEach((_x, index) => {
        allData.citys[index] = { ..._x, symbolSize: 2, itemStyle: { 'normal': { 'color': '#318585' } } }
      })
      let option = {
        backgroundColor: '#fff',
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
          show: false,
          orient: 'vertical',
          top: 'auto',
          left: 'right',
          data: ['地点', '线路'],
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          show: true,
          map: '泰州市',
          label: {
            normal: {
              show: false,
              color: '#318585'
            },
            emphasis: {
              show: false
            }
          },
          roam: false,
          zoom: 1,
          itemStyle: {
            normal: {
              areaColor: '#cbdabd',
              borderColor: '#ffffff'
            },
            emphasis: {
              areaColor: '#ebb47c'
            }
          }
        },
        series: [{
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
              formatter: '{b}',
              color: '#408c8a'
            }
          },
          symbolSize: function (val) {
            return val[2]
          }, // 光圈大小计算
          itemStyle: {
            normal: {
              color: '#408c8a'
            }
          },
          data: allData.citys
        }, {
          name: '轨迹',
          type: 'lines',
          // coordinateSystem: 'geo',
          zlevel: 2,
          large: true,
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
              color: '#645222',
              width: 2,
              opacity: 0.8,
              curveness: 0.3
            }
          },
          data: allData.moveLines
        }]
      }
      return option
    },
    // 绘制地图
    drawMap () {
      echarts.registerMap('泰州市', MapJson)
      this.charts = echarts.init(document.getElementById(this.chartId))
      this.charts.setOption(this.setOptions())
    }
  }
}
</script>

<style lang="scss">
.nanjing-mao-flow {
  background-color: #fff;
  height: 100%;
}
</style>
