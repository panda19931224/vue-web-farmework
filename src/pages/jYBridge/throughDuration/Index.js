import { BridgeApi } from '../../../api/Index'
import Base from '../../base/Index'

const BRIDGE_ID = 2 // 大桥标识
export default class extends Base {
  /**
   * 昨日通行时长分布
   */
  yesterdayPassDurationDistribution () {
    this.vm.lineChart.xAxis.length = 0
    this.vm.list.length = 0
    this.vm.lineChart.data.length = 0
    BridgeApi.yesterdayPassDurationDistribution({
      bridgeId: BRIDGE_ID,
      date: this.vm.filterForm.date.replace(/\-/g, '') // eslint-disable-line
    }).then(res => {
      if (res.data) {
        let _data = {
          SN: [], // 由南向北
          NS: [] // 由北向南
        }
        let _tempSN = res.data['SN']
        _data.SN = [_tempSN[0].cnt_00_10, _tempSN[0].cnt_10_20, _tempSN[0].cnt_20_30, _tempSN[0].cnt_30_40, _tempSN[0].cnt_40_00]
        // x轴赋值
        this.vm.lineChart.xAxis = ['0-10分钟', '10-20分钟', '20-30分钟', '30-40分钟', '40分钟以上']
        for (let y in _tempSN) {
          this.vm.list.push(
            {
              date: this.vm.filterForm.date,
              description: '由南向北 0-10分钟',
              amount: _tempSN[y].cnt_00_10
            },
            {
              date: this.vm.filterForm.date,
              description: '由南向北 10-20分钟',
              amount: _tempSN[y].cnt_10_20
            },
            {
              date: this.vm.filterForm.date,
              description: '由南向北 20-30分钟',
              amount: _tempSN[y].cnt_20_30
            },
            {
              date: this.vm.filterForm.date,
              description: '由南向北 30-40分钟',
              amount: _tempSN[y].cnt_30_40
            },
            {
              date: this.vm.filterForm.date,
              description: '由南向北 40分钟以上',
              amount: _tempSN[y].cnt_40_00
            }
          )
        }
        let _tempNS = res.data['NS']
        _data.NS.push(_tempNS[0].cnt_00_10, _tempNS[0].cnt_10_20, _tempNS[0].cnt_20_30, _tempNS[0].cnt_30_40, _tempNS[0].cnt_40_00)
        for (let y in _tempNS) {
          this.vm.list.push(
            {
              date: this.vm.filterForm.date,
              description: '由北向南 0-10分钟',
              amount: _tempNS[y].cnt_00_10
            },
            {
              date: this.vm.filterForm.date,
              description: '由北向南 10-20分钟',
              amount: _tempNS[y].cnt_10_20
            },
            {
              date: this.vm.filterForm.date,
              description: '由北向南 20-30分钟',
              amount: _tempNS[y].cnt_20_30
            },
            {
              date: this.vm.filterForm.date,
              description: '由北向南 30-40分钟',
              amount: _tempNS[y].cnt_30_40
            },
            {
              date: this.vm.filterForm.date,
              description: '由北向南 40分钟以上',
              amount: _tempNS[y].cnt_40_00
            }
          )
        }
        let _obj = {
          name: '从北向南',
          type: 'line',
          data: _data.NS,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#056cb7'
              }
            }
          }
        }
        let _obj1 = {
          name: '从南向北',
          type: 'line',
          data: _data.SN,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#ea6942'
              }
            }
          }
        }
        this.vm.lineChart.data.push(_obj)
        this.vm.lineChart.data.push(_obj1)
      }
    })
  }
}
