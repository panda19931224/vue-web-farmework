import { LuKouAirportApi } from '../../../api/Index'
import Base from '../../base/Index'
import { Notification } from 'element-ui'

const AREA_ID = '479' // 景区ID
let ageRangeConfig = [
  { value: 1, key: '22岁及以下' },
  { value: 2, key: '23~35岁' },
  { value: 3, key: '36~45岁' },
  { value: 4, key: '46~55岁' },
  { value: 5, key: '56岁及以上' }
] // 客流属性-年龄
let sexRangeConfig = [
  { value: 1, key: '男性' },
  { value: 2, key: '女性' }
] // 客流属性-性别
export default class extends Base {
  /**
   * 初始化日期
   */
  initDatePan () {
    this.vm.filterForm.validDate = this.vm.filterForm.date = this.vm.$utils.Date.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
  }

  /**
   * 取客流属性 - 年龄
   */
  ageDistribution () {
    // 格式化日期
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    // 拼接入参
    let param = {
      startDate: formatDate, endDate: formatDate, areaId: AREA_ID
    }
    this.vm.data = []
    this.vm.ageList = []
    LuKouAirportApi.ageDistribution(param).then(res => {
      // console.log(res.data)
      if (res.data && res.data.length !== 0) {
        this.vm.data.length = 0
        this.vm.data.push({ key: 'age', value: res.data })
        console.log(this.vm.pieData.data)
        this.vm.ageList = [
          {
            report_day: res.data[0].fDate,
            name: '23岁以下',
            value: (res.data[0].fPer * 100).toFixed(2)
          },
          {
            report_day: res.data[0].fDate,
            name: '23-35岁',
            value: (res.data[1].fPer * 100).toFixed(2)
          },
          {
            report_day: res.data[0].fDate,
            name: '36-45岁',
            value: (res.data[2].fPer * 100).toFixed(2)
          },
          {
            report_day: res.data[0].fDate,
            name: '46-55岁',
            value: (res.data[3].fPer * 100).toFixed(2)
          },
          {
            report_day: res.data[0].fDate,
            name: '56岁以上',
            value: (res.data[4].fPer * 100).toFixed(2)
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
   * 取客流属性 - 性别
   */
  genderDistribution () {
    // 格式化日期
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    // 拼接入参
    let param = {
      startDate: formatDate, endDate: formatDate, areaId: AREA_ID
    }
    this.vm.data = []
    this.vm.sexList = []
    LuKouAirportApi.genderDistribution(param).then(res => {
      if (res.data && res.data.length !== 0) {
        this.vm.data.length = 0
        this.vm.data.push({ key: 'sex', value: res.data })
        this.vm.sexList = [
          {
            report_day: res.data[0].fDate,
            name: '男',
            value: (res.data[1].fPer * 100).toFixed(2)
          },
          {
            report_day: res.data[0].fDate,
            name: '女',
            value: (res.data[0].fPer * 100).toFixed(2)
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
    obj = obj.sort((a, b) => { return a.fAgeRange > b.fAgeRange })
    let propertyVal = flag === 'age' ? '年龄' : '性别'
    this.vm.pieData.title = `${this.vm.filterForm.date}游客${propertyVal}分布`
    if (obj && this.vm.ageList && this.vm.ageList.length !== 0) {
      for (let key in obj) {
        let tempObj = flag === 'age' ? ageRangeConfig.find(_x => _x.value === obj[key].fAgeRange) : sexRangeConfig.find(_x => _x.value === obj[key].fSex)
        if (tempObj) {
          this.vm.pieData.legendData.push(tempObj.key)
          this.vm.pieData.data.push({ name: tempObj.key, value: obj[key].fCount })
        }
      }
    }
  }

  /**
   * 日期切換
   */
  changeDate (val) {
    let _today = new Date(new Date().getTime()).getDate()
    if (new Date(val.getTime()).getDate() < _today) {
      this.vm.filterForm.validDate = this.vm.filterForm.date = this.vm.$utils.Date.format(new Date(val.getTime()), 'yyyy-MM-dd')
      if (this.vm.filterForm.isAge) {
        this.ageDistribution()
      } else {
        this.genderDistribution()
      }
    } else {
      // 恢复有效日期
      this.vm.filterForm.date = this.vm.filterForm.validDate
      Notification.warning({
        title: '警告',
        message: '请选择今日之前的日期'
      })
    }
  }
}
