<template>
  <div class="trial-analysis-page">
    <div class="left animated fadeInLeft">
      <i-nanjing-map-flow chartId="NanjingTrialAnalysisMap"
                          :title="map.title"
                          :data="map.cityData"
                          ref="nanJing"
                          width="100%"
                          height="100%"></i-nanjing-map-flow>
    </div>
    <div class="right animated fadeInRight">
      <el-form :inline="true" :model="filterForm" label-width="0" class="demo-form-inline">
        <el-form-item v-if="false">
          <el-radio-group v-model="filterForm.isAllProvince" @change="radioChange">
            <el-radio-button :label="true">全省</el-radio-button>
            <el-radio-button :label="false">本市</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-left: 10px;">
          <el-date-picker type="date" placeholder="选择日期" v-model="filterForm.date"
                          style="width: 100%;" @change="changeDate" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
      </el-form>
      <i-table :columns="columns" :otherHeight="otherHeight" :total="list.length" :list="list"
               :options="options"></i-table>
    </div>
  </div>
</template>

<script>
import iJiangsuMapFlow from '../../../components/iEcharts/JiangsuMapFlow'
import iNanjingMapFlow from '../../../components/iEcharts/NanjingMapFlow'
import iTable from '../../../components/iTable/Index'
import BLL from './index'

export default {
  components: { iJiangsuMapFlow, iTable, iNanjingMapFlow },
  data () {
    return {
      filterForm: {
        isAllProvince: true,
        date: ''
      }, // 数据筛选
      map: {
        cityData: [],
        title: '游客轨迹分析'
      },
      columns: [
        {
          prop: 'date',
          label: '日期',
          align: 'center'
        },
        {
          prop: 'countyName',
          label: '线路',
          align: 'center',
          render (row, column) {
            return `长江二桥 - ${row.countyName}`
          }
        },
        {
          prop: 'amount',
          label: '客流人数(人)',
          align: 'center'
        }
      ],
      list: [],
      pagination: {
        pageIndex: 1,
        pageSize: 20
      }, // 分页参数
      otherHeight: 200, // 表格之外的高度
      options: {
        stripe: true, // 是否为斑马纹 table
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      }
    }
  },
  created () {
    this.BLL = new BLL(this)
    this.filterForm.date = this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
  },
  mounted () {
    this.BLL.touristTraceAnalysis()
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
      this.BLL.touristTraceAnalysis()
    }
  }
}
</script>

<style lang="scss">
.trial-analysis-page {
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
