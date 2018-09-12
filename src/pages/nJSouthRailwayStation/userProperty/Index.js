import { NJSouthRAilwayStationApi } from '../../../api/Index'
import Base from '../../base/Index'
import { Notification } from 'element-ui'

let ageRangeConfig = [
  { value: 'cnt_00_22', key: '22岁及以下' },
  { value: 'cnt_23_35', key: '23-35岁' },
  { value: 'cnt_36_45', key: '36-45岁' },
  { value: 'cnt_46_55', key: '46-55岁' },
  { value: 'cnt_56_00', key: '56岁及以上' }
] // 客流属性-年龄
let sexRangeConfig = [
  { value: 'man', key: '男性' },
  { value: 'woman', key: '女性' }
] // 客流属性-性别
export default class extends Base {
  /**
   * 取客流属性
   */
  areaFlowProperty () {
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    let param = {
      sDate: formatDate, date: formatDate
    }
    this.vm.data = []
    this.vm.ageList = []
    this.vm.sexList = []
    NJSouthRAilwayStationApi.areaFlowProperty(param).then(res => {
      if (res.data && res.data.length !== 0) {
        var ageTotal = parseInt(res.data[0].cnt_00_22) + parseInt(res.data[0].cnt_23_35) + parseInt(res.data[0].cnt_36_45) + parseInt(res.data[0].cnt_46_55) + parseInt(res.data[0].cnt_56_00)
        var sexTotal = parseInt(res.data[0].man) + parseInt(res.data[0].woman)
        this.vm.data.push(
          {
            key: 'age',
            value: {
              'cnt_00_22': res.data[0].cnt_00_22,
              'cnt_23_35': res.data[0].cnt_23_35,
              'cnt_36_45': res.data[0].cnt_36_45,
              'cnt_46_55': res.data[0].cnt_46_55,
              'cnt_56_00': res.data[0].cnt_56_00,
              'report_day': res.data[0].report_day
            }
          },
          {
            key: 'sex',
            value: {
              'man': res.data[0].man,
              'woman': res.data[0].woman,
              'report_day': res.data[0].report_day
            }
          }
        )
        this.vm.ageList = [
          {
            report_day: res.data[0].report_day,
            name: '23岁以下',
            value: (res.data[0].cnt_00_22 / ageTotal * 100).toFixed(2)
          },
          {
            report_day: res.data[0].report_day,
            name: '23-35岁',
            value: (res.data[0].cnt_23_35 / ageTotal * 100).toFixed(2)
          },
          {
            report_day: res.data[0].report_day,
            name: '36-45岁',
            value: (res.data[0].cnt_36_45 / ageTotal * 100).toFixed(2)
          },
          {
            report_day: res.data[0].report_day,
            name: '46-55岁',
            value: (res.data[0].cnt_46_55 / ageTotal * 100).toFixed(2)
          },
          {
            report_day: res.data[0].report_day,
            name: '56岁以上',
            value: (res.data[0].cnt_56_00 / ageTotal * 100).toFixed(2)
          }
        ]
        this.vm.sexList = [
          {
            report_day: res.data[0].report_day,
            name: '男',
            value: (res.data[0].man / sexTotal * 100).toFixed(2)
          },
          {
            report_day: res.data[0].report_day,
            name: '女',
            value: (res.data[0].woman / sexTotal * 100).toFixed(2)
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
    let propertyVal = flag === 'age' ? '年龄' : '性别'
    this.vm.pieData.title = `${this.vm.filterForm.date}游客${propertyVal}分布`
    if (obj && this.vm.ageList && this.vm.ageList.length !== 0 && this.vm.sexList && this.vm.sexList.length !== 0) {
      for (let key in obj) {
        let tempObj = flag === 'age' ? ageRangeConfig.find(_x => _x.value === key) : sexRangeConfig.find(_x => _x.value === key)
        if (tempObj) {
          this.vm.pieData.legendData.push(tempObj.key)
          this.vm.pieData.data.push({ name: tempObj.key, value: obj[key] })
        }
      }
    }
  }
}
