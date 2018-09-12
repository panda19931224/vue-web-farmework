/* eslint-disable no-undef */
import NotFind from '../pages/errors/404.vue'
// 生产/测试环境，使用路由懒加载
const _import = process.env.NODE_ENV === 'development'
  ? file => require(`@/pages/${file}.vue`).default
  : file => () => System.import(`@/pages/${file}.vue`).then(m => m.default)
export default [
  { path: '/', component: _import('jYBridge/overView/Index') },
  {
    path: '/main',
    component: resolve => require(['../layout/Layout'], resolve),
    children: [
      {
        path: '/jyBridge/overView',
        name: '江阴大桥/总览',
        component: _import('jYBridge/overView/Index')
      },
      {
        path: '/jyBridge/associationAnalysis',
        name: '江阴大桥/关联分析',
        component: _import('jYBridge/associationAnalysis/Index')
      },
      {
        path: '/jyBridge/userFlow',
        name: '江阴大桥/客流来源',
        component: _import('jYBridge/userFlow/Index')
      },
      {
        path: '/jyBridge/userProperty',
        name: '江阴大桥/客流属性',
        component: _import('jYBridge/userProperty/Index')
      },
      {
        path: '/jyBridge/throughDuration',
        name: '江阴大桥/通行时长',
        component: _import('jYBridge/throughDuration/Index')
      },
      {
        path: '/jyBridge/trialAnalysis',
        name: '江阴大桥/轨迹分析',
        component: _import('jYBridge/trialAnalysis/Index')
      },
      {
        path: '/jYBridge/userFlowContrast',
        name: '长江二桥/客流对比',
        component: _import('jYBridge/userFlowContrast/Index')
      },
      {
        path: '/jyBridge/historyData',
        name: '江阴大桥/历史数据',
        component: _import('jYBridge/historyData/Index')
      },
      {
        path: '/secondeBridge/overView',
        name: '长江二桥/总览',
        component: _import('secondeBridge/overView/Index')
      },
      {
        path: '/secondeBridge/associationAnalysis',
        name: '长江二桥/关联分析',
        component: _import('secondeBridge/associationAnalysis/Index')
      },
      {
        path: '/secondeBridge/userFlowContrast',
        name: '长江二桥/客流对比',
        component: _import('secondeBridge/userFlowContrast/Index')
      },
      {
        path: '/secondeBridge/trialAnalysis',
        name: '长江二桥/轨迹分析',
        component: _import('secondeBridge/trialAnalysis/Index')
      },
      {
        path: '/secondeBridge/userFlow',
        name: '长江二桥/客流来源',
        component: _import('secondeBridge/userFlow/Index')
      },
      {
        path: '/secondeBridge/userProperty',
        name: '长江二桥/客流属性',
        component: _import('secondeBridge/userProperty/Index')
      },
      {
        path: '/secondeBridge/historyData',
        name: '长江二桥/历史数据',
        component: _import('secondeBridge/historyData/Index')
      },
      {
        path: '/secondeBridge/throughDuration',
        name: '长江二桥/通行时长',
        component: _import('secondeBridge/throughDuration/Index')
      },
      {
        path: '/luKouAirport/overView',
        name: '禄口机场/总览',
        component: _import('luKouAirport/overView/Index')
      },
      {
        path: '/luKouAirport/associationAnalysis',
        name: '禄口机场/关联分析',
        component: _import('luKouAirport/associationAnalysis/Index')
      },
      {
        path: '/luKouAirport/userFlowContrast',
        name: '禄口机场/客流对比',
        component: _import('luKouAirport/userFlowContrast/Index')
      },
      {
        path: '/luKouAirport/userFlow',
        name: '禄口机场/客流来源',
        component: _import('luKouAirport/userFlow/Index')
      },
      {
        path: '/luKouAirport/userProperty',
        name: '禄口机场/客流属性',
        component: _import('luKouAirport/userProperty/Index')
      },
      {
        path: '/luKouAirport/historyData',
        name: '禄口机场/历史数据',
        component: _import('luKouAirport/historyData/Index')
      },
      {
        path: '/luKouAirport/throughDuration',
        name: '禄口机场/停留时长',
        component: _import('luKouAirport/throughDuration/Index')
      },
      {
        path: '/nJSorthRailwayStation/overView',
        name: '南京南站/总览',
        component: _import('nJSouthRailwayStation/overView/Index')
      },
      {
        path: '/nJSorthRailwayStation/userFlow',
        name: '南京南站/客流来源',
        component: _import('nJSouthRailwayStation/userFlow/Index')
      },
      {
        path: '/nJSorthRailwayStation/userProperty',
        name: '南京南站/客流属性',
        component: _import('nJSouthRailwayStation/userProperty/Index')
      },
      {
        path: '/nJSorthRailwayStation/historyData',
        name: '南京南站/历史数据',
        component: _import('nJSouthRailwayStation/historyData/Index')
      },
      {
        path: '/nJSorthRailwayStation/transferAnalysis',
        name: '南京南站/换乘分析',
        component: _import('nJSouthRailwayStation/transferAnalysis/Index')
      },
      {
        path: '/nJSorthRailwayStation/userFlowAnalysis',
        name: '南京南站/场站客流分析',
        component: _import('nJSouthRailwayStation/userFlowAnalysis/Index')
      },
      {
        path: '/nJSorthRailwayStation/associationAnalysis',
        name: '南京南站/关联分析',
        component: _import('nJSouthRailwayStation/associationAnalysis/Index')
      },
      {
        path: '/404',
        name: '404',
        component: NotFind
      }
    ]
  }
]
