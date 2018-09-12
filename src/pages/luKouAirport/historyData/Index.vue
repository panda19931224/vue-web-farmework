<template>
  <div class="history-data-page">
    <div class="filter-form">
      <div class="item">
        <el-form :inline="true" :model="filterForm" label-width="0" class="demo-form-inline">
          <el-form-item v-show="false" label="维度切换" label-width="80px">
            <el-select v-model="filterForm.dimension" placeholder="请选择" @change="changeDimension">
              <template v-for="(item, key) in selectOptions">
                <el-option :key="key" :label="item.label" :value="item.value">
                </el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" label-width="50px">
            <el-date-picker
              v-model="filterForm.date"
              type="daterange"
              @change="changeDate"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <!--region 辅助筛选-->
        <el-radio-group v-show="currDimensionCollapse === '2'" size="mini" v-model="inProvince"
                        @change="changeInProvince">
          <el-radio-button :label="false">省外</el-radio-button>
          <el-radio-button :label="true">省内</el-radio-button>
        </el-radio-group>
        <el-radio-group v-show="currDimensionCollapse === '3'" size="mini" v-model="isAge"
                        @change="changeIsAge">
          <el-radio-button :label="true">年龄</el-radio-button>
          <el-radio-button :label="false">性别</el-radio-button>
        </el-radio-group>
        <!--endregion-->
      </div>
    </div>
    <el-tabs v-model="currDimensionCollapse" type="card" @tab-click="handleTabClick">
      <template v-for="(item) in collapseList">
        <el-tab-pane :key="item.value" :label="item.label" :name="item.value">
          <i-table :columns="columns"
                   :tableData="list"
                   :pageSize="pageSize"
                   v-if="item.value === currDimensionCollapse"
                   :total="list.length"
                   :otherHeight="otherHeight"
                   :options="options"></i-table>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
import iTable from '../../../components/iTable.vue'
import JsonData from '../../../../static/json/data/JyBridge'
import BLL from './Index'

const throughDurationKey = 'history-data-through-duration'
export default {
  components: { iTable },
  data () {
    return {
      pageSize: 8,
      data: JsonData,
      columns: [
        {
          prop: 'fDate',
          label: '日期',
          align: 'center',
          render (row) {
            return row['fDate'].substring(0, 4) + '-' + row['fDate'].substring(4, 6) + '-' + row['fDate'].substring(6)
          }
        },
        {
          prop: 'fCountAll',
          label: '总客流量(人)',
          align: 'center'
        },
        {
          prop: 'fCountLocal',
          label: '本地总客流量(人)',
          align: 'center'
        },
        {
          prop: 'fCountNolocal',
          label: '省内跨地市客流量(人)',
          align: 'center'
        },
        {
          prop: 'fCountOutpro',
          label: '省外客流量(人)',
          align: 'center'
        }
      ],
      list: [],
      userFlowObj: {
        columns: [
          {
            prop: 'fDate',
            label: '日期',
            align: 'center',
            render (row) {
              return row['fDate'].substring(0, 4) + '-' + row['fDate'].substring(4, 6) + '-' + row['fDate'].substring(6)
            }
          },
          {
            prop: 'fCountAll',
            label: '总客流量(人)',
            align: 'center'
          },
          {
            prop: 'fCountLocal',
            label: '本地总客流量(人)',
            align: 'center'
          },
          {
            prop: 'fCountNolocal',
            label: '省内跨地市客流量(人)',
            align: 'center'
          },
          {
            prop: 'fCountOutpro',
            label: '省外客流量(人)',
            align: 'center'
          }
        ],
        list: []
      }, // 客流量分析表格
      userSourceInProvinceObj: {
        columns: [
          {
            prop: 'fDate',
            label: '日期',
            align: 'center',
            render (row) {
              return row['fDate'].substring(0, 4) + '-' + row['fDate'].substring(4, 6) + '-' + row['fDate'].substring(6)
            }
          },
          {
            prop: 'cityName',
            label: '省份',
            align: 'center'
          },
          {
            prop: 'fCount',
            label: '客流量(人)',
            align: 'center'
          },
          {
            prop: 'per',
            label: '占比(%)',
            align: 'center'
          }
        ],
        list: []
      }, // 客流来源分析表格(省内)
      userSourceOutProvinceObj: {
        columns: [
          {
            prop: 'fDate',
            label: '日期',
            align: 'center',
            render (row) {
              return row['fDate'].substring(0, 4) + '-' + row['fDate'].substring(4, 6) + '-' + row['fDate'].substring(6)
            }
          },
          {
            prop: 'provinceName',
            label: '省份',
            align: 'center'
          },
          {
            prop: 'fCount',
            label: '客流量(人)',
            align: 'center'
          },
          {
            prop: 'per',
            label: '占比(%)',
            align: 'center'
          }
        ],
        list: []
      }, // 客流来源分析表格（省外）
      userPropertyOfAgeObj: {
        columns: [
          {
            prop: 'date',
            label: '日期',
            align: 'center',
            render (row) {
              return row['date'].substring(0, 4) + '-' + row['date'].substring(4, 6) + '-' + row['date'].substring(6)
            }
          },
          {
            prop: 'fAgeRange_1',
            label: '22岁以下(%)',
            align: 'center'
          },
          {
            prop: 'fAgeRange_2',
            label: '23~35岁(%)',
            align: 'center'
          },
          {
            prop: 'fAgeRange_3',
            label: '36~45岁(%)',
            align: 'center'
          },
          {
            prop: 'fAgeRange_4',
            label: '46~55岁(%)',
            align: 'center'
          },
          {
            prop: 'fAgeRange_5',
            label: '56岁以上(%)',
            align: 'center'
          }
        ],
        list: []
      }, // 客流属性分析表格（年龄）
      userPropertyOfSexObj: {
        columns: [
          {
            prop: 'date',
            label: '日期',
            align: 'center',
            render (row) {
              return row['date'].substring(0, 4) + '-' + row['date'].substring(4, 6) + '-' + row['date'].substring(6)
            }
          },
          {
            prop: 'fSex_woman',
            label: '女性(%)',
            align: 'center'
          },
          {
            prop: 'fSex_man',
            label: '男性(%)',
            align: 'center'
          }
        ],
        list: []
      }, // 客流属性分析表格（性别）
      throughDurationObj: {
        columns: [
          {
            prop: 'date',
            label: '日期',
            align: 'center',
            render (row) {
              return row['日期'].substring(0, 4) + '-' + row['日期'].substring(4, 6) + '-' + row['日期'].substring(6)
            }
          },
          {
            prop: 'cnt_0_1',
            label: '小于1小时',
            align: 'center'
          },
          {
            prop: 'cnt_1_2',
            label: '1-2小时',
            align: 'center'
          },
          {
            prop: 'cnt_2_3',
            label: '2-3小时',
            align: 'center'
          },
          {
            prop: 'cnt_3_4',
            label: '3-4小时',
            align: 'center'
          },
          {
            prop: 'cnt_4_0',
            label: '4小时以上',
            align: 'center'
          }
        ],
        list: []
      }, // 停留时长分析
      selectOptions: [
        {
          value: '0',
          label: '总客流数据分析'
        }, {
          value: '1',
          label: '客流量分析'
        }, {
          value: '2',
          label: '客流来源分析'
        }, {
          value: '3',
          label: '客流属性分析'
        }, {
          value: '4',
          label: '停留时长分析'
        }], // 纬度数据
      filterForm: {
        dimension: '1', // 数据维度
        date: ''
      }, // 数据筛选
      pagination: {
        pageIndex: 1,
        pageSize: 20
      }, // 分页参数
      otherHeight: 240, // 表格之外的高度
      options: {
        stripe: true, // 是否为斑马纹 table
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      },
      inProvince: false, // 是否省内
      isAge: true, // 是否为年龄
      dateInApi: {
        _start: '',
        _end: ''
      }, // 接口需要的日期格式
      currDimensionCollapse: '1' // 当前维度数据面板
    }
  },
  created () {
    this.BLL = new BLL(this)
    // 默认日期为最近一周
    this.filterForm.date = [new Date(new Date().getTime() - 3600 * 1000 * 24 * 8), new Date(new Date().getTime() - 3600 * 1000 * 24)]
    this.BLL.formatDate()
    this.throughDurationObj.list = this.data.find(_x => _x.key === throughDurationKey).value // 停留时长数据
  },
  mounted () {
    this.BLL.historyFlowContrast()
  },
  computed: {
    // 取数据面板集合
    collapseList () {
      return this.selectOptions.filter(_x => _x.value !== '0')
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
    // 数据维度切换
    changeDimension (val) {
    },
    // 面板切换，同时切换table表格
    handleTabClick () {
      this.panChange()
    },
    panChange () {
      if (this.currDimensionCollapse === '1') {
        this.BLL.historyFlowContrast()
      } else if (this.currDimensionCollapse === '2') {
        // 切换省内省外
        if (!this.inProvince) {
          this.BLL.flowSourceOutsideProvince()
        } else {
          this.BLL.flowSourceInsideProvince()
        }
      } else if (this.currDimensionCollapse === '3') {
        if (this.isAge) {
          this.BLL.ageDistribution()
        } else {
          this.BLL.genderDistribution()
        }
      } else if (this.currDimensionCollapse === '4') {
        this.BLL.historyStayDuration()
      }
    },
    // 切换省内省外
    changeInProvince (val) {
      if (!val) {
        this.BLL.flowSourceOutsideProvince()
      } else {
        this.BLL.flowSourceInsideProvince()
      }
    },
    // 切换用户属性 === 性别/年龄
    changeIsAge (val) {
      if (val) {
        this.BLL.ageDistribution()
      } else {
        this.BLL.genderDistribution()
      }
    },
    changeDate () {
      this.BLL.formatDate()
      this.panChange()
    }
  }
}
</script>

<style lang="scss">
.history-data-page {
  background-color: #fff;
  .filter-form {
    height: 60px;
    .item {
      .el-form-item {
        .el-range-separator {
          width: 10%;
        }
      }
      .el-radio-group {
        position: absolute;
        right: 24px;
        z-index: 999;
      }
    }
  }
}
</style>
