/**
 *  用户相关请求模块
 */
import request from '@/utlis/request'
// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    headers: {
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头
      // 属性名和值都得看接口的要求
      // 属性名：Authorization，接口要求的
      // 属性值：Bearer空格token数据
      // Authorization: `Bearer ${user.token}`
    }
  })
}

// 修改用户头像
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}

// 修改用户基本信息
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
