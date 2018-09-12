import { LuKouAirportApi } from '../../../api/Index'
import Base from '../../base/Index'

const AREA_ID = 479
/* let ageRangeConfig = [
  { value: 1, key: '22岁及以下' },
  { value: 2, key: '23~35岁' },
  { value: 3, key: '36~45岁' },
  { value: 4, key: '46~55岁' },
  { value: 5, key: '56岁及以上' }
] */
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
  ageDistribution () {
    LuKouAirportApi.ageDistribution({
      areaId: AREA_ID,
      startDate: this.vm.dateInApi._start,
      endDate: this.vm.dateInApi._end
    }).then(res => {
      // 格式化数据
      let _list = []
      let _data = this.formatData(res.data)
      for (let i in _data) {
        let _obj = { date: _data[i].fDate }
        for (let x in _data[i].data) {
          _obj[`fAgeRange_${parseInt(x) + 1}`] = (_data[i].data[x].fPer * 100).toFixed(2)
        }
        _list.push(_obj)
      }
      this.vm.userPropertyOfAgeObj.list = _list
      this.vm.columns = this.vm.userPropertyOfAgeObj.columns
      this.vm.list = this.vm.userPropertyOfAgeObj.list
    })
  }

  /**
   * 客流属性 - 性别分布
   */
  genderDistribution () {
    LuKouAirportApi.genderDistribution({
      areaId: AREA_ID,
      startDate: this.vm.dateInApi._start,
      endDate: this.vm.dateInApi._end
    }).then(res => {
      // 格式化数据
      let _data = this.formatData(res.data)
      let _list = []
      for (let i in _data) {
        let _obj = { date: _data[i].fDate }
        for (let x in _data[i].data) {
          _obj[`fSex_${_data[i].data[x].fSex === 1 ? 'man' : 'woman'}`] = (_data[i].data[x].fPer * 100).toFixed(2)
        }
        _list.push(_obj)
      }
      this.vm.userPropertyOfSexObj.list = _list
      this.vm.columns = this.vm.userPropertyOfSexObj.columns
      this.vm.list = this.vm.userPropertyOfSexObj.list
    })
  }

  /**
   * 客流来源 - 省外
   */
  flowSourceInsideProvince () {
    LuKouAirportApi.flowSourceInsideProvince({
      areaId: AREA_ID,
      startDate: this.vm.dateInApi._start,
      endDate: this.vm.dateInApi._end
    }).then(res => {
      if (res.data) {
        this.vm.userSourceInProvinceObj.list = res.data
        this.vm.columns = this.vm.userSourceInProvinceObj.columns
        this.vm.list = this.vm.userSourceInProvinceObj.list
      }
    })
  }

  /**
   * 客流来源 - 省内
   */
  flowSourceOutsideProvince () {
    LuKouAirportApi.flowSourceOutsideProvince({
      areaId: AREA_ID,
      startDate: this.vm.dateInApi._start,
      endDate: this.vm.dateInApi._end
    }).then(res => {
      if (res.data) {
        this.vm.userSourceOutProvinceObj.list = res.data
        this.vm.columns = this.vm.userSourceOutProvinceObj.columns
        this.vm.list = this.vm.userSourceOutProvinceObj.list
      }
    })
  }

  /**
   * 客流量分析
   */
  historyFlowContrast () {
    LuKouAirportApi.historyFlowContrast({
      areaId: AREA_ID,
      startDate: this.vm.dateInApi._start,
      endDate: this.vm.dateInApi._end
    }).then(res => {
      this.vm.userFlowObj.list = res.data.map(item => ({fDate: item.fDate, fCountAll: item.fCountAll, fCountLocal: item.fCountLocal, fCountNolocal: (item.fCountNolocal - item.fCountOutpro), fCountOutpro: item.fCountOutpro}))
      this.vm.columns = this.vm.userFlowObj.columns
      this.vm.list = this.vm.userFlowObj.list
    })
  }

  /**
   * 停留时长分析
   */
  historyStayDuration () {
    LuKouAirportApi.historyStayDuration({
      areaId: AREA_ID,
      startDate: this.vm.dateInApi._start,
      endDate: this.vm.dateInApi._end
    }).then(res => {
      this.vm.throughDurationObj.list = res.data
      this.vm.columns = this.vm.throughDurationObj.columns
      this.vm.list = this.vm.throughDurationObj.list
    })
  }

  /**
   * 格式化数据
   */
  formatData (list) {
    let _data = []
    let _tempData = list
    for (let i in _tempData) {
      if (i > 0) {
        // 取同一天的 性别数据
        let _tempSameDayList = _tempData.filter(_x => _x.fDate.trim() === _tempData[i - 1].fDate.trim())
        let _obj = { fDate: _tempData[i].fDate.trim(), data: _tempSameDayList }
        if (_data.filter(_x => _x.fDate.trim() === _tempData[i].fDate.trim()).length < 1) {
          _data.push(_obj)
        }
      }
    }
    return _data
  }
}
