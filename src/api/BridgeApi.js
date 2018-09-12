import Vue from 'vue'
// import Codes from '../codes/apiResultCodes'
// import { Notification } from 'element-ui'

export default {
  /**
   * 取实时客流 和 累计客流
   */
  realtimeFlowAmount (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/realtimeFlowAmount?bridgeId=${param.bridgeId}`).then(res => {
        resolve(res)
        // if (res.status === Codes.SUCCESS) {
        //   resolve(res)
        // } else {
        //   Notification.error({
        //     title: '错误',
        //     message: res.msg
        //   })
        // }
      })
    })
  },
  /**
   * 昨日本省客流来源分析
   */
  yesterdayInsideProvinceFlowSourceAnalysis (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/yesterdayInsideProvinceFlowSourceAnalysis?bridgeId=${param.bridgeId}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 昨日外省客流来源分析
   */
  yesterdayOutsideProvinceFlowSourceAnalysis (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/yesterdayOutsideProvinceFlowSourceAnalysis?bridgeId=${param.bridgeId}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 昨日年龄分布
   */
  yesterdayAgeDistribution (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/yesterdayAgeDistribution?bridgeId=${param.bridgeId}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 昨日性别分布
   */
  yesterdayGenderDistribution (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/yesterdayGenderDistribution?bridgeId=${param.bridgeId}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 昨日通行时长分布
   */
  yesterdayPassDurationDistribution (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/yesterdayPassDurationDistribution?bridgeId=${param.bridgeId}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 关联分析
   */
  relationshipAnalysis (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/relationshipAnalysis?bridgeId=${param.bridgeId}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 当日分时段客流
   */
  theDaySubPeriodFlow (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/theDaySubPeriodFlow?bridgeId=${param.bridgeId}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 历史年龄分布
   */
  historyAgeDistribution (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/historyAgeDistribution?bridgeId=${param.bridgeId}&sdate=${param.sdate}&edate=${param.edate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 历史-客流量分析
   */
  historyFlowSourceAnalysis (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/historyFlowSourceAnalysis?bridgeId=${param.bridgeId}&sdate=${param.sdate}&edate=${param.edate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 历史-省内客流来源分析
   */
  historyInsideProvinceFlowSourceAnalysis (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/historyInsideProvinceFlowSourceAnalysis?bridgeId=${param.bridgeId}&sdate=${param.sdate}&edate=${param.edate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 历史-省外客流来源分析
   */
  historyOutsideProvinceFlowSourceAnalysis (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/historyOutsideProvinceFlowSourceAnalysis?bridgeId=${param.bridgeId}&sdate=${param.sdate}&edate=${param.edate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 历史-停留时长分析
   */
  historyPassDurationDistribution (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/historyPassDurationDistribution?bridgeId=${param.bridgeId}&sdate=${param.sdate}&edate=${param.edate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 历史-停留时长分析
   */
  historyGenderDistribution (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/historyGenderDistribution?bridgeId=${param.bridgeId}&sdate=${param.sdate}&edate=${param.edate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 游客轨迹分析
   */
  touristTraceAnalysis (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/touristTraceAnalysis?bridgeId=${param.bridgeId}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 客流对比 --- 近15天的数据
   */
  flowContrast (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/bridge/historyPassDurationDistribution?bridgeId=${param.bridgeId}&sdate=${param.sdate}&edate=${param.edate}`).then(res => {
        resolve(res)
      })
    })
  }
}
