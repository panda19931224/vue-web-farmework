<template>
  <div class="user-flow-contrast">
    <div class="left animated fadeInLeft">
      <i-line-chart chartId="userFlowContrastLineChart" :xAxis="lineChart.xAxis" :data="lineChart.data"></i-line-chart>
    </div>
    <div class="right animated fadeInRight">
      <i-table :columns="columns" :list="list" :total="list.length" :otherHeight="otherHeight"
               :options="options"></i-table>
    </div>
  </div>
</template>

<script>
import iLineChart from './components/LineChart'
import iTable from '../../../components/iTable/Index'
import BLL from './Index'

export default {
  components: { iLineChart, iTable },
  data () {
    return {
      lineChart: {
        xAxis: [],
        data: []
      },
      columns: [
        {
          prop: 'date',
          label: '日期',
          align: 'center',
          render (row) {
            return row.date.substring(0, 4) + '-' + row.date.substring(4, 6) + '-' + row.date.substring(6)
          }
        },
        {
          prop: 'value',
          label: '客流人数(人)',
          align: 'center'
        }
      ],
      list: [],
      pagination: {
        pageIndex: 1,
        pageSize: 20
      }, // 分页参数
      otherHeight: 160, // 表格之外的高度
      options: {
        stripe: true, // 是否为斑马纹 table
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      }
    }
  },
  created () {
    this.BLL = new BLL(this)
  },
  mounted () {
    this.BLL.flowContrast()
  },
  computed: {},
  methods: {
  }
}
</script>

<style lang="scss">
.user-flow-contrast {
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  .left {
    flex: 1 1 56%;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .right {
    flex: 1 1 44%;
  }
}
</style>
