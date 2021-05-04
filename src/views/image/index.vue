<template>
    <div class="image-container">
    <el-card class="box-card">
    <div slot="header" separator-class="el-icon-arrow-right">
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>素材管理</el-breadcrumb-item>
    </el-breadcrumb>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
    </div>
     <image-list />
    </el-card>
</div>
</template>

<script>
import ImageList from './components/image-list'
export default {
  name: 'ImageIndex',
  components: {
    ImageList
  }
}
</script>

<style scoped lang='less'>
</style>
