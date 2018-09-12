import { LuKouAirportApi } from '../../../api/Index'
import Base from '../../base/Index'
import ProvinceInfo from '../../../../static/json/ProvinceInfo'

const AREA_ID = '479' // 景区ID
const TIME = 900 // 实时客流间隔时间
let ageRangeConfig = [
  { value: 1, key: '22岁及以下' },
  { value: 2, key: '23~35岁' },
  { value: 3, key: '36~45岁' },
  { value: 4, key: '46~55岁' },
  { value: 5, key: '56岁及以上' }
] // 客流属性-年龄
let sexRangeConfig = [
  { value: 1, key: '男性' },
  { value: 2, key: '女性' }
] // 客流属性-性别
export default class extends Base {
  /**
   * 昨日客流来源分析 - 全省
   */
  flowSourceInsideProvince () {
    let _yestoday = this.vm.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd') // 昨日
    let _param = {
      startDate: _yestoday, endDate: _yestoday, areaId: AREA_ID
    }
    LuKouAirportApi.flowSourceInsideProvince(_param).then(res => {
      if (res.data) {
        this.vm.provinceList = res.data
        for (let key in res.data) {
          this.vm.provinceData.push({ name: res.data[key].cityName, value: res.data[key].per })
        }
      }
    })
  }

  /**
   * 昨日客流来源 - 全国
   */
  flowSourceOutsideProvince () {
    let _yestoday = this.vm.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd') // 昨日
    let _param = {
      startDate: _yestoday, endDate: _yestoday, areaId: AREA_ID
    }
    LuKouAirportApi.flowSourceOutsideProvince(_param).then(res => {
      if (res.data) {
        for (let key in res.data) {
          this.vm.nationData.push({ name: res.data[key].provinceName, value: res.data[key].per })
        }
        for (let pro in ProvinceInfo) {
          let have = res.data.find(_x => _x.provinceName === ProvinceInfo[pro].provinceName)
          if (!have) {
            this.vm.nationData.push({ name: ProvinceInfo[pro].provinceName, value: 0 })
          }
        }
      }
    })
  }

  /**
   * 客流属性 - 年龄
   */
  ageDistribution () {
    let _yestoday = this.vm.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd') // 昨日
    let _param = {
      startDate: _yestoday, endDate: _yestoday, areaId: AREA_ID
    }
    LuKouAirportApi.ageDistribution(_param).then(res => {
      if (res.data) {
        this.vm.data.length = 0
        this.vm.data.push({ key: 'age', value: res.data })
        this.changeProperty()
      }
    })
  }

  /**
   * 取客流属性 - 性别
   */
  genderDistribution () {
    let _yestoday = this.vm.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd') // 昨日
    let _param = {
      startDate: _yestoday, endDate: _yestoday, areaId: AREA_ID
    }
    LuKouAirportApi.genderDistribution(_param).then(res => {
      if (res.data) {
        this.vm.data.length = 0
        this.vm.data.push({ key: 'sex', value: res.data })
        this.changeProperty()
      }
    })
  }

  /**
   * 切换客流属性纬度
   */
  changeProperty () {
    // 年龄纬度
    if (this.vm.filterForm.isAge) {
      this.formatObj('age')
    } else {
      this.formatObj('sex')
    }
  }

  /**
   * 当日分时段客流
   */
  /**
   * 昨日停留时长
   */
  stayDuration () {
    this.vm.lineNoAreaChart.xAxis.length = 0
    this.vm.lineNoAreaChart.data.length = 0
    let _yestoday = this.vm.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd') // 昨日
    let param = {
      startDate: _yestoday, endDate: _yestoday, areaId: AREA_ID
    }
    LuKouAirportApi.stayDuration(param).then(res => {
      if (res.data) {
        let _data = []
        this.vm.lineNoAreaChart.xAxis = ['小于1小时', '1-2小时', '2-3小时', '3-4小时', '4小时以上']
        _data = [res.data[0].cnt_0_1, res.data[0].cnt_1_2, res.data[0].cnt_2_3, res.data[0].cnt_3_4, res.data[0].cnt_4_0]
        let obj = {
          name: '昨日停留时长',
          type: 'line',
          data: _data,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#ea6942'
              }
            }
          }
        }
        this.vm.lineNoAreaChart.data.push(obj)
      }
    })
  }

  /**
   * 格式化纬度数据
   * @param flag
   */
  formatObj (flag) {
    this.vm.pieData = {
      data: [], // 数据
      legendData: [],
      title: ''
    }
    console.log(this.vm.data[0].key === 'age')
    console.log(flag)
    let obj = this.vm.data.find(_x => _x.key === flag).value
    obj = obj.sort((a, b) => { return a.fAgeRange > b.fAgeRange })
    let propertyVal = flag === 'age' ? '年龄' : '性别'
    this.vm.pieData.title = `${this.vm.filterForm.date}游客${propertyVal}分布`
    if (obj) {
      for (let key in obj) {
        let tempObj = flag === 'age' ? ageRangeConfig.find(_x => _x.value === obj[key].fAgeRange) : sexRangeConfig.find(_x => _x.value === obj[key].fSex)
        if (tempObj) {
          this.vm.pieData.legendData.push(tempObj.key)
          this.vm.pieData.data.push({ name: tempObj.key, value: obj[key].fCount })
        }
      }
    }
  }

  /**
   * 当日分时段客流
   */
  onTimeFlowAmount () {
    LuKouAirportApi.onTimeFlowAmount({ areaId: AREA_ID }).then(res => {
      if (res.data) {
        let _data = res.data.slice(0, 10).reverse()
        let _list = []
        _data.forEach(_x => {
          this.vm.lineChart.xAxis.push(this.vm.$utils.Date.format(new Date(_x.time), 'hh'))
          _list.push(_x.flow.total)
        })
        let _obj = {
          name: '当日分时段客流',
          type: 'line',
          data: _list,
          smooth: true,
          showSymbol: false,
          symbol: 'circle',
          areaStyle: {
            normal: {
              color: '#ea6942'
            }
          },
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#ea6942'
              }
            }
          }
        }
        this.vm.lineChart.data.push(_obj)
      }
    })
  }

  /**
   * 实时客流量
   */
  realtimeFlowAmount () {
    LuKouAirportApi.realtimeFlowAmount({ areaId: AREA_ID }).then(res => {
      this.vm.realtimeFlow = res.data
    })
  }

  setInterval () {
    this.vm.setIntervalObj = window.setInterval(() => {
      this.realtimeFlowAmount()
    }, TIME * 1000)
  }
}
