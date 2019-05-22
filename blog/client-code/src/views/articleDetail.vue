<!--  -->
<template>
  <div class="root">
      <nav-header></nav-header>
      <div class="main-wrap">
            <Affix :offset-top="50">
                <div class="affix" @click="add()"><i class="el-icon-edit"></i>发表新文章</div>
                <div class="affix" @click="del_zan()" v-if="zanFlag"><i class="el-icon-check"></i> 取消点赞</div>                
                <div class="affix" @click="add_zan()" v-if="!zanFlag"><i class="el-icon-check"></i> 点赞</div>
                <div class="affix" @click="add_collect()" v-if="!collectFlag"><i class="el-icon-document"></i>  收藏</div>
                <div class="affix" @click="del_collect()" v-if="collectFlag"><i class="el-icon-document"></i>  取消收藏</div>

    </Affix>
          <div class="main">
              
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>文章详情页   </el-breadcrumb-item>
</el-breadcrumb>
    <div class="article">
         <div class="title">{{data.title}}</div>
         <div class="type"><span>{{data.type}}</span></div>
          <div class="tip">
              <i class="el-icon-time">{{data.time.substring(0,10)}}</i>
              <i class="el-icon-view">{{data.viewsnum}}次</i>
              <i class="el-icon-star-on">{{data.collectnum}}</i>
              <i class="el-icon-check">{{data.likenum}}</i>
          </div>
          <div class="content">
                {{data.content}}
          </div>
    </div>
    <div class="comment-wrap" >
    <div class="comment" v-for="(item,index) in commentData" :key="item">
        <div class="avtor"></div>
        <div class="floor">#{{index+1}}</div>
        <div class="comment_userName">{{item.userName}}</div>
        <div class="comment_text" v-if="item.comment.length">{{item.comment[item.comment.length-1].content}}</div>
        <div class="comment_time" v-if="item.comment.length">{{item.comment[item.comment.length-1].time}}</div>
    </div>
    </div>
    <div class="yousay">
        <el-input
  type="textarea"
  :rows="4"
  placeholder="此刻你想说什么？"
  v-model="comment">
</el-input>
  <el-button @click="send()">发表</el-button>
    </div>
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
        id:this.$route.params.articleId,
        data:[],
        commentData:[],
        userId:'',
        comment:'',
        zanFlag:false,
        collectFlag:false
    };
  },

  components: {
      NavHeader,
      NavFooter
  },

  computed: {},

  mounted (){
      this.fetch()
      this.fetchcomment()
      this.checkLogin()
  },

  methods: {
      showallcollect(){
          
          if(!!this.userId){
          var allcollectArticleId = [];
           this.$http.get("http://localhost:3001/users/showallcollect").then((response)=>{
                if(response.data.status == '0'){
                    allcollectArticleId = response.data.result
                }
                console.log(allcollectArticleId)
                allcollectArticleId.forEach((item)=>{
                    if(item.articleId == this.id){
                        this.collectFlag = true
                    }
                })
      })
      }else{
      }

      },
      showallzan(){
          if(!!this.userId){
          var allzanArticleId = [];
           this.$http.get("http://localhost:3001/users/showallzan").then((response)=>{
                if(response.data.status == '0'){
                    allzanArticleId = response.data.result
                }
                //console.log(allzanArticleId)
                allzanArticleId.forEach((item)=>{
                    if(item.articleId == this.id){
                        this.zanFlag = true
                    }
                })
      })
      }else{
      }
      },
      fetch(){
          var param = {
              articleId:this.id
          }
           this.$http.get("http://localhost:3001/users/article_detail",{params:param}).then((response)=>{
                if(response.data.status == '0'){
                    this.data = response.data.result
                }

               
            });
      },
      fetchcomment(){
           var param = {
              articleId:this.id
          }
           this.$http.get("http://localhost:3001/articles/showcomment",{params:param}).then((response)=>{
                if(response.data.status == '0'){
                    this.commentData = response.data.result
                }
            });

      },
      checkLogin(){
                this.$http.get("http://localhost:3001/users/checkLogin").then((response)=>{
                        if(response.data.status=="0"){
                      this.userId = response.data.result[1]
                     this.showallzan()
                     this.showallcollect()

                    }else{
                     
                    }
                });
            },
              send(){  
            if(!!this.userId){
                var param ={
                articleId:this.id,
                content:this.comment
                 }
         this.$http.get("http://localhost:3001/users/addcomment",{params:param}).then((response)=>{
                        if(response.data.status=="0"){
                               this.$message({
                                    message: '发表成功',
                                    type: 'success'
                                    });
                        this.fetchcomment()
                        this.comment = ''
                    }else{
                     
                    }
                });

            }else{
                 this.$message({
                                    message: '请你先登陆',
                                    type: 'warning'
                                    });

            }
              

        },
        //发表文章跳到文章发表页面
        add(){
                this.$router.push("/addarticle");
        },
        del_zan(){
             var param ={
                articleId:this.id
                 }
         this.$http.get("http://localhost:3001/users/del_zan",{params:param}).then((response)=>{
                        if(response.data.status=="0"){
                               this.$message({
                                    message: '取消点赞成功',
                                    type: 'success'
                                    });
                                    
                                    this.fetch()
                                    this.zanFlag = false
                    }
        })
        },
        add_zan(){
            if(!!this.userId){
                var param ={
                articleId:this.id
                 }
         this.$http.get("http://localhost:3001/users/add_zan",{params:param}).then((response)=>{
                        if(response.data.status=="0"){
                               this.$message({
                                    message:'点赞成功',
                                    type: 'success'
                                    });
                                    this.fetch()
                                    this.zanFlag = true
                    }else{
                     this.$message({
                                    message: '您已经点赞过本文章了',
                                    type: 'warning'
                                    });
                    }
                });

            }else{
                 this.$message({
                                    message: '请你先登陆',
                                    type: 'warning'
                                    });

            }

        },
        del_collect(){
             var param ={
                articleId:this.id
                 }
         this.$http.get("http://localhost:3001/users/del_collect",{params:param}).then((response)=>{
                        if(response.data.status=="0"){
                               this.$message({
                                    message: '取消收藏成功',
                                    type: 'success'
                                    });
                                    
                                    this.fetch()
                                    this.collectFlag = false
                    }
        })
        },
        add_collect(){
            
            if(!!this.userId){
                var param ={
                articleId:this.id
                 }
         this.$http.get("http://localhost:3001/users/add_collect",{params:param}).then((response)=>{
                        if(response.data.status=="0"){
                               this.$message({
                                    message: response.data.msg,
                                    type: 'success'
                                    });
                                    this.fetch()
                                    this.collectFlag = true

                    }else{
                        this.$message({
                                    message: '您已经收藏过本文章了',
                                    type: 'warning'
                                    });
                     
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

</script>
<style scoped>
.root{
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 1000px;
}
.main-wrap{
    width: 100%;
}
.main{
    width: 67rem;
    margin: 0  auto;
}
.breadcrumb{
    padding: 10px;
}
.article{
    min-height: 30.25rem;
}
.article div{
    margin-top: 10px;
}
.title {
    width: 60rem;
    margin: 0 auto;
    text-align: center;
    font-size: 1.6rem;
    font-weight: bold;
}
.type{
     width: 60rem;
    margin: 0 auto;
    text-align: center;
    font-size: 1rem;
}
.type span{
    border: 1px solid whitesmoke;
    padding: 5px;
    transition: all .3s ease-in;
}
.type span:hover{
    background-color: rgb(221, 180, 180) ;
    color: white;
}
.tip{
       width: 60rem;
    margin: 0 auto;
    text-align: center;
}
.content{
    text-indent: 2em;
    font-family: NSimSun;
    width: 60rem;
    margin: 0 auto;
    padding-left: 6px;
    position: relative;
}
.comment{
    height: 90px;
    position: relative;
    border-bottom: 1px solid gray;
}
.avtor{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: burlywood;
    border: 1px solid burlywood;
    position: absolute;
    left: 2rem;
    top: 2rem;
}
.floor{
     position: absolute;
    right: 1rem;
    top: 2rem;

}
.comment_userName{
    position: absolute;
    left: 6rem;
    top: 2rem;

}
.comment_text{
    padding: 5px;
       width: 874px;
    position: absolute;
    left: 6rem;
    top: 3rem;

}
.comment_time{
    position: absolute;
    right: 1rem;
    bottom: 0rem;

}
.yousay{
    margin-top: 10px; 
    width: 100%;
    height: 300px;
}
.affix{
    font-size: 1.1rem;
    padding: 10px;
    color: rgb(71, 32, 32);
    cursor: pointer;
}
.affix:hover{
    color: red;
}

</style>