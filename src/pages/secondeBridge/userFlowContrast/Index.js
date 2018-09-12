import { BridgeApi } from '../../../api/Index'
import Base from '../../base/Index'

const BRIDGE_ID = 1 // 大桥标识
export default class extends Base {
  /**
   * 每日客流对比 s-n
   */
  flowContrastSn () {
    this.vm.lineChart.xAxis.length = 0
    this.vm.lineChart.dataAll[0].data.length = 0
    this.vm.lineChart.dataAll[1].data.length = 0
    this.vm.list.length = 0
    let param = {
      sdate: this.vm.sDate,
      edate: this.vm.eDate,
      bridgeId: BRIDGE_ID
    }
    BridgeApi.flowContrast(param).then(res => {
      let _data = res.data.SN
      if (_data) {
        for (let i in _data.reverse()) {
          this.vm.list.push({ date: _data[i].f_day, value: _data[i].total, description: '从南到北' })
        }
        for (let i in _data.reverse()) {
          this.vm.lineChart.xAxis.push(_data[i].f_day)
          this.vm.lineChart.dataAll[0].data.push(_data[i].total)
        }
      }
      let _dataNs = res.data.NS
      if (_data) {
        for (let i in _dataNs) {
          // this.vm.lineChart.xAxis.push(_dataNs[i].f_day)
          this.vm.lineChart.dataAll[1].data.push(_dataNs[i].total)
        }
      }
    })
  }
  /**
   * 每日客流对比 n-s
   */
  flowContrastNs () {
    this.vm.lineChart.xAxis.length = 0
    this.vm.lineChart.dataAll[0].data.length = 0
    this.vm.lineChart.dataAll[1].data.length = 0
    this.vm.list.length = 0
    let param = {
      sdate: this.vm.sDate,
      edate: this.vm.eDate,
      bridgeId: BRIDGE_ID
    }
    BridgeApi.flowContrast(param).then(res => {
      let _data = res.data.NS
      if (_data) {
        for (let i in _data.reverse()) {
          this.vm.list.push({ date: _data[i].f_day, value: _data[i].total })
        }
        for (let i in _data.reverse()) {
          this.vm.lineChart.xAxis.push(_data[i].f_day)
          this.vm.lineChart.dataAll[1].data.push(_data[i].total)
        }
      }
      let _dataNs = res.data.SN
      if (_data) {
        for (let i in _dataNs) {
          // this.vm.lineChart.xAxis.push(_dataNs[i].f_day)
          this.vm.lineChart.dataAll[0].data.push(_dataNs[i].total)
        }
      }
    })
  }
}
