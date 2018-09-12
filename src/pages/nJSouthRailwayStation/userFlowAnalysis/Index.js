import { NJSouthRAilwayStationApi } from '../../../api/Index'
import Base from '../../base/Index'
// import ProvinceInfo from '../../../../static/json/ProvinceInfo'
export default class extends Base {
  /**
   *取实时客流
   */
  getRealTimeFlow () {
    NJSouthRAilwayStationApi.getRealTimeFlow().then(res => {
      if (res.data) {
        this.vm.realTimePassengerFlow.push(res.data.real_num_all)
        console.log(this.vm.realTimePassengerFlow)
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
   *取昨日个场站客流
   */
  getTerminalYesterdayIndexRealTime (param) {
    var date = this.vm.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd')
    NJSouthRAilwayStationApi.getTerminalYesterdayIndexRealTime(param, date).then(res => {
      if (res.data && res.data.length !== 0) {
        this.vm.terminalYesterdayPassengerFlow = res.data[0].nums
      } else {
        this.vm.terminalYesterdayPassengerFlow = 0
      }
    })
  }

  /**
   * 过去一周每日候车时长
   */
  getLastWeekWaitDuration () {
    let param = {
      spec: this.vm.spec,
      date: this.vm.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd')
    }
    NJSouthRAilwayStationApi.getLastWeekWaitDuration(param).then(res => {
      if (res.data && res.data.length !== 0) {
        this.vm.dailyWaitingTime = []
        for (let key in res.data) {
          this.vm.dailyWaitingTime.push(
            {
              'date': res.data[key].dd.substring(4, 6) + '/' + res.data[key].dd.substring(6, 8),
              'time': res.data[key].avg_stay
            }
          )
        }
        this.vm.isDailyWaitingTime = true
      } else {
        this.vm.isDailyWaitingTime = false
      }
    })
  }

  /**
   * 昨日分时段客流
   */
  getYesterdayFlowOnTime () {
    let param = {
      spec: this.vm.spec,
      date: this.vm.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd')
    }
    NJSouthRAilwayStationApi.getYesterdayFlowOnTime(param).then(res => {
      if (res.data && res.data.length !== 0) {
        this.vm.yeterdayPassenger = []
        for (let key in res.data) {
          this.vm.yeterdayPassenger.push(
            {
              'date': res.data[key].hh,
              'value': res.data[key].nums
            }
          )
        }
        this.vm.isYeterdayPassenger = true
      } else {
        this.vm.isYeterdayPassenger = false
      }
    })
  }

  /**
   * 节假日客流对比
   */
  getHolidayFlowContrast () {
    let param = {
      spec: this.vm.spec,
      date: this.vm.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd')
    }
    NJSouthRAilwayStationApi.getHolidayFlowContrast(param).then(res => {
      if (res.data && res.data.length !== 0) {
        this.vm.holidayPassenger = []
        for (let key in res.data) {
          this.vm.holidayPassenger.push(
            {
              'date': res.data[key].hh,
              'newYear': res.data[key].num_yuandan,
              'chineseNewYear': res.data[key].num_chunjie,
              'qingMing': res.data[key].num_qingming,
              'dragonBoatFestival': res.data[key].num_duanwu,
              'labourDay': res.data[key].num_wuyi,
              'midAutumn': res.data[key].num_zhongqiu,
              'nationalDay': res.data[key].num_guoqing,
              'yesterday': res.data[key].nums
            }
          )
        }
        // console.log('this.vm.holidayPassenger:', this.vm.holidayPassenger)
        this.vm.isHolidayPassenger = true
      } else {
        this.vm.isHolidayPassenger = false
      }
    })
  }
}
