import { BridgeApi } from '../../../api/Index'
import Base from '../../base/Index'
import { Notification } from 'element-ui'

const BRIDGE_ID = 1 // 大桥标识
export default class extends Base {
  /**
   * 关联分析
   */
  relationshipAnalysis () {
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    let param = {
      bridgeId: BRIDGE_ID,
      date: formatDate
    }
    this.vm.list = []
    BridgeApi.relationshipAnalysis(param).then(res => {
      if (res.data.length > 0) {
        for (let i in res.data) {
          let _flag = res.data[i].destinationSite === '禄口机场' ? '4' : res.data[i].destinationSite === '南京南站' ? '2' : res.data[i].destinationSite === '江阴大桥' ? '1' : '0'
          let _obj = { ...res.data[i], date: formatDate, flag: _flag }
          this.vm.list.push(_obj)
        }
        this.vm.block = 'block'
        this.initDrawLine()
      } else {
        this.vm.block = 'none'
        Notification.warning({
          title: '警告',
          message: '暂无今日数据'
        })
      }
    })
  }

  /**
   * 根据数量量确定线条粗细
   */
  initDrawLine () {
    const baseLineWidth = '2' // 基础线条宽度
    let sortArr = this.vm.list.sort((a, b) => {
      return parseInt(a.amount) - parseInt(b.amount)
    })
    for (let i in sortArr) {
      if (sortArr[i].flag !== '0') {
        let refVal = `line${sortArr[i].flag}`
        let _val = i
        if (i > 0) {
          if (parseInt(sortArr[i].amount) === parseInt(sortArr[i - 1].amount)) {
            _val = i - 1
          }
        }
        let lineWidth = (parseInt(_val) + 1) * baseLineWidth
        this.vm.$refs[refVal].style.borderWidth = lineWidth + 'px'
        this.vm.$refs[refVal].style.borderColor = '#ed6943'
      }
    }
  }
}
