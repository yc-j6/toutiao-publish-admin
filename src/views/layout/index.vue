<template>
  <el-container class="layout-container">
    <el-aside width="auto" class='aside'>
      <AppAside class="aside-menu" :is-collapse='isCollapse'></AppAside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i :class="{
            'el-icon-s-fold': !isCollapse,
            'el-icon-s-unfold': isCollapse
          }" @click="isCollapse = !isCollapse"></i>
        <span>北京打造前程互联网教育科技有限公司</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
           <img :src="user.photo" alt="" srcset="" class="avatar">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item @click.native="setting">个人设置</el-dropdown-item>
    <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
import globalBus from '@/utlis/global-bus'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  data () {
    return {
      user: {},
      isCollapse: false
    }
  },
  created () {
    this.loadUserProfile()
    globalBus.$on('update-user', (data) => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    setting () {
      this.$router.push('/settings')
    },
    onLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除状态
        window.localStorage.removeItem('user')
        // 跳转
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>
<style scoped lang="less">
 .layout-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
 }
   .aside{
     background-color: #d3dce6;
     .aside-menu{
       height: 100%;
     }
     }
 .header{
    background-color: #b3c0d1;
    display: flex;
    justify-content: space-between;
    align-items: center;
   border-bottom: 1px solid #ccc;
    }
.main{
    background-color: #e9eef3;
  }
.avatar-wrap{
  display: flex;
  align-items: center;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
