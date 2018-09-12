import { BridgeApi } from '../../../api/Index'
import Base from '../../base/Index'
import { Notification } from 'element-ui'
const BRIDGE_ID = 1 // 大桥标识

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
    if (obj && this.vm.ageList && this.vm.ageList.length !== 0) {
      let propertyVal = flag === 'age' ? '年龄' : '性别'
      this.vm.pieData.title = `${this.vm.filterForm.date}游客${propertyVal}分布`
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
    console.log(this.vm.pieData)
  }
  /**
   * 昨日年龄分布
   */
  yesterdayAgeDistribution () {
    this.vm.ageList = []
    this.vm.data.value = []
    BridgeApi.yesterdayAgeDistribution({ bridgeId: BRIDGE_ID, date: this.vm.filterForm.date.replace(/\-/g, '') }).then(res => { // eslint-disable-line
      if (res.data && res.data.length !== 0) {
        this.vm.data.length = 0
        this.vm.data.push({
          key: 'age',
          value: [
            {
              ageRange: '22岁以下',
              percentage: ((res.data[0].cnt_00_22 ? res.data[0].cnt_00_22 : 0) / res.data[0].total * 100).toFixed(2)
            },
            {
              ageRange: '23-35岁',
              percentage: ((res.data[0].cnt_23_35 ? res.data[0].cnt_23_35 : 0) / res.data[0].total * 100).toFixed(2)
            },
            {
              ageRange: '36-45岁',
              percentage: ((res.data[0].cnt_36_45 ? res.data[0].cnt_36_45 : 0) / res.data[0].total * 100).toFixed(2)
            },
            {
              ageRange: '46-55岁',
              percentage: ((res.data[0].cnt_46_55 ? res.data[0].cnt_46_55 : 0) / res.data[0].total * 100).toFixed(2)
            },
            {
              ageRange: '56岁及以上',
              percentage: ((res.data[0].cnt_56_00 ? res.data[0].cnt_56_00 : 0) / res.data[0].total * 100).toFixed(2)
            }
          ]
        })
        this.vm.ageList = [
          {
            report_day: res.data[0].f_day,
            name: '22岁以下',
            value: res.data[0].cnt_00_22 ? (res.data[0].cnt_00_22 / res.data[0].total * 100).toFixed(2) : 0
          },
          {
            report_day: res.data[0].f_day,
            name: '23-35岁',
            value: (res.data[0].cnt_23_35 / res.data[0].total * 100).toFixed(2)
          },
          {
            report_day: res.data[0].f_day,
            name: '36-45岁',
            value: (res.data[0].cnt_36_45 / res.data[0].total * 100).toFixed(2)
          },
          {
            report_day: res.data[0].f_day,
            name: '46-55岁',
            value: (res.data[0].cnt_46_55 / res.data[0].total * 100).toFixed(2)
          },
          {
            report_day: res.data[0].f_day,
            name: '56岁以上',
            value: (res.data[0].cnt_56_00 / res.data[0].total * 100).toFixed(2)
          }
        ]
        this.changeProperty()
        // console.log(' this.vm.data:', this.vm.data)
      } else {
        this.changeProperty()
        Notification.warning({
          title: '警告',
          message: '暂无今日数据'
        })
      }
    })
  }

  /**
   * 昨日性别分布
   */
  yesterdayGenderDistribution () {
    this.vm.sexList = []
    this.vm.data = []
    BridgeApi.yesterdayGenderDistribution({ bridgeId: BRIDGE_ID, date: this.vm.filterForm.date.replace(/\-/g, '')}).then(res => { // eslint-disable-line
      if (res.data && res.data.length !== 0) {
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
        this.vm.sexList = [
          {
            report_day: res.data[0].f_day,
            name: '男',
            value: (res.data[0].man / res.data[0].total * 100).toFixed(2)
          },
          {
            report_day: res.data[0].f_day,
            name: '女',
            value: (res.data[0].woman / res.data[0].total * 100).toFixed(2)
          }
        ]
        this.changeProperty()
      } else {
        this.changeProperty()
        Notification.warning({
          title: '警告',
          message: '暂无今日数据'
        })
      }
    })
  }
}
