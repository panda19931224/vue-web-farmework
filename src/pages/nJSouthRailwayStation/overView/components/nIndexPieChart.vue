<template>
  <div style="width:100%;height:100%;position:relative">
    <div :class="className" :style="{height:height,width:width}" :id="chartId">
    </div>
    <div class="legend_box">
      <template v-for="(item, key) in pieBarData">
        <div class="legend" :key="key">
          <i></i>
          <span>{{item.name}}<a> {{(item.value * 1 / pieBarData.reduce((a , b) => {return a + b.value * 1}, 0) * 100).toFixed(2)}}%</a></span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons')
// import { debounce } from '@/utils'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      required: false,
      type: String,
      default: '90%'
    },
    height: {
      type: String,
      default: '90%'
    },
    // 饼图传递的数值
    pieName: {
      require: false,
      type: String
    },
    chartId: {
      type: String,
      default: 'age'
    },
    pieBarData: {
      require: false,
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      chart: null,
      pieColor: ['#2486c0', '#2496c0', '#4b71c3', '#1947a9', '#14368d']
    }
  },
  watch: {
    pieBarData () {
      this.setOption()
    }
  },
  mounted () {
    this.drawBar(this.chartId)
    // this.__resizeHanlder = debounce(() => {
    //   if (this.chart) {
    //     this.chart.resize()
    //   }
    // }, 100)
    // window.addEventListener('resize', this.__resizeHanlder)
  },
  // beforeDestroy() {
  //   if (!this.chart) { return }
  //   window.removeEventListener('resize', this.__resizeHanlder)
  //   this.chart.dispose()
  //   this.chart = null
  // },
  methods: {
    drawBar (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.setOption()
    },
    setOption () {
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: ({d}%)'
        },
        color: ['#2486c0', '#2496c0', '#4b71c3', '#1947a9', '#14368d'],
        series: [
          {
            type: 'pie',
            radius: ['50%', '35%'],
            center: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.pieBarData
          }
        ]
      })
    }
  }
}
</script>
<style>
.legend_box {
  position: absolute;
  bottom: 10%;
  left: 60%;
}

.legend {
  width: 114%;
}

.legend i {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}

.legend span {
  font-size: 0.8rem;
}

.legend span a {
  color: #2486c0;
}

.legend i:nth-child(1) {
  border: 1px solid #2486c0;
}

.legend i:nth-child(2) {
  border: 1px solid #2496c0;
}

.legend i:nth-child(3) {
  border: 1px solid #4b71c3;
}

.legend i:nth-child(4) {
  border: 1px solid #1947a9;
}

.legend i:nth-child(5) {
  border: 1px solid #14368d;
}
</style>
