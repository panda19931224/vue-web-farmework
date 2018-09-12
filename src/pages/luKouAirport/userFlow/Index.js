import { LuKouAirportApi } from '../../../api/Index'
import Base from '../../base/Index'
import ProvinceInfo from '../../../../static/json/ProvinceInfo'
import { Notification } from 'element-ui'

const AREA_ID = 479
export default class extends Base {
  /**
   * 初始化日期
   */
  initDate () {
    this.vm.filterForm.validDate = this.vm.filterForm.date = this.vm.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
  }

  /**
   * 取全国 客流来源数据
   */
  flowSourceOutsideProvince () {
    this.vm.nationData = []
    this.vm.list = []
    this.vm.nationData.length = 0
    this.vm.list.length = 0
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    let param = {
      startDate: formatDate, endDate: formatDate, areaId: AREA_ID
    }
    LuKouAirportApi.flowSourceOutsideProvince(param).then(res => {
      if (res.data && res.data.length !== 0) {
        this.vm.list = res.data
        for (let key in res.data) {
          this.vm.nationData.push({ name: res.data[key].provinceName, value: res.data[key].per })
        }
        for (let pro in ProvinceInfo) {
          let have = res.data.find(_x => _x.provinceName === ProvinceInfo[pro].provinceName)
          if (!have) {
            this.vm.nationData.push({ name: ProvinceInfo[pro].provinceName, value: 0 })
            this.vm.list.push({
              fCount: 0,
              fCountAll: 0,
              fCountCt: 0,
              fDate: formatDate,
              fProvinceId: 1,
              per: 0,
              provinceName: ProvinceInfo[pro].provinceName
            })
          }
        }
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
  flowSourceInsideProvince () {
    this.vm.provinceData.length = 0
    this.vm.provinceList.length = 0
    this.vm.provinceData = []
    this.vm.provinceList = []
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    let param = {
      startDate: formatDate, endDate: formatDate, areaId: AREA_ID
    }
    LuKouAirportApi.flowSourceInsideProvince(param).then(res => {
      if (res.data) {
        this.vm.provinceList = res.data
        for (let key in res.data) {
          this.vm.provinceData.push({ name: res.data[key].cityName, value: res.data[key].per })
        }
      }
    })
  }

  /**
   * 日期切换
   * @param val
   */
  changeDate (val) {
    this.flowSourceOutsideProvince()
    this.flowSourceInsideProvince()
  }
}
