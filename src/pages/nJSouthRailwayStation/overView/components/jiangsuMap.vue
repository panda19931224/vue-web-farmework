<template>
  <div :class="className" :style="{height:height,width:width}" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/province/jiangsu'

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
      default: '昨日客流来源分析'
    },
    jiangsuData: {
      type: Array,
      default: () => [{ name: '盐城市', value: 123 }]
    }
  },
  data () {
    return {}
  },
  computed: {
    bubbleData () {
      return this.jiangsuData.map(item => {
        return { name: this.wiredAxis(item.name).name, value: [...this.wiredAxis(item.name).value, item.value] }
      })
    }
  },
  watch: {
    jiangsuData () {
      this.initChart(this.chartId)
    }
  },
  mounted () {
    this.initChart(this.chartId)
  },
  methods: {
    wiredAxis (name) {
      return [{ name: '盐城市', value: [120.2234, 33.5577] }, {
        name: '徐州市',
        value: [117.5208, 34.3268]
      }, { name: '南通市', value: [121.1023, 32.1625] }, {
        name: '淮安市',
        value: [118.927, 33.4039]
      }, { name: '苏州市', value: [120.6519, 31.3989] }, {
        name: '宿迁市',
        value: [118.5535, 33.7775]
      }, { name: '连云港市', value: [119.1248, 34.552] }, {
        name: '扬州市',
        value: [119.4653, 32.8162]
      }, { name: '南京市', value: [118.8062, 31.9208] }, {
        name: '泰州市',
        value: [120.0586, 32.5525]
      }, { name: '无锡市', value: [120.3442, 31.5527] }, {
        name: '常州市',
        value: [119.4543, 31.5582]
      }, { name: '镇江市', value: [119.4763, 31.9702] }].find(item => item.name === name)
    },
    initChart (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
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
            return params.name + '：' + params.data['value']
          }
        },
        visualMap: {
          show: false,
          type: 'continuous',
          text: ['', ''],
          showLabel: true,
          seriesIndex: [0],
          min: 0,
          max: 10000,
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
          show: true,
          map: '江苏',
          roam: false,
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
            data: this.jiangsuData
          }
        ]
      })
    }
  }
}
</script>
