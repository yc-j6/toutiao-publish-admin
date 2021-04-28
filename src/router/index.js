import Vue from 'vue'
import VueRouter from 'vue-router'
// @ src的别名  好处：不受当前文件路径影响
// 注意：@后面斜杠不要忘加
// 建议： 如果在当前目录，就正常写   如果进行父级查询就用 @

import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
import Image from '@/views/image/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name:'layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫：所有页面的导航都会经过这里
// to 要去的路由信息
// from   来自那里的路由信息
// next   放行方法
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
