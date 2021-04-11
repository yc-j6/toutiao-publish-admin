/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})

// 导出请求方法
export default request