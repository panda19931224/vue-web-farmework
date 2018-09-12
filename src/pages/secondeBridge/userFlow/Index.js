import { BridgeApi } from '../../../api/Index'
import Base from '../../base/Index'
import ProvinceInfo from '../../../../static/json/ProvinceInfo'
import { Notification } from 'element-ui'

const BRIDGE_ID = 1
export default class extends Base {
  /**
   * 昨日本省客流来源分析
   */
  yesterdayInsideProvinceFlowSourceAnalysis () {
    this.vm.provinceData.length = 0
    this.vm.provinceList.length = 0
    this.vm.provinceData = []
    this.vm.provinceList = []
    BridgeApi.yesterdayInsideProvinceFlowSourceAnalysis({
      bridgeId: BRIDGE_ID, date: this.vm.filterForm.date.replace(/\-/g, '') // eslint-disable-line
    }).then(res => {
      if (res.data && res.data.length !== 0) {
        this.vm.provinceList = res.data
        for (let key in res.data) {
          this.vm.provinceData.push({ name: res.data[key].city_name, value: res.data[key].percentage })
        }
      }
    })
  }

  /**
   * 昨日外省客流来源分析
   */
  yesterdayOutsideProvinceFlowSourceAnalysis () {
    this.vm.nationData.length = 0
    this.vm.list.length = 0
    this.vm.list = []
    this.vm.nationData = []
    BridgeApi.yesterdayOutsideProvinceFlowSourceAnalysis({
      bridgeId: BRIDGE_ID, date: this.vm.filterForm.date.replace(/\-/g, '') // eslint-disable-line
    }).then(res => {
      try {
        if (res && res.data && res.data.length !== 0) {
          this.vm.list = res.data
          this.vm.nationData.length = 0
          for (let pro in ProvinceInfo) {
            let _provinceObj = res.data.find(_x => _x.province_name === ProvinceInfo[pro].provinceName)
            if (_provinceObj) {
              this.vm.nationData.push({ name: ProvinceInfo[pro].provinceName, value: _provinceObj.percentage })
            } else {
              this.vm.nationData.push({ name: ProvinceInfo[pro].provinceName, value: 0 })
              this.vm.list.push({
                selectedDate: this.vm.filterForm.date.replace(/-/g, ''),
                percentage: 0,
                total: 0,
                province_name: ProvinceInfo[pro].provinceName
              })
            }
          }
          // for (let pro in ProvinceInfo) {
          //   let _provinceObj = res.data.find(_x => _x.province_name === ProvinceInfo[pro].provinceName)
          //   if (_provinceObj) {
          //     this.vm.nationData.push({ name: ProvinceInfo[pro].provinceName, value: _provinceObj.percentage })
          //   } else {
          //     this.vm.nationData.push({ name: ProvinceInfo[pro].provinceName, value: 0 })
          //     this.vm.list.push({
          //       selectedDate: this.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
          //       percentage: 0,
          //       total: 0,
          //       province_name: ProvinceInfo[pro].provinceName
          //     })
          //   }
          // }
        } else {
          Notification.warning({
            title: '警告',
            message: '暂无今日数据'
          })
        }
      } catch (e) {
      }
    })
  }
}
