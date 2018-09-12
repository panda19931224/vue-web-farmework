import { BridgeApi } from '../../../api/Index'
import Base from '../../base/Index'

const BRIDGE_ID = 2 // 大桥标识
export default class extends Base {
  /**
   * 格式化接口需要的日期格式
   */
  formatDate () {
    if (this.vm.filterForm.date.length > 1) {
      this.vm.dateInApi._start = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date[0]), 'yyyyMMdd')
      this.vm.dateInApi._end = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date[1]), 'yyyyMMdd')
    }
  }

  /**
   * 客流属性 - 年龄分布
   */
  historyAgeDistribution () {
    BridgeApi.historyAgeDistribution({
      sdate: this.vm.dateInApi._start,
      edate: this.vm.dateInApi._end,
      bridgeId: BRIDGE_ID
    }).then(res => {
      this.vm.userPropertyOfAgeObj.list = res.data.map(item => ({f_day: item.f_day, cnt_00_22: (item.cnt_00_22 / item.total * 100).toFixed(2), cnt_23_35: (item.cnt_23_35 / item.total * 100).toFixed(2), cnt_36_45: (item.cnt_36_45 / item.total * 100).toFixed(2), cnt_46_55: (item.cnt_46_55 / item.total * 100).toFixed(2), cnt_56_00: (item.cnt_56_00 / item.total * 100).toFixed(2)}))
      this.vm.columns = this.vm.userPropertyOfAgeObj.columns
      this.vm.list = this.vm.userPropertyOfAgeObj.list
    })
  }
  /**
   * 客流属性 - 性别分布
   */
  historyGenderDistribution () {
    BridgeApi.historyGenderDistribution({
      sdate: this.vm.dateInApi._start,
      edate: this.vm.dateInApi._end,
      bridgeId: BRIDGE_ID
    }).then(res => {
      this.vm.userPropertyOfSexObj.list = res.data.map(item => ({f_day: item.f_day, man: (item.man / item.total * 100).toFixed(2), woman: (item.woman / item.total * 100).toFixed(2)}))
      this.vm.columns = this.vm.userPropertyOfSexObj.columns
      this.vm.list = this.vm.userPropertyOfSexObj.list
    })
  }

  /**
   * 客流量分析
   */
  historyFlowSourceAnalysis () {
    this.vm.list.length = 0
    BridgeApi.historyFlowSourceAnalysis({
      sdate: this.vm.dateInApi._start,
      edate: this.vm.dateInApi._end,
      bridgeId: BRIDGE_ID
    }).then(res => {
      if (res.data) {
        this.vm.userFlowObj.list = res.data
        this.vm.columns = this.vm.userFlowObj.columns
        this.vm.list = this.vm.userFlowObj.list
      }
    })
  }

  /**
   * 省内客流来源你分析
   */
  historyInsideProvinceFlowSourceAnalysis () {
    this.vm.userSourceInProvinceObj.list = 0
    BridgeApi.historyInsideProvinceFlowSourceAnalysis({
      sdate: this.vm.dateInApi._start,
      edate: this.vm.dateInApi._end,
      bridgeId: BRIDGE_ID
    }).then(res => {
      if (res.data) {
        this.vm.userSourceInProvinceObj.list = res.data
        this.vm.columns = this.vm.userSourceInProvinceObj.columns
        this.vm.list = this.vm.userSourceInProvinceObj.list
      }
    })
  }
  /**
   * 省内客流来源你分析
   */
  historyOutsideProvinceFlowSourceAnalysis () {
    this.vm.userSourceOutProvinceObj.list = 0
    BridgeApi.historyOutsideProvinceFlowSourceAnalysis({
      sdate: this.vm.dateInApi._start,
      edate: this.vm.dateInApi._end,
      bridgeId: BRIDGE_ID
    }).then(res => {
      if (res.data) {
        this.vm.userSourceOutProvinceObj.list = res.data
        this.vm.columns = this.vm.userSourceOutProvinceObj.columns
        this.vm.list = this.vm.userSourceOutProvinceObj.list
      }
    })
  }

  /**
   * 停留时长分析 北到南
   */
  historyPassDurationDistributionNs () {
    this.vm.userSourceOutProvinceObj.list = 0
    BridgeApi.historyPassDurationDistribution({
      sdate: this.vm.dateInApi._start,
      edate: this.vm.dateInApi._end,
      bridgeId: BRIDGE_ID
    }).then(res => {
      if (res.data) {
        this.vm.throughDurationObj.list = res.data.NS
        this.vm.columns = this.vm.throughDurationObj.columns
        this.vm.list = this.vm.throughDurationObj.list
      }
    })
  }
  /**
   * 停留时长分析 南到北
   */
  historyPassDurationDistributionSn () {
    this.vm.userSourceOutProvinceObj.list = 0
    BridgeApi.historyPassDurationDistribution({
      sdate: this.vm.dateInApi._start,
      edate: this.vm.dateInApi._end,
      bridgeId: BRIDGE_ID
    }).then(res => {
      if (res.data) {
        this.vm.throughDurationObj.list = res.data.SN
        this.vm.columns = this.vm.throughDurationObj.columns
        this.vm.list = this.vm.throughDurationObj.list
      }
    })
  }
}
