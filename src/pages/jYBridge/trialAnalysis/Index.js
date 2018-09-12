import { BridgeApi } from '../../../api/Index'
import Base from '../../base/Index'
import { Notification } from 'element-ui'

const BRIDGE_ID = 2 // 大桥标识
export default class extends Base {
  /**
   * 游客轨迹分析
   */
  touristTraceAnalysis () {
    this.vm.list.length = 0
    this.vm.list = []
    this.vm.wXmap.cityData = []
    this.vm.tZmap.cityData = []
    BridgeApi.touristTraceAnalysis({
      bridgeId: BRIDGE_ID,
      date: this.vm.filterForm.date.replace(/\-/g, '') // eslint-disable-line
    }).then(res => {
      if (res.data.length !== 0) {
        res.data.forEach(_x => {
          this.vm.wXmap.cityData.push(_x.countyName)
          this.vm.tZmap.cityData.push(_x.countyName)
          this.vm.list.push({ ..._x, date: this.vm.filterForm.date })
        })
      } else {
        Notification.warning({
          title: '警告',
          message: '暂无今日数据'
        })
      }
      // console.log(this.vm.isProvince)
      if (this.vm.isProvince) {
        this.vm.$refs.taiZhou.drawMap()
      } else {
        this.vm.$refs.wuXi.drawMap()
      }
    })
  }
}
