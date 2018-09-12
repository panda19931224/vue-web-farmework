import { NJSouthRAilwayStationApi } from '../../../api/Index'
import Base from '../../base/Index'
import ProvinceInfo from '../../../../static/json/ProvinceInfo'
import { Notification } from 'element-ui'

export default class extends Base {
  /**
   * 取全国 客流来源数据
   */
  flowProvDay () {
    this.vm.nationData.length = 0
    this.vm.list.length = 0
    this.vm.nationData = []
    this.vm.list = []
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    let param = {
      sDate: formatDate,
      date: formatDate
    }
    NJSouthRAilwayStationApi.flowProvDay(param).then(res => {
      if (res.data && res.data.length !== 0) {
        this.vm.list = res.data
        for (let key in res.data) {
          this.vm.nationData.push({ name: res.data[key].city_name, value: res.data[key].rate })
        }
        console.log(' this.vm.nationData:', this.vm.nationData)
        for (let pro in ProvinceInfo) {
          let have = res.data.find(_x => _x.city_name === ProvinceInfo[pro].provinceName)
          if (!have) {
            this.vm.nationData.push({ name: ProvinceInfo[pro].provinceName, value: 0 })
            this.vm.list.push({
              report_day: formatDate,
              city_name: ProvinceInfo[pro].provinceName,
              rate: 0,
              day_num: 0
            })
          }
        }
        // console.log(' this.vm.nationData:', this.vm.nationData)
        // console.log(' this.vm.list:', this.vm.list)
      } else {
        Notification.warning({
          title: '警告',
          message: '暂无今日数据'
        })
      }
    })
  }

  /**
   * 取全省 客流来源数据
   */
  flowCityDay () {
    this.vm.provinceData.length = 0
    this.vm.provinceList = []
    this.vm.provinceData = []
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    let param = {
      sDate: formatDate,
      date: formatDate
    }
    NJSouthRAilwayStationApi.flowCityDay(param).then(res => {
      if (res.data && res.data.length !== 0) {
        this.vm.provinceList = res.data
        for (let key in res.data) {
          this.vm.provinceData.push({ name: res.data[key].city_name, value: res.data[key].rate })
        }
        // console.log(' this.vm.provinceData:', this.vm.provinceData)
      }
    })
  }
}
