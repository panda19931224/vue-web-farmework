import { BridgeApi } from '../../../api/Index'
import Base from '../../base/Index'
import ProvinceInfo from '../../../../static/json/ProvinceInfo'
import { Notification } from 'element-ui'

const BRIDGE_ID = 2
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
      bridgeId: BRIDGE_ID, date: this.vm.filterForm.date.replace(/-/g, '') // eslint-disable-line
    }).then(res => {
      if (res && res.data.length !== 0) {
        this.vm.provinceList = res.data
        res.data.forEach(_x => {
          this.vm.provinceData.push({ name: _x.city_name, value: _x.percentage })
        })
      }
    })
  }

  /**
   * 昨日外省客流来源分析
   */
  yesterdayOutsideProvinceFlowSourceAnalysis () {
    this.vm.nationData.length = 0
    this.vm.list.length = 0
    this.vm.nationData = []
    this.vm.list = []
    BridgeApi.yesterdayOutsideProvinceFlowSourceAnalysis({
      bridgeId: BRIDGE_ID, date: this.vm.filterForm.date.replace(/-/g, '') // eslint-disable-line
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
