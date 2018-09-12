<template>
  <div :class="className" :style="{height:height,width:width}" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  components: {},
  props: {
    className: {
      type: String,
      default: ''
    },
    chartId: {
      type: String,
      default: 'pieChart'
    },
    title: {
      type: String,
      default: ''
    }, // 图表标题
    width: {
      type: String,
      default: '98%'
    },
    height: {
      type: String,
      default: '90%'
    },
    legendData: {
      type: Array
    },
    data: {
      type: Array
    } // 数据
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
      let option = {
        title: {
          text: this.title,
          x: 'left',
          left: '3%',
          top: '6%',
          textStyle: {
            color: '#000',
            fontSize: 14,
            fontWeight: 400
          }
        },
        calculable: true,
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: ['20%', '40%'],
            center: ['48%', '58%'],
            color: ['#4c6e78', '#d6b0bf', '#1aa294', '#96bebd', '#ff6434'],
            roseType: 'radius',
            data: this.data,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  fontSize: 12,
                  formatter: '{b} \n{d}%'
                }
              },
              labelLine: {
                normal: {
                  length: 0,
                  length2: 10
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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
    // 初始化表格
    initChart () {
      this.charts = echarts.init(document.getElementById(this.chartId))
      this.charts.setOption(this.setOption)
    }
  }
}
</script>

<style lang="scss">
</style>
