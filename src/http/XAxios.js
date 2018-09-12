/**
 * axios 拦截器
 */
import axios from 'axios'
import { showFullScreenLoading, tryHideFullScreenLoading } from '../assets/utils/loadingConfig'
// import { Notification } from 'element-ui'
// 请求时间设置为：30秒
axios.defaults.timeout = 30000
/**/
// http请求拦截器
axios.interceptors.request.use(config => {
  // loading 加载
  showFullScreenLoading()
  return config
}, error => {
  tryHideFullScreenLoading()
  // Notification.error({
  //   title: '错误',
  //   message: '请求异常，请稍后再试！'
  // })
  console.log(' error:', error)
  // return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
  tryHideFullScreenLoading()
  return data
}, error => {
  tryHideFullScreenLoading()
  // Notification.error({
  //   title: '错误',
  //   message: '请求异常，请稍后再试！'
  // })
  console.log(' error:', error)
  // return Promise.reject(error)
})
export default axios
