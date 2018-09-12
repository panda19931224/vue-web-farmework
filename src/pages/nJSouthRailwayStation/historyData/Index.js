import { NJSouthRAilwayStationApi } from '../../../api/Index'
import Base from '../../base/Index'
// import { LuKouAirportApi } from '../../../api'

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
   * 取全国 客流来源数据
   */
  flowProvDay () {
    let param = {
      sDate: this.vm.dateInApi._start,
      date: this.vm.dateInApi._end,
      uri: 'flowProvDay'
    }
    NJSouthRAilwayStationApi.flowProvDay(param).then(res => {
      if (res.data) {
        console.log(' res.data:', res.data)
        this.vm.userSourceOutProvinceObj.list = res.data
        this.vm.columns = this.vm.userSourceOutProvinceObj.columns
        this.vm.list = this.vm.userSourceOutProvinceObj.list
      }
    })
  }

  /**
   * 取全省 客流来源数据
   */
  flowCityDay () {
    let param = {
      sDate: this.vm.dateInApi._start,
      date: this.vm.dateInApi._end,
      uri: 'flowProvDay'
    }
    NJSouthRAilwayStationApi.flowCityDay(param).then(res => {
      if (res.data) {
        this.vm.userSourceInProvinceObj.list = res.data
        this.vm.columns = this.vm.userSourceInProvinceObj.columns
        this.vm.list = this.vm.userSourceInProvinceObj.list
      }
    })
  }

  /**
   * 取客流属性
   */
  areaFlowProperty () {
    let param = {
      sDate: this.vm.dateInApi._start, date: this.vm.dateInApi._end
    }
    NJSouthRAilwayStationApi.areaFlowAgeProperty(param).then(res => {
      if (res.data) {
        this.vm.userPropertyOfAgeObj.list = []
        for (let key in res.data) {
          this.vm.userPropertyOfAgeObj.list.push({
            'cnt_00_22': (res.data[key].cnt_00_22 * 100).toFixed(2),
            'cnt_23_35': (res.data[key].cnt_23_35 * 100).toFixed(2),
            'cnt_36_45': (res.data[key].cnt_36_45 * 100).toFixed(2),
            'cnt_46_55': (res.data[key].cnt_46_55 * 100).toFixed(2),
            'cnt_56_00': (res.data[key].cnt_56_00 * 100).toFixed(2),
            'report_day': res.data[key].report_day })
        }
        this.changeUserFlowPropery()
      }
    })
    NJSouthRAilwayStationApi.areaFlowSexProperty(param).then(res => {
      if (res.data) {
        this.vm.userPropertyOfSexObj.list = []
        for (let key in res.data) {
          this.vm.userPropertyOfSexObj.list.push({
            'man': (res.data[key].man * 100).toFixed(2),
            'woman': (res.data[key].woman * 100).toFixed(2),
            'report_day': res.data[key].report_day
          })
        }
        this.changeUserFlowPropery()
      }
    })
  }

  /**
   * 切换客流属性信息
   */
  changeUserFlowPropery () {
    if (this.vm.isAge) {
      this.vm.columns = this.vm.userPropertyOfAgeObj.columns
      this.vm.list = this.vm.userPropertyOfAgeObj.list
    } else {
      this.vm.columns = this.vm.userPropertyOfSexObj.columns
      this.vm.list = this.vm.userPropertyOfSexObj.list
    }
  }

  /**
   * 清空当前table数据
   */
  clearTableData () {
    this.vm.columns = []
    this.vm.list = []
  }
  /**
   * 客流量分析
   */
  historyFlowContrast () {
    NJSouthRAilwayStationApi.historyFlowContrast({
      startDate: this.vm.dateInApi._start,
      endDate: this.vm.dateInApi._end
    }).then(res => {
      this.vm.userFlowObj.list = res.data
      this.vm.columns = this.vm.userFlowObj.columns
      this.vm.list = this.vm.userFlowObj.list
    })
  }
  /**
   * 换成分析：从spec1=高铁出站口/长途大巴出站口 去别的站点 换成信息
   */
  getTransferForChartDurationData () {
    let param = {
      sDate: this.vm.dateInApi._start,
      eDate: this.vm.dateInApi._end
    }
    NJSouthRAilwayStationApi.getTransferForChartDurationData(param).then(res => {
      if (res.data) {
        this.vm.throughDurationObj.list = res.data
        this.vm.columns = this.vm.throughDurationObj.columns
        this.vm.list = this.vm.throughDurationObj.list
      }
    })
  }
}
