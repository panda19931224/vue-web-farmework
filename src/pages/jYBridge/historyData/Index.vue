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
        <el-radio-group v-show="currDimensionCollapse === '4'" size="mini" v-model="isAge"
                        @change="changeNs">
          <el-radio-button :label="true">从南到北</el-radio-button>
          <el-radio-button :label="false">从北到南</el-radio-button>
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
import BLL from './Index'

export default {
  components: { iTable },
  data () {
    return {
      pageSize: 8,
      columns: [
        {
          prop: 'date',
          label: '日期',
          align: 'center'
        },
        {
          prop: 'total',
          label: '总客流量(人)',
          align: 'center'
        },
        {
          prop: 'cityIn',
          label: '本地总客流量(人)',
          align: 'center'
        },
        {
          prop: 'provinceOut',
          label: '省内跨地市客流量(人)',
          align: 'center'
        },
        {
          prop: 'cityOut',
          label: '省外客流量(人)',
          align: 'center'
        }
      ],
      list: [],
      userFlowObj: {
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
            prop: 'total',
            label: '总客流量(人)',
            align: 'center'
          },
          {
            prop: 'cityIn',
            label: '本地总客流量(人)',
            align: 'center'
          },
          {
            prop: 'provinceOut',
            label: '省内跨地市客流量(人)',
            align: 'center'
          },
          {
            prop: 'cityOut',
            label: '省外客流量(人)',
            align: 'center'
          }
        ],
        list: []
      }, // 客流量分析表格
      userSourceInProvinceObj: {
        columns: [
          {
            prop: 'selectedDate',
            label: '日期',
            align: 'center',
            render (row) {
              try {
                return row['selectedDate'].substring(0, 4) + '-' + row['selectedDate'].substring(4, 6) + '-' + row['selectedDate'].substring(6)
              } catch (e) {
                return row['selectedDate']
              }
            }
          },
          {
            prop: 'city_name',
            label: '地市',
            align: 'center'
          },
          {
            prop: 'total',
            label: '客流量(人)',
            align: 'center'
          },
          {
            prop: 'percentage',
            label: '占比(%)',
            align: 'center'
          }
        ],
        list: []
      }, // 客流来源分析表格(省内)
      userSourceOutProvinceObj: {
        columns: [
          {
            prop: 'selectedDate',
            label: '日期',
            align: 'center',
            render (row) {
              try {
                return row['selectedDate'].substring(0, 4) + '-' + row['selectedDate'].substring(4, 6) + '-' + row['selectedDate'].substring(6)
              } catch (e) {
                return row['selectedDate']
              }
            }
          },
          {
            prop: 'province_name',
            label: '省份',
            align: 'center'
          },
          {
            prop: 'total',
            label: '客流量(人)',
            align: 'center'
          },
          {
            prop: 'percentage',
            label: '占比(%)',
            align: 'center'
          }
        ],
        list: []
      }, // 客流来源分析表格(省外)
      userPropertyOfAgeObj: {
        columns: [
          {
            prop: 'f_day',
            label: '日期',
            align: 'center',
            render (row) {
              try {
                return row['f_day'].substring(0, 4) + '-' + row['f_day'].substring(4, 6) + '-' + row['f_day'].substring(6)
              } catch (e) {
                return row['f_day']
              }
            }
          },
          {
            prop: 'cnt_00_22',
            label: '22岁及以下(%)',
            align: 'center'
          },
          {
            prop: 'cnt_23_35',
            label: '23-35岁(%)',
            align: 'center'
          },
          {
            prop: 'cnt_36_45',
            label: '36-45岁(%)',
            align: 'center'
          },
          {
            prop: 'cnt_46_55',
            label: '46-55岁(%)',
            align: 'center'
          },
          {
            prop: 'cnt_56_00',
            label: '56岁及以上(%)',
            align: 'center'
          }
        ],
        list: []
      }, // 客流属性分析表格（年龄）
      userPropertyOfSexObj: {
        columns: [
          {
            prop: 'f_day',
            label: '日期',
            align: 'center',
            render (row) {
              try {
                return row['f_day'].substring(0, 4) + '-' + row['f_day'].substring(4, 6) + '-' + row['f_day'].substring(6)
              } catch (e) {
                return row['f_day']
              }
            }
          },
          {
            prop: 'woman',
            label: '女性(%)',
            align: 'center'
          },
          {
            prop: 'man',
            label: '男性(%)',
            align: 'center'
          }
        ],
        list: []
      }, // 客流属性分析表格（性别）
      throughDurationObj: {
        columns: [
          {
            prop: 'f_day',
            label: '日期',
            align: 'center',
            render (row) {
              try {
                return row['f_day'].substring(0, 4) + '-' + row['f_day'].substring(4, 6) + '-' + row['f_day'].substring(6)
              } catch (e) {
                return row['f_day']
              }
            }
          },
          {
            prop: 'cnt_00_10',
            label: '少于10分钟',
            align: 'center'
          },
          {
            prop: 'cnt_10_20',
            label: '10~20分钟',
            align: 'center'
          },
          {
            prop: 'cnt_20_30',
            label: '20~30分钟',
            align: 'center'
          },
          {
            prop: 'cnt_30_40',
            label: '30~40分钟',
            align: 'center'
          },
          {
            prop: 'cnt_40_00',
            label: '40分钟之上',
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
          label: '通行时长分析'
        }], // 纬度数据
      filterForm: {
        dimension: '1', // 数据维度
        date: ''
      }, // 数据筛选
      pagination: {
        pageIndex: 1,
        pageSize: 20
      }, // 分页参数
      dateInApi: {
        _start: '',
        _end: ''
      }, // 接口需要的日期格式
      otherHeight: 240, // 表格之外的高度
      options: {
        stripe: true, // 是否为斑马纹 table
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      },
      inProvince: false, // 是否省内
      isAge: true, // 是否为年龄
      currDimensionCollapse: '1' // 当前维度数据面板
    }
  },
  created () {
    this.BLL = new BLL(this)
    // 默认日期为最近一周
    this.filterForm.date = [new Date(new Date().getTime() - 3600 * 1000 * 24 * 8), new Date(new Date().getTime() - 3600 * 1000 * 24)]
    this.BLL.formatDate()
  },
  mounted () {
    // 客流量分析
    this.BLL.historyFlowSourceAnalysis()
  },
  computed: {
    // 取数据面板集合
    collapseList () {
      console.log(' this.selectOptions.filter(_x => _x.value !== 0):', this.selectOptions.filter(_x => _x.value !== '0'))
      return this.selectOptions.filter(_x => _x.value !== '0')
      // return this.selectOptions
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
    // 面板联动
    panChange () {
      // 客流量分析
      if (this.currDimensionCollapse === '1') {
        // 客流量分析
        this.BLL.historyFlowSourceAnalysis()
      } else if (this.currDimensionCollapse === '2') {
        // 切换省内省外
        if (!this.inProvince) {
          this.BLL.historyOutsideProvinceFlowSourceAnalysis()
        } else {
          this.BLL.historyInsideProvinceFlowSourceAnalysis()
        }
      } else if (this.currDimensionCollapse === '3') {
        if (this.isAge) {
          this.BLL.historyAgeDistribution() // 客流属性-年龄
        } else {
          this.BLL.historyGenderDistribution()
        }
      } else if (this.currDimensionCollapse === '4') {
        this.BLL.historyPassDurationDistributionSn()
      }
    },
    // 切换南北
    changeNs (val) {
      if (!val) {
        this.BLL.historyPassDurationDistributionNs()
      } else {
        this.BLL.historyPassDurationDistributionSn()
      }
    },
    // 切换省内省外
    changeInProvince (val) {
      if (!val) {
        this.BLL.historyOutsideProvinceFlowSourceAnalysis()
      } else {
        this.BLL.historyInsideProvinceFlowSourceAnalysis()
      }
    },
    // 切换用户属性 === 性别/年龄
    changeIsAge (val) {
      if (val) {
        this.BLL.historyAgeDistribution() // 客流属性-年龄
      } else {
        this.BLL.historyGenderDistribution()
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
