<template>
  <div :id="chartId" style="width:100%;height: 90%;">
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  components: { echarts },
  props: {
    data: {
      type: Array
    }, // 数据
    links: {
      type: Array
    },
    chartId: {
      type: String,
      default: () => {
        return ''
      }
    },
    chartText: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data () {
    return {
      SankeyColor: ['#4f98c6', '#1160ba', '#b84973', '#8149b8', '#edab64', '#4f6ec6', '#a66edc', '#2490c0', '#00a6a3', '#cd3732']
    }
  },
  created () {
  },
  mounted () {
    this.initChart()
  },
  computed: {
    // 设置
    setOption () {
      let option = {
        title: {
          text: this.chartText,
          x: 'center',
          y: '5%',
          padding: [20, 0, 400, 0],
          textStyle: {
            color: '#000',
            fontSize: 18,
            fontWeight: 400
          }
        },
        grid: {
          left: '5%',
          top: '50%'
        },
        series: {
          type: 'sankey',
          layout: '0',
          left: '10%',
          top: '20%',
          data: this.data.map((item, index) => {
            return { name: item.name, itemStyle: { normal: { color: this.SankeyColor[index] } } }
          }),
          links: this.links,
          lineStyle: {
            normal: {
              color: 'source',
              curveness: 0.5
            }
          },
          layoutIterations: 0,
          color: ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(0,0,255)']
        }
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
