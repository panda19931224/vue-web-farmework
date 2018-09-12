<template>
  <div :class="className" :style="{height:height,width:width}" id="HYJHGJHJJGRRY67HJ"></div>
</template>

<script>
import echarts from 'echarts'
import '../../../static/echartsJs/china'

require('echarts/theme/macarons')
const MAP_FEATURES = echarts.getMap('china').geoJson.features
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
    touristName: {
      require: false,
      type: String,
      default: ''
    },
    timeLineData: {
      require: false,
      type: Array,
      default: () => {
        return []
      }
    },
    touristData: {
      require: false,
      type: Array,
      default: () => {
        return [{ name: '黑龙江', value: 123 }]
      }
    }
  },
  data () {
    return {
      geoCoordMap: {}
    }
  },
  watch: {
    touristData (val, oldVal) {
      this.setOption()
    }
  },
  mounted () {
    this.initChart()
    this.setOption()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  computed: {},
  methods: {
    convertData (data) {
      MAP_FEATURES.forEach((v) => {
        // 地区名称
        let name = v.properties.name
        // 地区经纬度
        this.geoCoordMap[name] = v.properties.cp
      })
      let _res = []
      for (let i = 0; i < data.length; i++) {
        let _geoCoord = this.geoCoordMap[data[i].name]
        if (_geoCoord) {
          _res.push({
            name: data[i].name,
            value: _geoCoord.concat(data[i].value)
          })
        }
      }
      return _res
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons') // 初始化
    },
    setOption () {
      this.chart.setOption({
        title: {
          text: this.touristName,
          x: 'left',
          left: '1%',
          y: '1%',
          textStyle: {
            color: '#000',
            fontSize: 14,
            fontWeight: 400
          }
        },
        tooltip: {
          show: true,
          formatter: function (params) {
            console.log(params)
            return params.name + '：' + params.data.value + '%'
          }
        },
        visualMap: {
          show: false,
          type: 'continuous',
          text: ['', ''],
          showLabel: false,
          seriesIndex: [0],
          min: 0,
          max: 100,
          inRange: {
            color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096']
          },
          textStyle: {
            color: '#000'
          },
          bottom: 30,
          left: 'left'
        },
        geo: {
          roam: false,
          map: 'china',
          itemStyle: {
            emphasis: {
              areaColor: '#fff464'
            }
          }
        },
        series: [
          {
            name: 'mapSer',
            type: 'map',
            roam: false,
            geoIndex: 0,
            label: {
              show: false
            },
            data: this.touristData
          }
        ]
      })
    }
  }
}
</script>
