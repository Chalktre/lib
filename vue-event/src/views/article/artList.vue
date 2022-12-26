<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select
              v-model="q.cate_id"
              placeholder="请选择分类"
              size="small"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="showPubDialogFn"
          >发表文章</el-button
        >
      </div>

      <!-- 文章表格区域 -->

      <!-- 分页区域 -->
    </el-card>
    <!-- 发表文章的 Dialog 对话框 -->
    <el-dialog title="发表文章" :visible.sync="pubDialogVisible" fullscreen
      ><!-- 发布文章的对话框 -->
      <el-form
        :model="pubForm"
        :rules="pubFormRules"
        ref="pubFormRef"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="pubForm.cate_id"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <!-- 循环渲染分类的可选项 -->
            <el-option
              :label="item.cate_name"
              :value="item.id"
              v-for="item in cateList"
              :key="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <!-- 使用 v-model 进行双向的数据绑定 -->
          <quill-editor v-model="pubForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面">
          <!-- 用来显示封面的图片 -->
          <img
            src="../../assets/images/cover.jpg"
            alt=""
            class="cover-img"
            ref="imgRef"
          />
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input
            type="file"
            style="display: none"
            ref="iptFile"
            accept="image/*"
            @change="onCoverChangeFn"
          />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="chooseImgFn">选择封面</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pubArticleFn('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="pubArticleFn('草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getArtCateListApi, uploadArticleAPI } from '@/api'
// 导入默认的封面图片
import defaultImg from '@/assets/images/cover.jpg'
export default {
  name: 'ArtList',
  data () {
    return {
      pubDialogVisible: false, // 控制发表文章对话框的显示与隐藏
      cateList: [], // 文章分类
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      pubForm: {
        title: '',
        cate_id: '',
        content: '', // 文章的内容
        cover_img: null, // 用户选择的封面图片（null 表示没有选择任何封面）
        state: '' // 文章的发布状态，可选值有两个：草稿、已发布
      },
      pubFormRules: {
        // 表单的验证规则对象
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 1,
            max: 30,
            message: '文章标题的长度为1-30个字符',
            trigger: 'blur'
          }
        ],
        cate_id: [
          { required: true, message: '请选择文章标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 发表文章按钮->点击事件->让添加文章对话框出现
    showPubDialogFn () {
      this.pubDialogVisible = true
    },
    // 初始化文章分类的列表数据
    async initCateList () {
      const res = await getArtCateListApi('/my/cate/list')
      if (res.data.code === 0) {
        this.cateList = res.data.data
      }
    },
    chooseImgFn () {
      this.$refs.iptFile.click()
    },
    // 封面选择改变的事件
    onCoverChangeFn (e) {
      // 获取用户选择的文件列表
      const files = e.target.files
      if (files.length === 0) {
        // 用户没有选择封面
        this.pubForm.cover_img = null
        this.$refs.imgRef.setAttribute('src', defaultImg)
      } else {
        // 用户选择了封面
        this.pubForm.cover_img = files[0]
        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
      }
    },
    // 发布文章或草稿-按钮点击事件
    pubArticleFn (state) {
      // 1. 设置发布状态
      this.pubForm.state = state
      // 2. 表单预校验
      this.$refs.pubFormRef.validate((valid) => {
        if (!valid) return this.$message.error('请完善文章信息！')
        // 3. 判断是否提供了文章封面
        if (!this.pubForm.cover_img) {
          return this.$message.error('请选择文章封面！')
        }
        // 4. TODO：发布文章
        // 创建 FormData 对象
        const fd = new FormData()

        // 向 FormData 中追加数据
        Object.keys(this.pubForm).forEach((key) => {
          fd.append(key, this.pubForm[key])
        })

        // 发起请求
        uploadArticleAPI(fd).then(
          res => {
            if (res.data.code !== 0) return this.$message.error('发布文章失败！')
            this.$message.success('发布文章成功！')

            // 关闭对话框
            this.pubDialogVisible = false
            // TODO：刷新文章列表数据
          }
        )
      })
    }
  },
  created () {
    this.initCateList()
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}

::v-deep .ql-editor {
  min-height: 300px;
}

// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
</style>
