<template>
  <div :class="className" :style="{height:height,width:width}" id="BARCHARTHJTIOOVF"></div>
</template>

<script>
import echarts from 'echarts'
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
    echartsTitle: {
      type: Object,
      default: null
    },
    echartsLegend: {
      type: Object,
      default: null
    },
    echartsXAxis: {
      type: Array,
      default: null
    },
    echartsYAxis: {
      type: Array,
      default: null
    },
    echartSeries: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      // chart: null
      // eOptions:
    }
  },
  mounted () {
    this.initBarChart()
  },
  beforeRouteUpdate () {
    this.setOption()
  },
  methods: {
    initBarChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOption()
    },
    setOption () {
      this.chart.setOption({
        title: this.echartsTitle,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        // grid: {
        //   left: '3%',
        //   right: '4%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        legend: this.echartsLegend,
        xAxis: this.echartsXAxis,
        yAxis: this.echartsYAxis,
        series: this.echartSeries
      })
    }
  }
}
</script>
