<!--  -->
<template>
  <div class="root">
      <nav-header></nav-header>
      <div class="el-wrap">
          <div class="el">
                 <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>评论页面  </el-breadcrumb-item>
</el-breadcrumb>
</div>
</div>
<div class="null" v-show="!this.Data">
    <img src="../assets/null.png" alt="">
    <p> 暂无相关信息</p>
  </div>
      <blog-list :data='Data'></blog-list>
   
  



<nav-footer></nav-footer>
  </div>
</template>

<script>
import BlogList from '../components/blogList'
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'


export default {
  data () {
    return {
      userId:localStorage.getItem('userId'),
                ArticleId:[],
                ArticleData:[],
                Data:[]

    };
  },

  components: {
    NavHeader,
    BlogList,
    NavFooter


  },

  computed: {},

  mounted (){

    this.featch()
  },

  methods: {
    //展示用户所有已收藏
    featch(){
       this.$http.get("http://localhost:3001/users/showallcomment").then((response)=>{
                if(response.data.status == '0'){
                    this.ArticleId = response.data.result
                    this.ArticleId.forEach(item=>{
                      this.$http.get("http://localhost:3001/articles/detail",{params:{articleId:item.articleId}}).then((response)=>{
                        if(response.data.status == '0'){
                          this.ArticleData.push(response.data.result);
                          this.Data = this.ArticleData.flat()                        }
                      })
                    })

                }
            });
    }

  }
}

</script>
<style scoped>
.null{
  text-align: center;
  min-height: 1000px;
}
.el-wrap{
    width: 100%;
}
.el{
    width: 67rem;
    margin: 0 auto;
}
.root{
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 1000px;
}
</style>