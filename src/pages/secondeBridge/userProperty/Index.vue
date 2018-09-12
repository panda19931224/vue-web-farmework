<template>
  <div class="second-bridge-user-property-page">
    <div class="left animated fadeInLeft">
      <i-pie-echart v-if="pieData.data.length > 0" :chartId="pieData.chartId" style="margin: 0 auto" width="80%"
                    height="80%" :data="pieData.data" :title="pieData.title"
                    :legendData="pieData.legendData"></i-pie-echart>
    </div>
    <div class="right animated fadeInRight">
      <el-form :inline="true" :model="filterForm" label-width="0" class="demo-form-inline">
        <el-form-item>
          <el-radio-group v-model="filterForm.isAge" @change="changeProperty">
            <el-radio-button :label="true">年龄</el-radio-button>
            <el-radio-button :label="false">性别</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="选择日期" v-model="filterForm.date"
                          style="width: 100%;" @change="changeDate" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
      </el-form>
      <i-table v-if="filterForm.isAge" :columns="columnsAge" :list="ageList" :options="options"></i-table>
      <i-table v-else :columns="columnsSex" :list="sexList" :options="options"></i-table>
    </div>
  </div>
</template>

<script>
import iPieEchart from '../../../components/iEcharts/PieEchart'
import iTable from '../../../components/iTable/Index'
import BLL from './Index'

export default {
  components: { iPieEchart, iTable },
  data () {
    return {
      pieData: {
        data: [], // 数据
        legendData: [],
        title: '',
        chartId: 'userProperty'
      },
      data: [], // 接口取出的数据
      sexList: [],
      ageList: [],
      columnsAge: [
        {
          prop: 'report_day',
          label: '日期',
          align: 'center'
        },
        {
          prop: 'name',
          label: '年龄',
          align: 'center'
        },
        {
          prop: 'value',
          label: '數量(%)',
          align: 'center'
        }
      ],
      columnsSex: [
        {
          prop: 'report_day',
          label: '日期',
          align: 'center'
        },
        {
          prop: 'name',
          label: '性别',
          align: 'center'
        },
        {
          prop: 'value',
          label: '數量(%)',
          align: 'center'
        }
      ],
      options: {
        stripe: true, // 是否为斑马纹 table
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      },
      filterForm: {
        isAge: true,
        date: ''
      } // 筛选条件
    }
  },
  created () {
    this.BLL = new BLL(this)
    this.filterForm.date = this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
  },
  mounted () {
    this.BLL.yesterdayAgeDistribution()
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
    // 日期切換
    changeDate (val) {
      this.filterForm.date = this.$utils.Date.format(new Date(val.getTime()), 'yyyy-MM-dd')
      if (this.filterForm.isAge) {
        this.BLL.yesterdayAgeDistribution()
      } else {
        this.BLL.yesterdayGenderDistribution()
      }
    },
    // 客流属性纬度切换
    changeProperty (val) {
      if (val) {
        this.BLL.yesterdayAgeDistribution()
      } else {
        this.BLL.yesterdayGenderDistribution()
      }
    }
  }
}
</script>

<style lang="scss">
.second-bridge-user-property-page {
  background-color: #fff;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  .left {
    flex: 0 0 60%;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .right {
    flex: 0 0 40%;
    padding-left: 12px;
    .el-form-item {
      margin-right: 0 !important;
    }
    .demo-form-inline {
      margin-left: 10px;
    }
  }
}
</style>
