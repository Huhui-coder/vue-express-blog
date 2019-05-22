<!--  -->
<template>
<div class="root">
        <nav-header></nav-header>

  <div class="main-wrap">
    <div class="main"> 
       <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>文章发表页  </el-breadcrumb-item>
</el-breadcrumb>
      <div class="article">
        <div class="title">标题
           <el-input v-model="title"></el-input>
        </div>
        <div class="type">分类
           <el-input v-model="type"></el-input>
        </div>
        <div class="content">

     <mavon-editor v-model="value"/>
     </div>
     </div>
     <el-button type="primary"  icon="el-icon-edit" class="fr" @click="add()">发布</el-button>
     </div>
  </div>
  <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'

export default {
  data () {
    return {
      value:'',
      userId:'',
      title:'',
      type:''
    };
  },

  components: {
    NavHeader,
    NavFooter
  },

  computed: {},

  mounted (){
    this.checkLogin()
  },

  methods: {
     checkLogin(){
                this.$http.get("http://localhost:3001/users/checkLogin").then((response)=>{
                        if(response.data.status=="0"){
                      this.userId = response.data.result[1]
                    }else{
                     
                    }
                });
            },
    add(){  
      if(this.type&&this.title&&this.value == ''){
        this.$message({
                                    message: '标题，分类，内容信息不能为空哦',
                                    type: 'warning'
                                    });
      }else{
        if(!!this.userId){
                var param ={
                content:this.value,
                title:this.title,
                type:this.type
                 }
         this.$http.get("http://localhost:3001/users/add",{params:param}).then((response)=>{
                        if(response.data.status=="0"){
                               this.$message({
                                    message: '发表成功',
                                    type: 'success'
                                    });
                        this.$router.push("/");
                    }else{
                     
                    }
                });

            }else{
                 this.$message({
                                    message: '请你先登陆',
                                    type: 'warning'
                                    });

            }

      }
            
              
  }
    }
}

</script>
<style scoped>
.root{
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 1000px;
}
.fr{
  float: right;
}
.main-wrap{
  width: 100%
}
.main{
  width: 67rem;
  margin: 0 auto;
}
.article{
  margin-top: 3rem;
}
.article div{
  margin: .3125rem;
}
</style>