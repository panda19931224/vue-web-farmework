<template>
  <div class="transfer-analysis-page">
    <div class="left animated fadeInLeft">
      <div class="sanji">
        <i-sankey-chart :chartId="sanjiId" v-if="sanji" :data="sankeyData.data" :links="sankeyData.links" :chartText="chartText"></i-sankey-chart>
      </div>
      <div class="sanji">
        <i-sankey-chart-btn :chartId="sanjiBId" v-if="sanji" :data="sankeyDataBtn.data" :links="sankeyDataBtn.links" :chartText="chartT"></i-sankey-chart-btn>
      </div>
    </div>
    <div class="right animated fadeInRight">
      <el-form :inline="true" :model="filterForm" label-width="0" class="demo-form-inline">
        <el-form-item>
          <el-date-picker type="date" placeholder="选择日期" v-model="filterForm.date"
                          style="width: 100%;" @change="changeDate"  :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
      </el-form>
      <i-table :columns="columns" :list="list" :total="list.length" :otherHeight="otherHeight"
               :options="options"></i-table>
    </div>
  </div>
</template>

<script type="text/jsx">
import iSankeyChart from './components/SankeyChart'
import iSankeyChartBtn from './components/SankeyChartBtn'
import iTable from '../../../components/iTable/Index'
import BLL from './Index'
export default {
  components: { iSankeyChart, iTable, iSankeyChartBtn },
  data () {
    return {
      data: [],
      sanji: true,
      dataBtn: [],
      sanjiId: 'sanji1',
      sanjiBId: 'sanji2',
      chartText: '场站换乘分析',
      chartT: '',
      sankeyData: {
        data: [],
        links: []
      }, // 桑基图数据
      sankeyDataBtn: {
        data: [],
        links: []
      }, // 桑基图数据
      columns: [
        {
          prop: 'date',
          label: '日期',
          align: 'center',
          render (row) {
            try {
              return row['date'].substring(0, 4) + '-' + row['date'].substring(4, 6) + '-' + row['date'].substring(6)
            } catch (e) {
              return row['date']
            }
          }
        },
        {
          prop: 'source',
          label: '起点',
          align: 'center',
          hidden: true
        },
        {
          prop: 'target',
          label: '换乘路径',
          align: 'center',
          render: (row, column) => {
            return `${row.source} - ${row.target}`
          }
        },
        {
          prop: 'value',
          label: '人数(人)',
          align: 'center'
        }
      ],
      filterForm: {
        date: '' // 日期
      },
      list: [],
      pagination: {
        pageIndex: 1,
        pageSize: 20
      }, // 分页参数
      otherHeight: 260, // 表格之外的高度
      options: {
        stripe: true, // 是否为斑马纹 table
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      },
      tableDate: ''
    }
  },
  created () {
    this.BLL = new BLL(this)
    this.tableDate = this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
    this.filterForm.date = this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
    this.BLL.getTransferAnalysisA()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // vm.BLL.getTransferAnalysisA()
    })
  },
  mounted () {
    this.BLL.getTransferTable()
    this.BLL.getTransferAnalysisB()
  },
  computed: {
    pickerOptions () {
      var timestamp = parseInt(Date.parse(this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')))
      let options = { // eslint-disable-line
        disabledDate (time) {
          // if (!_this.ispickerOption) {
          //   return time.getTime() < 1520611199000
          // }
          return time.getTime() > timestamp
        }
      }
      return options
    }
  },
  methods: {
    // 根据日期筛选
    changeDate (val) {
      this.filterForm.date = this.$utils.Date.format(new Date(val.getTime()), 'yyyy-MM-dd')
      this.BLL.getTransferAnalysisA()
      this.BLL.getTransferAnalysisB()
      this.BLL.getTransferTable()
    }
  }
}
</script>

<style lang="scss">
.transfer-analysis-page {
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
    .sanji{
      width: 100%;
      height:50%;
    }
  }
  .right {
    flex: 1 1 44%;
    .date-desc {
      text-align: right;
      padding: 30px 20px;
      font-size: 14px;
      span {
        padding: 6px 16px;
        background-color: #f1f1f1;
        border-radius: 20px;
      }
    }
  }
}
</style>
