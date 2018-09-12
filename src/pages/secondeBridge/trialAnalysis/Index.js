import { BridgeApi } from '../../../api/Index'
import Base from '../../base/Index'
import { Notification } from 'element-ui'

const BRIDGE_ID = 1 // 大桥标识
export default class extends Base {
  /**
   * 游客轨迹分析
   */
  touristTraceAnalysis () {
    this.vm.list.length = 0
    this.vm.map.cityData.length = 0
    this.vm.list = []
    this.vm.map.cityData = []
    BridgeApi.touristTraceAnalysis({
      bridgeId: BRIDGE_ID,
      date: this.vm.filterForm.date.replace(/\-/g, '') // eslint-disable-line
    }).then(res => {
      if (res.data.length !== 0) {
        res.data.forEach(_x => {
          this.vm.map.cityData.push(_x.countyName)
          this.vm.list.push({ ..._x, date: this.vm.filterForm.date })
        })
      } else {
        Notification.warning({
          title: '警告',
          message: '暂无今日数据'
        })
      }
      this.vm.$refs.nanJing.drawMap()
    })
  }
}
