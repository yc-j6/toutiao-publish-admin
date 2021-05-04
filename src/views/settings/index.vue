<template>
    <div class="settings-container">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item to="/" >首页</el-breadcrumb-item>
  <el-breadcrumb-item>个人设置</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <el-row>
    <el-col :span="10">
      <el-form ref="form" :rules ='formRules' :model="user" label-width="80px">
  <el-form-item label="编号">{{ user.id }}</el-form-item>
   <el-form-item label="手机">{{ user.mobile }}</el-form-item>
   <el-form-item label="媒体名称" prop="name">
    <el-input v-model="user.name"></el-input>
  </el-form-item>
  <el-form-item label="媒体介绍">
    <el-input type="textarea" v-model="user.intro"></el-input>
  </el-form-item>
   <el-form-item label="邮箱">
    <el-input v-model="user.email"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary"
    :loading="updateProfileLoading"
    @click="onUpdateUser">保存</el-button>
  </el-form-item>
</el-form>
    </el-col>

    <el-col :offset="2" :span="5">
      <label for="file">
       <el-avatar
       shape="square"
       :size="150"
       :src="user.photo"></el-avatar>
       <p>点击修改头像</p>
       </label>
       <input type="file" ref="file" hidden  id="file" @change="onFileChange">
    </el-col>
  </el-row>
</el-card>

<el-dialog
  title="修改头像"
  :visible.sync="dialogVisible"
  append-to-body width="25%"
  @opened="onDialogOpened"
  @closed="onDialogClosed"
  >
<div class="preview-image-wrap">
    <img
    class="preview-image"
    :src="previewImage"
    ref="preview-image"
    >
</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onUpdatePhoto" :loading="updatePhotoLoading">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import { getUserProfile, updateUserPhoto, updateUserProfile } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utlis/global-bus'

export default {
  name: 'SettingsIndex',
  data () {
    return {
      user: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      },
      dialogVisible: false,
      previewImage: '',
      cropper: null,
      updatePhotoLoading: false,
      updateProfileLoading: false,
      formRules: {
        name: [
          { min: 1, max: 7, message: '长度在1 到 7 个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    onUpdateUser () {
      this.updateProfileLoading = true
      updateUserProfile(this.user).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.updateProfileLoading = false

        globalBus.$emit('update-user', this.user)
      })
    },
    loadUser () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onFileChange () {
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData
      this.dialogVisible = true
      this.$refs.file.value = ''
    },
    onDialogOpened () {
      const image = this.$refs['preview-image']
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        background: false,
        cropBoxResizable: false
      })
    },
    onDialogClosed () {
      this.cropper.destroy()
    },
    onUpdatePhoto () {
      this.updatePhotoLoading = true
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        updateUserPhoto(fd).then(res => {
          this.dialogVisible = false
          this.user.photo = window.URL.createObjectURL(file)
          // 服务器返回有点慢
          // this.user.photo = res.data.data.photo

          this.updatePhotoLoading = false
          this.$message({
            type: 'success',
            message: '更新头像成功'
          })
          globalBus.$emit('update-user', this.user)
        })
      })
    }
  }
}
</script>

<style scoped lang='less'>
.preview-image-wrap{
  .preview-image{
    display: block;
    max-width: 100%;
    height: 200px;
  }
}
</style>
