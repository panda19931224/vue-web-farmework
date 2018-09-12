import { BridgeApi } from '../../../api/Index'
import Base from '../../base/Index'
import ProvinceInfo from '../../../../static/json/ProvinceInfo'

const BRIDGE_ID = 1 // 大桥标识
const TIME = 900
export default class extends Base {
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
   * 格式化纬度数据
   * @param flag
   */
  formatObj (flag) {
    this.vm.pieData = {
      data: [], // 数据
      legendData: [],
      title: ''
    }
    let obj = this.vm.data.find(_x => _x.key === flag).value
    if (obj) {
      for (let key in obj) {
        let tempObj = flag === 'age' ? {
          name: obj[key].ageRange, value: obj[key].percentage
        } : { name: obj[key].sexDist, value: obj[key].percentage }
        if (tempObj) {
          this.vm.pieData.legendData.push(tempObj.name)
          this.vm.pieData.data.push(tempObj)
        }
      }
    }
  }

  /**
   * 取实时客流量 和 今日累计客流量
   */
  realtimeFlowAmount () {
    BridgeApi.realtimeFlowAmount({ bridgeId: BRIDGE_ID }).then(res => {
      let _data = res.data
      if (_data) {
        this.vm.todayFlowValueObj.NorthToSouth = _data.northToSouthRealtimeFlow || 0
        this.vm.todayFlowValueObj.SouthToNorth = _data.southToNorthRealtimeFlow || 0
        this.vm.todayFlowValueObj.TodayNorthToSouth = _data.northToSouthCumulativeFlow || 0
        this.vm.todayFlowValueObj.TodaySouthToNorth = _data.southToNorthCumulativeFlow || 0
      }
    })
  }

  /**
   * 昨日本省客流来源分析
   */
  yesterdayInsideProvinceFlowSourceAnalysis () {
    BridgeApi.yesterdayInsideProvinceFlowSourceAnalysis({
      bridgeId: BRIDGE_ID, date: this.vm.filterForm.date
    }).then(res => {
      for (let key in res.data) {
        this.vm.provinceData.push({ name: res.data[key].city_name, value: res.data[key].percentage })
      }
    })
  }

  /**
   * 昨日外省客流来源分析
   */
  yesterdayOutsideProvinceFlowSourceAnalysis () {
    BridgeApi.yesterdayOutsideProvinceFlowSourceAnalysis({
      bridgeId: BRIDGE_ID, date: this.vm.filterForm.date
    }).then(res => {
      try {
        this.vm.nationData.length = 0
        if (res && res.data) {
          for (let pro in ProvinceInfo) {
            let _provinceObj = res.data.find(_x => _x.province_name.trim() === ProvinceInfo[pro].provinceName)
            if (_provinceObj) {
              this.vm.nationData.push({ name: ProvinceInfo[pro].provinceName, value: _provinceObj.percentage })
            } else {
              this.vm.nationData.push({ name: ProvinceInfo[pro].provinceName, value: 0 })
            }
          }
        }
      } catch (e) {
      }
    })
  }

  /**
   * 当日分时段客流:由南向北 和 由北向南
   */
  theDaySubPeriodFlow () {
    this.vm.lineChart.xAxis.length = 0
    BridgeApi.theDaySubPeriodFlow({ bridgeId: BRIDGE_ID }).then(res => {
      if (res.data) {
        let _data = {
          NS: [],
          SN: []
        }
        // 取x轴数据
        // 默认取最近的10小时
        // 由北向南
        let _tempNSData = res.data['NS']
        if (_tempNSData.length > 10) {
          _tempNSData = _tempNSData.slice(_tempNSData.length - 10, _tempNSData.length)
        }
        this.vm.lineChart.xAxis = []
        for (let i in _tempNSData) {
          this.vm.lineChart.xAxis.push(_tempNSData[i].time)
          _data['NS'].push(_tempNSData[i].count)
        }
        // 由南向北
        let _tempSNData = res.data['SN']
        if (_tempSNData.length > 10) {
          _tempSNData = _tempSNData.slice(_tempSNData.length - 10, _tempSNData.length)
        }
        for (let i in _tempSNData) {
          _data['SN'].push(_tempSNData[i].count)
        }
        let _objSN = {
          name: '由南向北',
          type: 'line',
          data: _data['SN'],
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
        let _objNS = {
          name: '由北向南',
          type: 'line',
          data: _data['NS'],
          smooth: true,
          showSymbol: false,
          symbol: 'circle',
          areaStyle: {
            normal: {
              color: '#056cb7'
            }
          },
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#056cb7'
              }
            }
          }
        }
        this.vm.lineChart.data.push(_objSN)
        this.vm.lineChart.data.push(_objNS)
      }
    })
  }

  /**
   * 昨日年龄分布
   */
  yesterdayAgeDistribution () {
    BridgeApi.yesterdayAgeDistribution({ bridgeId: BRIDGE_ID, date: this.vm.filterForm.date }).then(res => {
      if (res.data) {
        this.vm.data.length = 0
        this.vm.data.push({
          key: 'age',
          value: [
            {
              ageRange: '22岁以下',
              percentage: (res.data[0].cnt_00_22 / res.data[0].total * 100).toFixed(2)
            },
            {
              ageRange: '22-35岁',
              percentage: (res.data[0].cnt_22_35 / res.data[0].total * 100).toFixed(2)
            },
            {
              ageRange: '36-45岁',
              percentage: (res.data[0].cnt_36_45 / res.data[0].total * 100).toFixed(2)
            },
            {
              ageRange: '46-55岁',
              percentage: (res.data[0].cnt_46_55 / res.data[0].total * 100).toFixed(2)
            },
            {
              ageRange: '56岁及以上',
              percentage: (res.data[0].cnt_56_00 / res.data[0].total * 100).toFixed(2)
            }
          ]
        })
        this.changeProperty()
      }
    })
  }

  /**
   * 昨日性别分布
   */
  yesterdayGenderDistribution () {
    BridgeApi.yesterdayGenderDistribution({ bridgeId: BRIDGE_ID, date: this.vm.filterForm.date }).then(res => {
      if (res.data) {
        this.vm.data.length = 0
        this.vm.data.push({
          key: 'sex',
          value: [
            {
              sexDist: '女',
              percentage: (res.data[0].woman / res.data[0].total * 100).toFixed(2)
            },
            {
              sexDist: '男',
              percentage: (res.data[0].man / res.data[0].total * 100).toFixed(2)
            }
          ]
        })
        this.changeProperty()
      }
    })
  }

  /**
   * 昨日通行时长分布
   */
  yesterdayPassDurationDistribution () {
    BridgeApi.yesterdayPassDurationDistribution({ bridgeId: BRIDGE_ID, date: this.vm.filterForm.date }).then(res => {
      if (res.data) {
        let _data = {
          SN: [], // 由南向北
          NS: [] // 由北向南
        }
        let _tempSN = res.data['SN']
        _data.SN = [_tempSN[0].cnt_00_10, _tempSN[0].cnt_10_20, _tempSN[0].cnt_20_30, _tempSN[0].cnt_30_40, _tempSN[0].cnt_40_00]
        // x轴赋值
        this.vm.lineNoAreaChart.xAxis = ['0-10分钟', '10-20分钟', '20-30分钟', '30-40分钟', '40分钟以上']
        let _tempNS = res.data['NS']
        _data.NS.push(_tempNS[0].cnt_00_10, _tempNS[0].cnt_10_20, _tempNS[0].cnt_20_30, _tempNS[0].cnt_30_40, _tempNS[0].cnt_40_00)
        let _objNS = {
          name: '由北向南',
          type: 'line',
          data: _data.NS,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#ea6942'
              }
            }
          }
        }
        let _objSN = {
          name: '由南向北',
          type: 'line',
          data: _data.SN,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#056cb7'
              }
            }
          }
        }
        this.vm.lineNoAreaChart.data.push(_objNS)
        this.vm.lineNoAreaChart.data.push(_objSN)
      }
    })
  }

  setInterval () {
    this.vm.setIntervalObj = window.setInterval(() => {
      this.realtimeFlowAmount()
    }, TIME * 1000)
  }
}
