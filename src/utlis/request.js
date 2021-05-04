/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'
import { Message } from 'element-ui'

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

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const { status } = error.response
  // 任何超出 2xx 的响应码都会进入这里
  if (status === 401) {
    // 跳转到登录页面
    // 清除本地存储中的用户登录状态
    window.localStorage.removeItem('user')
    router.push('/login')
    Message.error('登录状态无效，请重新登录')
  } else if (status === 403) {
    // token 未携带或已过期
    Message({
      type: 'warning',
      message: '没有操作权限'
    })
  } else if (status === 400) {
    // 客户端参数错误
    Message.error('参数错误，请检查请求参数')
  } else if (status >= 500) {
    Message.error('服务端内部异常，请稍后重试')
  }
  return Promise.reject(error)
})
// 导出请求方法
export default request
