import Vue from 'vue'
// import Codes from '../codes/apiResultCodes'
// import { Notification } from 'element-ui'

export default {
  /**
   * 实施客流量
   */
  realtimeFlowAmount (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/site/realtimeFlowAmount?areaId=${param.areaId}`, '', { load: false }).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 用户属性 - 年龄分布
   */
  ageDistribution (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/site/ageDistribution?areaId=${param.areaId}&startDate=${param.startDate}&endDate=${param.endDate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 用户属性 - 性别分布
   */
  genderDistribution (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/site/genderDistribution?areaId=${param.areaId}&startDate=${param.startDate}&endDate=${param.endDate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 客流来源 - 省内
   */
  flowSourceInsideProvince (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/site/flowSourceInsideProvince?areaId=${param.areaId}&startDate=${param.startDate}&endDate=${param.endDate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 客流来源 - 全国
   */
  flowSourceOutsideProvince (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/site/flowSourceOutsideProvince?areaId=${param.areaId}&startDate=${param.startDate}&endDate=${param.endDate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 停留时长
   */
  stayDuration (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/site/historyStayDuration?areaId=${param.areaId}&startDate=${param.startDate}&endDate=${param.endDate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 客流对比 --- 近15天的数据
   */
  flowContrast (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/site/flowContrast?areaId=${param.areaId}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 关联分析
   */
  relationshipAnalysis (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/site/relationshipAnalysis?date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 当日分时段客流
   */
  onTimeFlowAmount (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/site/onTimeFlowAmount?areaId=${param.areaId}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 客流量分析
   */
  historyFlowContrast (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/site/historyFlowContrast?areaId=${param.areaId}&startDate=${param.startDate}&endDate=${param.endDate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 停留时长分析
   */
  historyStayDuration (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/site/historyStayDuration?areaId=${param.areaId}&startDate=${param.startDate}&endDate=${param.endDate}`).then(res => {
        resolve(res)
      })
    })
  }
}
