<template>
  <div class="through-duration-page">
    <div class="left animated fadeInLeft">
      <i-line-chart chartId="throughDurationLineChart" :title="lineChart.title" :data="lineChart.data"
                    :legendData="lineChart.legendData" :xAxis="lineChart.xAxis"></i-line-chart>
    </div>
    <div class="right animated fadeInRight">
      <el-form :inline="true" :model="filterForm" label-width="0" class="demo-form-inline">
        <el-form-item>
          <el-date-picker type="date" placeholder="选择日期" v-model="filterForm.date"
                          style="width: 100%;" @change="changeDate" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
      </el-form>
      <i-table :columns="columns" :list="list" :options="options"></i-table>
    </div>
  </div>
</template>

<script>
import iLineChart from '../../../components/iEcharts/LineEchart'
import iTable from '../../../components/iTable/Index'
import BLL from './Index'

export default {
  components: { iLineChart, iTable },
  data () {
    return {
      lineChart: {
        data: [],
        xAxis: [],
        legendData: ['从南向北', '从北向南'],
        title: '昨日通行时长分布'
      },
      columns: [
        {
          prop: 'date',
          label: '日期',
          align: 'center'
        },
        {
          prop: 'description',
          label: '停留时长',
          align: 'center'
        },
        {
          prop: 'amount',
          label: '客流人数(人)',
          align: 'center'
        }
      ],
      list: [],
      options: {
        stripe: true, // 是否为斑马纹 table
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      },
      filterForm: {
        date: ''
      } // 筛选条件
    }
  },
  created: function () {
    this.filterForm.date = this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
    this.BLL = new BLL(this)
  },
  mounted () {
    this.BLL.yesterdayPassDurationDistribution()
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
    // 日期切换
    changeDate (val) {
      this.filterForm.date = this.$utils.Date.format(new Date(val.getTime()), 'yyyy-MM-dd')
      this.BLL.yesterdayPassDurationDistribution()
    }
  }
}
</script>

<style lang="scss">
.through-duration-page {
  background-color: #fff;
  display: flex;
  justify-content: center;
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
    padding-left: 12px;
    .demo-form-inline {
      margin-left: 10px;
    }
  }
}
</style>
