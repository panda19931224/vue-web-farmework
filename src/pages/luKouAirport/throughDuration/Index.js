import { LuKouAirportApi } from '../../../api/Index'
import Base from '../../base/Index'

const AREA_ID = '479' // 景区ID
export default class extends Base {
  /**
   * 停留时长
   */
  stayDuration () {
    this.vm.list.length = 0
    this.vm.pieChart.data.length = 0
    let formatDate = this.vm.$utils.Date.format(new Date(this.vm.filterForm.date), 'yyyyMMdd')
    let param = {
      areaId: AREA_ID,
      startDate: formatDate,
      endDate: formatDate
    }
    LuKouAirportApi.stayDuration(param).then(res => {
      console.log(' res.data:', res.data)
      if (res.data) {
        /* for (let i in res.data) {
          this.vm.pieChart.data.push({name: i, value: res.data[i]})
          this.vm.list.push({name: i, value: res.data[i]})
        } */
        this.vm.pieChart.data = [
          {
            name: '小于1小时',
            value: res.data[0].cnt_0_1
          },
          {
            name: '1-2小时',
            value: res.data[0].cnt_1_2
          },
          {
            name: '2-3小时',
            value: res.data[0].cnt_2_3
          },
          {
            name: '3-4小时',
            value: res.data[0].cnt_3_4
          },
          {
            name: '4小时以上',
            value: res.data[0].cnt_4_0
          }
        ]
        this.vm.list = [
          {
            date: res.data[0].date,
            name: '小于1小时',
            value: res.data[0].cnt_0_1
          },
          {
            date: res.data[0].date,
            name: '1-2小时',
            value: res.data[0].cnt_1_2
          },
          {
            date: res.data[0].date,
            name: '2-3小时',
            value: res.data[0].cnt_2_3
          },
          {
            date: res.data[0].date,
            name: '3-4小时',
            value: res.data[0].cnt_3_4
          },
          {
            date: res.data[0].date,
            name: '4小时以上',
            value: res.data[0].cnt_4_0
          }
        ]
      }
    })
  }
}
