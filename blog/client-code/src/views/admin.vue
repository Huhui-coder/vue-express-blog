<!--  -->
<template>
  <div>
      <div class="nav-wrap">
        <div class="nav">
          <p class="nav_text">
          欢迎您，管理员  
          </p>
        </div>
      </div>
<div class="main-wrap">
  <div class="main">  
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>管理员个人中心页</el-breadcrumb-item>
  
</el-breadcrumb>
<div class="tab-wrap">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="管理用户信息" name="first">
      <el-table
    :data="tableData1"
    border
    style="width: 100%">
    <el-table-column
      prop="userId"
      label="用户Id"
      width="240">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户昵称"
      width="920">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="190">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="remove1(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-tab-pane>
    <el-tab-pane label="管理用户发布的评论" name="second">
      <el-table
    :data="tableData2"
    border
    style="width: 100%">
    <el-table-column
      prop="userId"
      label="用户Id"
      width="240">
    </el-table-column>
      <el-table-column
      prop="userName"
      label="用户昵称"
      width="240">
    </el-table-column>
    <el-table-column
      prop="comment[0].content"
      label="评论内容"
      width="680">
    </el-table-column>
    <el-table-column
      label="操作"
      fixed="right"
      width="190">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="remove2(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-tab-pane>
    <el-tab-pane label="管理文章" name="three">
      <el-table
    :data="tableData3"
    border
    style="width: 100%">
   
      <el-table-column
      prop="articleId"
      label="文章Id"
      width="240">
    </el-table-column>
     <el-table-column
      prop="type"
      label="分类"
      width="240">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="680">
    </el-table-column>
    <el-table-column
      label="操作"
      fixed="right"
      width="190">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="remove3(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-tab-pane>
    
  </el-tabs>
  </div>

  </div>
</div>
    <nav-footer></nav-footer>

  </div>
</template>

<script>
  import NavHeader from './../components/NavHeader.vue'
  import NavFooter from './../components/NavFooter.vue'
export default {
  data () {
    return {
       activeName: 'first',
        tableData1:[],
        tableData2:[],
        tableData3:[]

    };
  },

  components: {
      NavHeader,
    NavFooter
  },

  computed: {},

  mounted (){
    this.showusers()
    this.showmerchants()
    this.showusers_comment()
    this.showallhouse()
  },

  methods: {
    //展示全部用户的信息
    showusers(){
          this.$http.get("http://localhost:3001/users/").then((response)=>{
                        if(response.data.status=="0"){
                             this.tableData1 = response.data.result
                    }else{
                     
                    }
                });
    },
    remove1(row){
      var param = {
          userId:row.userId
      };
       this.$http.get("http://localhost:3001/admins/deluser",{params:param}).then((response)=>{
                        if(response.data.status=="0"){
                           this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                    });
                                    this.showusers()
                    }
                });
    },
    //展示用户的Id及其评论
       showusers_comment(){
          this.$http.get("http://localhost:3001/admins/all").then((response)=>{
                        if(response.data.status=="0"){
                             this.tableData2 = response.data.result
                    }else{
                      
                    }
                });
    },
    //删除用户的评论
        remove2(row){
      var param = {
          userId:row.userId,
          articleId:row.comment[0].articleId
      };
       this.$http.get("http://localhost:3001/admins/delusecomment",{params:param}).then((response)=>{
                        if(response.data.status=="0"){
                           this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                    });
                                    this.showusers_comment()
                    }
                });
    },
    //获取所有的文章信息
    showmerchants(){
       this.$http.get("http://localhost:3001/articles/").then((response)=>{
                             this.tableData3 = response.data.result
                });

    },
    //删除商户的Id
            remove3(row){
      var param = {
          articleId:row.articleId
      };
       this.$http.get("http://localhost:3001/admins/delarticle",{params:param}).then((response)=>{
                        if(response.data.status=="0"){
                           this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                    });
                                    this.showmerchants()
                    }
                });
    },
    //展示对应商户下发布的信息  
      showallhouse(){
          this.$http.get("http://localhost:3001/houses/").then((response)=>{
                        if(response.data.status=="0"){
                             this.tableData4 = response.data.result
                    }else{
                     
                    }
                });
    },
    
     tohouseDetail4(row){
              this.$router.push({path:'/houseDetail/'+row.houseId});
      },
      removehouseinfo(row){
           var param = {
          houseId:row.houseId,
      };
       this.$http.get("http://localhost:3001/merchants/del",{params:param}).then((response)=>{
                        if(response.data.status=="0"){
                           this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                    });
                                    this.showallhouse()
                    }
                });

      }



  }
}

</script>
<style scoped>
.main-wrap{
  width: 100%;
}
.main{
  width: 67rem;
  margin: 0 auto;
}
.nav-wrap{
  width: 100%;
  height: 5rem;

}
.nav{
  width: 67rem;
  margin: 0 auto;
  height: 5rem;
  position: relative;

}
.nav_text{
    position: absolute;
  bottom: 0;
  right: 0;

}

.text_fr{
  float: right;
}
.tab-wrap{
  min-height: 37rem;
}
</style>