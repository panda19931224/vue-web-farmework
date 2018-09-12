import Vue from 'vue'
// import Codes from '../codes/apiResultCodes'
// import { Notification } from 'element-ui'

export default {
  /**
   * 取全国的客流来源数据
   * @param param
   */
  flowProvDay (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/durationProvinceProportion?sdate=${param.sDate}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 取全省客流来源数据
   * @param param
   */
  flowCityDay (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/durationCityProportion?sdate=${param.sDate}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 客流属性分析
   * @param param
   */
  areaFlowProperty (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/durationAgeAndSexData?sdate=${param.sDate}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 客流属性分析-年龄
   * @param param
   */
  areaFlowAgeProperty (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/touristAgeForTable?sdate=${param.sDate}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 客流属性分析-性别
   * @param param
   */
  areaFlowSexProperty (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/touristSexForTable?sdate=${param.sDate}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 总览 实时客流
   * @param param
   */
  getRealTimeFlow (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get('iTransport/trafficDepartment/southStation/indexRealTimeFlow').then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 总览 昨日客流
   * @param param
   */
  getYesterdayIndexRealTime (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get('iTransport/trafficDepartment/southStation/yesterdayIndexRealTime').then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 各场站昨日客流
   * @param param
   */
  getTerminalYesterdayIndexRealTime (param, date) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/yesterdayFlow?spec=${param}&date=${date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 当日分时段客流
   * @param param
   */
  getIndexFlowOnTime (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get('iTransport/trafficDepartment/southStation/indexFlowOnTime').then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 取昨夜游客年龄
   * @param param
   */
  getIndexYesterdayTouristAgeAnalysis (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/indexYesterdayTouristAgeAnalysis`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 取昨夜游客性別
   * @param param
   */
  getIndexYesterdayTouristSexAnalysis (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/indexYesterdayTouristSexAnalysis`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 取昨日客流来源分析(省内)
   * @param param
   */
  getYesterdayTouristTraceAnalysisIn (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/yesterdayTouristTraceAnalysisIn`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 取昨日客流来源分析(省外)
   * @param param
   */
  getYesterdayTouristTraceAnalysisOut (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/yesterdayTouristTraceAnalysisOut`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 换成分析：从spec1=高铁出站口/长途大巴出站口 去别的站点 换成信息
   * @param param
   */
  getTransferAnalysisA (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/transferAnalysisA?date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 换成分析：从spec2=高铁出站口/长途大巴出站口 去别的站点 换成信息
   * @param param
   */
  getTransferAnalysisB (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/transferAnalysisB?date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 换成分析：表格数据
   * @param param
   */
  getTransferTable (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/transferForChartDurationData?date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 客流量分析
   */
  historyFlowContrast (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/historyFlowContrast?sdate=${param.startDate}&date=${param.endDate}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 过去一周每日候车时长
   * @param param
   */
  getLastWeekWaitDuration (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/lastWeekWaitDuration?spec=${param.spec}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 过去一周每日候车时长
   * @param param
   */
  getYesterdayFlowOnTime (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/yesterdayFlowOnTime?spec=${param.spec}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 节假日客流对比
   * @param param
   */
  getHolidayFlowContrast (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/holidayFlowContrast?spec=${param.spec}&date=${param.date}`).then(res => {
        resolve(res)
      })
    })
  },
  /**
   * 历史数据的换乘分析接口
   * @param param
   */
  getTransferForChartDurationData (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`iTransport/trafficDepartment/southStation/transferForChartDurationData?sdate=${param.sDate}&date=${param.eDate}`).then(res => {
        resolve(res)
      })
    })
  }
}
