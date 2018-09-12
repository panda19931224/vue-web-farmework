import { NJSouthRAilwayStationApi } from '../../../api/Index'
import Base from '../../base/Index'
import ProvinceInfo from '../../../../static/json/ProvinceInfo'
const TIME = 900
export default class extends Base {
  /**
   *取实时客流
   */
  getRealTimeFlow () {
    NJSouthRAilwayStationApi.getRealTimeFlow().then(res => {
      if (res.data) {
        this.vm.passengerFlow = []
        this.vm.realTimePassengerFlow.push(res.data && res.data.real_num_all)
      }
    })
  }

  /**
   *取昨日客流
   */
  getYesterdayIndexRealTime () {
    NJSouthRAilwayStationApi.getYesterdayIndexRealTime().then(res => {
      if (res.data) {
        this.vm.yesterdayPassengerFlow.push(res.data[0].day_num)
      }
    })
  }

  /**
   *取当日分时段客流
   */
  getIndexFlowOnTime () {
    NJSouthRAilwayStationApi.getIndexFlowOnTime().then(res => {
      if (res.data) {
        for (let key in res.data) {
          this.vm.fldDataX.push(res.data[key].hh)
          this.vm.fldDataY.push(res.data[key] && res.data[key].real_num_all)
        }
      }
    })
  }

  /**
   *取昨夜游客年龄
   */
  getIndexYesterdayTouristAgeAnalysis () {
    /* let yesterdatDate = this.vm.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd')
    let param = {
      date: yesterdatDate
    } */
    NJSouthRAilwayStationApi.getIndexYesterdayTouristAgeAnalysis().then(res => {
      if (res.data) {
        this.vm.pieBarDataAge = [
          {
            'name': '23岁以下',
            'value': res.data[0].cnt_00_22
          },
          {
            'name': '23-35岁',
            'value': res.data[0].cnt_23_35
          },
          {
            'name': '36-45岁',
            'value': res.data[0].cnt_36_45
          },
          {
            'name': '46-55岁',
            'value': res.data[0].cnt_46_55
          },
          {
            'name': '56岁及以上',
            'value': res.data[0].cnt_56_00
          }
        ]
      }
    })
  }

  /**
   *取昨夜游客性别
   */
  getIndexYesterdayTouristSexAnalysis () {
    NJSouthRAilwayStationApi.getIndexYesterdayTouristSexAnalysis().then(res => {
      if (res.data) {
        this.vm.pieBarDataSex = [
          {
            'name': '男',
            'value': res.data[0].man
          },
          {
            'name': '女',
            'value': res.data[0].woman
          }
        ]
      }
    })
  }

  /**
   * 取全国 客流来源数据
   */
  flowProvDay () {
    this.vm.nationData.length = 0
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    let param = {
      sDate: formatDate,
      date: formatDate
    }
    NJSouthRAilwayStationApi.flowProvDay(param).then(res => {
      if (res.data) {
        for (let key in res.data) {
          this.vm.nationData.push({ name: res.data[key].city_name, value: res.data[key].rate })
        }
        for (let pro in ProvinceInfo) {
          let have = res.data.find(_x => _x.city_name === ProvinceInfo[pro].provinceName)
          if (!have) {
            this.vm.nationData.push({ name: ProvinceInfo[pro].provinceName, value: 0 })
          }
        }
      }
    })
  }

  /**
   * 取全省 客流来源数据
   */
  flowCityDay () {
    this.vm.jiangsuData.length = 0
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    let param = {
      sDate: formatDate,
      date: formatDate
    }
    NJSouthRAilwayStationApi.flowCityDay(param).then(res => {
      if (res.data) {
        this.vm.jiangsuData = []
        for (let key in res.data) {
          this.vm.jiangsuData.push({ name: res.data[key].city_name, value: res.data[key].rate })
        }
      }
    })
  }

  /**
   * 循环取实时数据
   */
  setInterval () {
    this.vm.setIntervalObj = window.setInterval(() => {
      this.getRealTimeFlow()
    }, TIME * 1000)
  }
}
