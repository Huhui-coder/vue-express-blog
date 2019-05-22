<!--  -->
<template>
  <div class="main-wrap">
      <div class="main" v-for="item in data" :key="item" @click="toArticleDetail(item.articleId)">
          <div class="title">{{item.title}}</div>
          <div class="tip">
              <i class="el-icon-time">{{item.time.substring(0,10)}}</i>
              <i class="el-icon-view">{{item.viewsnum}}次</i>
              <i class="el-icon-star-on">{{item.collectnum}}</i>
              <i class="el-icon-check">{{item.likenum}}</i>
          </div>
          <div class="content">
                {{item.content}}
          </div>

      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
   props:{
        data :{
          type: Array
        }
      },


  components: {},

  computed: {},

  mounted (){},

  methods: {
      toArticleDetail(id){
          this.$router.push({path:'/articleDetail/'+id});
          
      }
  }
}

</script>
<style scoped>
.main-wrap{
    width: 100%;
    font-family: FangSong;
}
.main{
    margin-bottom: 1rem;
    width: 67rem;
    margin: 0 auto;
    cursor: pointer;
}

.main div{
    margin-top:10px; 
}
.title {
    width: 60rem;
    margin: 0 auto;
    text-align: center;
    font-size: 1.6rem;
    font-weight: bold;
}
.tip{
       width: 60rem;
    margin: 0 auto;
    text-align: center;
}
.content{
    font-family: NSimSun;
    width: 60rem;
    margin: 0 auto;
    padding-left: 6px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;


}
.content::before{
    position: absolute;
    content: "";
    height: 100%;
    width:6px;
    background-color: whitesmoke;
    left: -6px;
    padding-left: 10px;
}
</style>