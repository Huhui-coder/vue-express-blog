<!--  -->
<template>
  <div class="root">

      <nav-header></nav-header>
      <div class="el-wrap">
        <div class="el">
                 <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>搜索结果页  </el-breadcrumb-item>
</el-breadcrumb>
</div>
</div>
      <blog-list :data='data'></blog-list>
   
  



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
                search:this.$route.params.search,
                data:[]

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
        var param1 = {
          keyword:this.search
        };
        this.$http.get('http://localhost:3001/articles/search',{params:param1}).then(response=>{
          this.data = response.data;

        })
    }

  }
}

</script>
<style scoped>
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