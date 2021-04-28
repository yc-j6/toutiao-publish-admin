<template>
   <div class="article-container">
       <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>内容管理</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <el-form ref="form" :model="form" label-width="40px" size="mini">
    <el-form-item label="状态">
    <el-radio-group v-model="status">
      <el-radio :label="null" >全部</el-radio>
      <el-radio :label="0">草稿</el-radio>
      <el-radio :label="1">待审核</el-radio>
      <el-radio :label="2">审核通过</el-radio>
      <el-radio :label="3">审核失败</el-radio>
      <el-radio :label="4">已删除</el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="频道">
    <el-select v-model="channelId" placeholder="请选择频道">
      <el-option
      label="全部"
      :value="null"></el-option>
      <el-option
      :label="channel.name"
      v-for='(channel,index) in channels' :key="index"
      :value="channel.id"></el-option>
    </el-select>
  </el-form-item>
 <el-form-item label="日期">
      <el-date-picker
      v-model="rangeDate"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00', '08:00:00']"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="loadArticles(1)" :disabled="loading">查询</el-button>
  </el-form-item>
</el-form>
</el-card>

<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>根据筛选条件共查询到 {{ totalCount }} 条结果</span>
  </div>
  <el-table
      :data="articles"
      style="width: 100%"
      stripe
      class="list-table"
      size="mini"
      v-loading='loading'
      >
      <el-table-column
        label="封面">
        <template slot-scope="scope">
          <el-image
          style="width: 100px; height: 100px"
          :src='scope.row.cover.images[0]'
          fit='cover'
          lazy>
          <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
          </el-image>
       <!-- <img
        v-if="scope.row.cover.images[0]"
        :src="scope.row.cover.images[0]" alt='' class="article-cover">
        <img
        v-else
        src="./error.3f7b1f94.gif" alt='' class="article-cover">-->
      </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        label="状态">
         <template slot-scope="scope">
        <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
         <el-button type="primary" icon="el-icon-edit" circle @click="$router.push('/publish?id=' + scope.row.id)"></el-button>
         <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteArticle(scope.row.id)"></el-button>
      </template>
      </el-table-column>
    </el-table>

    <el-pagination
    layout="prev, pager, next"
    :total="totalCount"
    @current-change='onCurrentChange'
    :page-size="pageSize"
    :disabled="loading"
    :current-page.sync="page"
    background />
</el-card>
   </div>
</template>

<script>
import {
  getArticles,
  getArticleChannels,
  deleteArticle
} from '@/api/article'
export default {
  name: 'Article',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalCount: 0, // 总数据条数
      pageSize: 10, // 每页大小
      status: null, // 文章状态
      channels: [], // 文章频道列表
      channelId: null, // 文章频道
      rangeDate: [], // 查询时间
      loading: true, // 表单数据加载中
      page: 1
    }
  },
  created () {
    this.loadChannels()
    this.loadArticles(1)
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount

        this.loading = false
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          this.loadArticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style scoped lang="less">
 .box-card{
     margin-bottom: 30px;
 }
 .list-table{
     margin-bottom: 20px;
 }
 .article-cover {
   width: 100px;
   height: 60px;
   background-size: cover;
 }
</style>
