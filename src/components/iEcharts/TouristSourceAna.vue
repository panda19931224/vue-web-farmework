<template>
  <div :class="className" :style="{height:height,width:width}" id="HYJHGJHJJGRRY67HJ"></div>
</template>

<script>
import echarts from 'echarts'
import '../../../static/echartsJs/china'

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
    showDataRange: {
      type: Boolean,
      default: true
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
        return []
      }
    }
  },
  data () {
    return {
      // chart: undefined
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
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons') // 初始化
    },
    setOption () {
      this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          text: this.touristName,
          x: 'center',
          y: '5%',
          textStyle: {
            color: '#000',
            fontSize: 18
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: ({c}%)'
        },
        roam: false,
        dataRange: {
          show: this.showDataRange,
          min: 0,
          max: 5,
          x: '5%',
          y: '70%',
          splitList: [
            {
              start: 30,
              end: 100,
              label: '>30%',
              color: '#c54250'
            },
            {
              start: 10,
              end: 30,
              label: '10%~30%',
              color: '#644ab7'
            },
            {
              start: 5,
              end: 10,
              label: '5%~10%',
              color: '#50b8c5'
            },
            {
              start: 1,
              end: 5,
              label: '1%~5%',
              color: '#389289'
            },
            {
              end: 1,
              label: '1%以下',
              color: '#8ac2f5'
            }
          ]
        },
        roamController: {
          show: false,
          x: 'right',
          mapTypeControl: {
            china: true
          }
        },
        series: [
          {
            name: this.touristName,
            type: 'map',
            mapType: 'china',
            zoom: 1.1,
            roam: false,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: { color: '#292421', fontSize: 12 }
                }
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            data: this.touristData
          }
        ]
      })
    }
  }
}
</script>
