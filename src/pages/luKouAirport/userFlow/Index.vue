<template>
  <div class="jy-bridge-user-flow-page">
    <div class="left animated fadeInLeft">
      <transition name="left-chart" mode="out-in">
        <nation v-if="!filterForm.isProvince" :touristName="mapTitle" :touristData="nationData"></nation>
        <js-map v-else :touristName="mapTitle" :data="provinceData"></js-map>
      </transition>
    </div>
    <div class="right animated fadeInRight">
      <el-form :inline="true" :model="filterForm" label-width="0" class="demo-form-inline">
        <el-form-item>
          <el-radio-group v-model="filterForm.isProvince">
            <el-radio-button :label="false">外省来源</el-radio-button>
            <el-radio-button :label="true">省内来源</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="选择日期" v-model="filterForm.date"
                          style="width: 100%;" @change="changeDate" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
      </el-form>
      <i-table v-if="!filterForm.isProvince" :columns="columns" :total="list.length" :list="list"
               :otherHeight="otherHeight" :options="options"></i-table>
      <i-table v-else :columns="columesProvince" :total="provinceList.length" :list="provinceList"
               :otherHeight="otherHeight" :options="options"></i-table>
    </div>
  </div>
</template>

<script>
import Nation from '../../../components/iEcharts/TouristSourceAna'
import JsMap from '../../../components/iEcharts/JiangsuMap'
import iTable from '../../../components/iTable/Index'
import BLL from './Index'

export default {
  components: { Nation, JsMap, iTable },
  data () {
    return {
      filterForm: {
        isProvince: false, // 是否为省内
        date: '', // 日期
        validDate: '' // 有效日期
      },
      nationData: [], // 全国地图数据
      provinceData: [], // 全省地图数据
      columns: [
        {
          prop: 'fDate',
          label: '日期',
          align: 'center',
          render: (row, column) => {
            return row.fDate.substring(0, 4) + '-' + row.fDate.substring(4, 6) + '-' + row.fDate.substring(6)
          }
        },
        {
          prop: 'provinceName',
          label: '省份',
          align: 'center'
        },
        {
          prop: 'fCountCt',
          label: '人数(人)',
          align: 'center'
        },
        {
          prop: 'per',
          label: '游客来源占比(%)',
          align: 'center',
          render: (row, column) => {
            return `${row.per}%`
          }
        }
      ],
      columesProvince: [
        {
          prop: 'fDate',
          label: '日期',
          align: 'center',
          render: (row, column) => {
            return row.fDate.substring(0, 4) + '-' + row.fDate.substring(4, 6) + '-' + row.fDate.substring(6)
          }
        },
        {
          prop: 'cityName',
          label: '地市',
          align: 'center'
        },
        {
          prop: 'fCountCt',
          label: '人数(人)',
          align: 'center'
        },
        {
          prop: 'per',
          label: '游客来源占比(%)',
          align: 'center',
          render: (row, column) => {
            return `${row.per}%`
          }
        }
      ],
      pagination: {
        pageIndex: 1,
        pageSize: 50
      }, // 分页参数
      total: 0, // 总数
      list: [], // 全国数据列表
      otherHeight: 200, // 表格之外的高度
      provinceList: [], // 全省数据列表
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
    this.BLL.initDate()
    this.initNationData()
  },
  computed: {
    mapTitle () {
      let dateFormat = this.$utils.Date.format(this.filterForm.validDate, 'yyyy年MM月dd日')
      return `${dateFormat}客流来源分析`
    },
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
    initNationData () {
      this.BLL.flowSourceOutsideProvince()
      this.BLL.flowSourceInsideProvince()
    },
    // 根据日期筛选
    changeDate (val) {
      this.filterForm.validDate = this.$utils.Date.format(new Date(val.getTime()), 'yyyy-MM-dd')
      this.BLL.changeDate(val)
    }
  }
}
</script>

<style lang="scss">
.jy-bridge-user-flow-page {
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
    .el-form-item {
      margin-right: 0 !important;
    }
    .demo-form-inline {
      margin-left: 10px;
    }
  }
}
</style>
