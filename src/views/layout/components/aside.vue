<template>
   <el-menu
        default-active="/"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :collapse="isCollapse">
        <img src="http://www.fciet.com/image/index/%E6%89%93%E9%80%A0%E5%89%8D%E7%A8%8B%E7%BA%BF%E7%A8%BF%E6%A0%87%E5%BF%97%E6%8B%B7%E8%B4%9D6.png" alt="" v-if="!isCollapse">
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
         <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
         <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
         <el-menu-item index="/settings">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  methods: {},
  props: ['is-collapse'],
  data () {
    return {}
  }
}
</script>

<style  scoped lang='less'>
</style>
