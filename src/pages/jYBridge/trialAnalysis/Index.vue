<template>
  <div class="trial-analysis-page">
    <div class="left">
      <div style="position: absolute;right: 10px;z-index: 999;">
        <el-radio-group v-model="isProvince" size="mini">
          <el-radio-button :label="false" :showDataRange="false">无锡</el-radio-button>
          <el-radio-button :label="true">泰州</el-radio-button>
        </el-radio-group>
      </div>
      <i-taizhou-map-flow v-if="isProvince" chartId="TaizhouTrialAnalysisMap"
                          :title="tZmap.title"
                          :data="tZmap.cityData"
                          ref="taiZhou"
                          width="100%"
                          height="100%"></i-taizhou-map-flow>
      <i-wuxi-map-flow v-else chartId="NanjingTrialAnalysisMap2"
                          :title="wXmap.title"
                          :data="wXmap.cityData"
                          ref="wuXi"
                          width="100%"
                          height="100%"></i-wuxi-map-flow>
    </div>
    <div class="right">
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
      <i-table :columns="columns" :otherHeight="otherHeight" :list="list"
               :options="options"></i-table>
    </div>
  </div>
</template>

<script>
import iWuxiMapFlow from '../../../components/iEcharts/WuxiMapFlow'
import iTaizhouMapFlow from '../../../components/iEcharts/TaizhouMapFlow'
import Data from '../../../../static/json/data/JyBridge'
import iTable from '../../../components/iTable/Index'
import BLL from './index'

const JS_KEY = 'trial-analysis-js'
const JS_TABLE_KEY = 'trial-analysis-js-table'
const NJ_KEY = 'trial-analysis-nj'
const NJ_TABLE_KEY = 'trial-analysis-nj-table'
export default {
  components: { iWuxiMapFlow, iTable, iTaizhouMapFlow },
  data () {
    return {
      data: Data,
      isProvince: true,
      filterForm: {
        isAllProvince: true,
        date: ''
      }, // 数据筛选
      tZmap: {
        cityData: [],
        title: '游客轨迹分析'
      },
      wXmap: {
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
            return `江阴大桥 - ${row.countyName}`
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
        pageSize: 5
      }, // 分页参数
      otherHeight: 260, // 表格之外的高度
      options: {
        stripe: true, // 是否为斑马纹 table
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      }
    }
  },
  created () {
    // this.map.cityData = this.data.find(_x => _x.key === JS_KEY).value
    this.list = this.data.find(_x => _x.key === JS_TABLE_KEY).value
    this.BLL = new BLL(this)
  },
  mounted () {
    this.filterForm.date = this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
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
    },
    // 切换本省 / 本市
    radioChange (val) {
      if (!val) {
        this.map.cityData = this.data.find(_x => _x.key === NJ_KEY).value
        this.list = this.data.find(_x => _x.key === NJ_TABLE_KEY).value
      } else {
        this.map.cityData = this.data.find(_x => _x.key === JS_KEY).value
        this.list = this.data.find(_x => _x.key === JS_TABLE_KEY).value
      }
    }
  }
}
</script>

<style lang="scss">
.trial-analysis-page {
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
  }
}
</style>
