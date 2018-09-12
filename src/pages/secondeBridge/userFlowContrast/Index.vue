<template>
  <div class="user-flow-contrast">
    <div class="left animated fadeInLeft">
      <i-line-chart chartId="userFlowContrastLineChart" :xAxis="lineChart.xAxis" :data="lineChart.dataAll"></i-line-chart>
    </div>
    <div class="right animated fadeInRight">
      <el-radio-group size="mini" v-model="isNs"
                      @change="changeNs" style="float:right;margin:0 0.5rem 0.5rem 0;">
        <el-radio-button :label="true">从南到北</el-radio-button>
        <el-radio-button :label="false">从北到南</el-radio-button>
      </el-radio-group>
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
        dataAll: [
          {
            type: 'line',
            data: []
          },
          {
            type: 'line',
            data: []
          }
        ]
      },
      isNs: true,
      sDate: '',
      eDate: '',
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
    this.eDate = this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd')
    this.sDate = this.$utils.Date.format(new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000), 'yyyyMMdd')
  },
  mounted () {
    this.BLL.flowContrastSn()
  },
  computed: {},
  methods: {
    // 切换南北
    changeNs (val) {
      if (!val) {
        this.BLL.flowContrastNs()
      } else {
        this.BLL.flowContrastSn()
      }
    }
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
