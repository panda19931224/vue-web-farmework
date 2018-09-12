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
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    legendData: {
      type: Array
    },
    data: {
      type: Array
    } // 数据
  },
  data () {
    return {
    }
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
          data: this.legendData,
          formatter: name => {
            const oa = this.option.series[0].data
            const num = oa[0].value + oa[1].value + oa[2].value + oa[3].value
            for (let i = 0; i < this.option.series[0].data.length; i++) {
              if (name === oa[i].name) {
                return name + '' + oa[i].value + '' + (oa[i].value / num * 100).toFixed(2) + '%'
              }
            }
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : ({d}%)'
        },
        calculable: true,
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['50%', '60%'],
            color: ['#4c6e78', '#d6b0bf', '#1aa294', '#96bebd', '#ff6434', '#24ebc5'],
            data: this.data,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  fontSize: 16,
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
