import { LuKouAirportApi } from '../../../api/Index'
import Base from '../../base/Index'

const AREA_ID = '479' // 景区ID
export default class extends Base {
  /**
   * 每日客流对比
   */
  flowContrast () {
    this.vm.lineChart.xAxis.length = 0
    this.vm.lineChart.data.length = 0
    this.vm.list.length = 0
    LuKouAirportApi.flowContrast({ areaId: AREA_ID }).then(res => {
      let _data = res.data
      if (_data) {
        for (let i in _data) {
          this.vm.list.push({ date: _data[i].fDate, value: _data[i].fCountAll })
        }
        for (let i in _data.reverse()) {
          this.vm.lineChart.xAxis.push(_data[i].fDate)
          this.vm.lineChart.data.push(_data[i].fCountAll)
        }
      }
    })
  }
}
