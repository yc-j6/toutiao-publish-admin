/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',

  // 定制后端返回的原始数据处理
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const user = JSON.parse(window.localStorage.getItem('user'))

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 导出请求方法
export default request
