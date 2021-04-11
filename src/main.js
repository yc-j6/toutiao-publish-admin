import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 加载 element 组件库
import ElementUI from 'element-ui'
// 架子啊 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
// 全局注册 element 组件库
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
