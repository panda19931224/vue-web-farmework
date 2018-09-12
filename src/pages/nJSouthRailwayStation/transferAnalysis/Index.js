import { NJSouthRAilwayStationApi } from '../../../api/Index'
import Base from '../../base/Index'
import { Notification } from 'element-ui'
// import ProvinceInfo from '../../../../static/json/ProvinceInfo'
export default class extends Base {
  /**
   * 换成分析：从spec1=高铁出站口/长途大巴出站口 去别的站点 换成信息
   */
  getTransferAnalysisA () {
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    let param = {
      date: formatDate
    }
    this.vm.data = []
    // this.vm.list = []
    this.vm.sankeyData = {
      data: [],
      links: []
    }
    NJSouthRAilwayStationApi.getTransferAnalysisA(param).then(res => {
      if (res.data && res.data.length !== 0) {
        this.vm.sanji = true
        for (let key in res.data) {
          this.vm.data.push(
            {
              'date': res.data[key].dd,
              'source': res.data[key].spec1,
              'target': res.data[key].spec2,
              'value': res.data[key].nums
            }
          )
        }
        // this.vm.list = this.vm.data
        for (let key in this.vm.data) {
          let haveSource = this.vm.sankeyData.data.find(_y => _y.name === this.vm.data[key].source)
          let haveTarget = this.vm.sankeyData.data.find(_y => _y.name === this.vm.data[key].target)
          if (!haveSource) {
            this.vm.sankeyData.data.push({ name: this.vm.data[key].source })
          }
          if (!haveTarget) {
            this.vm.sankeyData.data.push({ name: this.vm.data[key].target })
          }
          this.vm.sankeyData.links.push({
            source: this.vm.data[key].source,
            target: this.vm.data[key].target,
            value: this.vm.data[key].value
          })
        }
      } else {
        this.vm.sanji = false
        Notification.warning({
          title: '警告',
          message: '暂无今日数据'
        })
      }
    })
  }
  /**
   * 换成分析：从spec1=高铁出站口/长途大巴出站口 去别的站点 换成信息
   */
  getTransferAnalysisB () {
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    let param = {
      date: formatDate
    }
    this.vm.dataBtn = []
    this.vm.sankeyDataBtn = {
      data: [],
      links: []
    }
    NJSouthRAilwayStationApi.getTransferAnalysisB(param).then(res => {
      if (res.data) {
        // console.log(' res:', res)
        for (let key in res.data) {
          this.vm.dataBtn.push(
            {
              'date': res.data[key].dd,
              'source': res.data[key].spec1,
              'target': res.data[key].spec2,
              'value': res.data[key].nums
            }
          )
        }
        // console.log(' this.vm.dataBtn:', this.vm.list)
        // this.vm.list = this.vm.list.concat(this.vm.dataBtn)
        console.log(' this.vm.list:', this.vm.list)
        for (let key in this.vm.dataBtn) {
          let haveSource = this.vm.sankeyDataBtn.data.find(_y => _y.name === this.vm.dataBtn[key].source)
          let haveTarget = this.vm.sankeyDataBtn.data.find(_y => _y.name === this.vm.dataBtn[key].target)
          if (!haveSource) {
            this.vm.sankeyDataBtn.data.push({ name: this.vm.dataBtn[key].source })
          }
          if (!haveTarget) {
            this.vm.sankeyDataBtn.data.push({ name: this.vm.dataBtn[key].target })
          }
          this.vm.sankeyDataBtn.links.push({
            source: this.vm.dataBtn[key].source,
            target: this.vm.dataBtn[key].target,
            value: this.vm.dataBtn[key].value
          })
        }
        console.log(' this.vm.sankeyData:', this.vm.sankeyDataBtn)
      } else {
        Notification.warning({
          title: '警告',
          message: '暂无今日数据'
        })
      }
    })
  }
  /**
   * 换成分析：表格数据
   */
  getTransferTable () {
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    let param = {
      date: formatDate
    }
    this.vm.list = []
    NJSouthRAilwayStationApi.getTransferTable(param).then(res => {
      if (res.data) {
        // console.log(' res:', res)
        for (let key in res.data) {
          this.vm.list.push(
            {
              'date': res.data[key].dd,
              'source': res.data[key].spec1,
              'target': res.data[key].spec2,
              'value': res.data[key].nums
            }
          )
        }
      } else {
        Notification.warning({
          title: '警告',
          message: '暂无今日数据'
        })
      }
    })
  }
}
