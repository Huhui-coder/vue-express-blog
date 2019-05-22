<!--  -->
<template>
  <div class="main-wrap">
      <div class="main clearfloat">
          <div class="search-wrap clearfloat">
              <div class="search">
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="search_text" @keyup.native.enter="tosearch">
                    </el-input>
              </div>
          </div>
         <div class="nickName"> {{nickName}}</div>
      <div class="nav-wrap">
          <div class="nav clearfloat">
              <div @click="dialogloginVisible = true" v-show="!nickName">登陆</div>
              <div @click="dialogregisterVisible = true" v-show="!nickName">注册</div>
              <div @click="dialogVisible  = true" v-show="nickName">登出</div>
              <div v-show="nickName" @click="toAddArticle()">发帖子</div>
              <div v-show="nickName" @click="toCollect()">已收藏</div>
              <div v-show="nickName" @click="toZan()">已点赞</div>   
              <div v-show="nickName" @click="toComment">已评论</div>
              <div @click="toabout()">关于站长</div>
              <div @click="toadmin()" v-show="!nickName">管理员登陆</div>
          </div>
          <el-dialog title="登陆" :visible.sync="dialogloginVisible">
                        <el-form>
                            <el-form-item label="账号" :label-width="formLabelWidth">
                            <el-input v-model="userName" autocomplete="off"></el-input>
                            </el-form-item>
                              <el-form-item label="密码" :label-width="formLabelWidth">
                            <el-input v-model="userPwd" autocomplete="off" type="password"></el-input>
                            <p v-if="this.errorTip == true">账号或者密码错误</p>
                            </el-form-item>
                          
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogloginVisible = false">取 消</el-button>
                            <el-button type="primary" @click="login">确 定</el-button>
                        </div>
                        </el-dialog>

                         <el-dialog title="管理员登陆" :visible.sync="AdmindialogloginVisible">
                        <el-form>
                            <el-form-item label="账号" :label-width="formLabelWidth">
                            <el-input v-model="adminName" autocomplete="off"></el-input>
                            </el-form-item>
                              <el-form-item label="密码" :label-width="formLabelWidth">
                            <el-input v-model="adminPwd" autocomplete="off" type="password"></el-input>
                            <p v-if="this.errorTip == true">账号或者密码错误</p>
                            </el-form-item>
                          
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogloginVisible = false">取 消</el-button>
                            <el-button type="primary" @click="toadmin">确 定</el-button>
                        </div>
                        </el-dialog>

                          <el-dialog title="注册" :visible.sync="dialogregisterVisible">
                        <el-form>
                            <el-form-item label="账号" :label-width="formLabelWidth">
                            <el-input v-model="ReuserName" autocomplete="off"></el-input>
                            </el-form-item>
                              <el-form-item label="密码" :label-width="formLabelWidth">
                            <el-input v-model="ReuserPwd" autocomplete="off"></el-input>
                            </el-form-item>
                          
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogregisterVisible = false">取 消</el-button>
                            <el-button type="primary" @click="register">确 定</el-button>
                        </div>
                        </el-dialog>

                        <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        width="30%"
                        >
                        <span>您真的要退出登陆吗？</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="logout">确 定</el-button>
                        </span>
                        </el-dialog>
      </div>
      </div>
      <blog-list :data='ArticleData'></blog-list>
      <nav-footer></nav-footer>

  </div>
</template>

<script>
import BlogList from '../components/blogList'
import NavFooter from '../components/NavFooter'
export default {
  data () {
    return {
        search_text:'',
        dialogloginVisible:false,
                dialogregisterVisible:false,
                userName:'',
                userPwd:'',
                adminName:'',
                adminPwd:'',
                ReuserName:'',
                ReuserPwd:'',
                formLabelWidth:'120px',
                errorTip:false,
                nickName:'',
                dialogVisible:false,
                ArticleData:[],
                AdmindialogloginVisible:false,

    };
  },

  components: {
      BlogList,
      NavFooter
  },

  computed: {},

  mounted (){
      this.checkLogin()
      this.fetch()
  },

  methods: {
      tosearch(){
      this.$router.push({path:'/search/'+this.search_text});
    },
      login(){
            if(!this.userName || !this.userPwd){
                this.errorTip = true;
                return;
            }
            var param ={
                userName:this.userName,
                userPwd:this.userPwd
            }
            this.$http.get("http://localhost:3001/users/login",{params:param}).then((response)=>{
                if(response.data.status == '0'){
                    this.nickName = response.data.result.userName
                    this.dialogloginVisible = false
                    console.log(this.dialogloginVisible)
                }
            });
        },
        register(){
            if(!this.ReuserName || !this.ReuserPwd){
                this.errorTip = true;
                return;
            }
            var param ={
                userName:this.ReuserName,
                userPwd:this.ReuserPwd
            }
            this.$http.get("http://localhost:3001/users/register",{params:param}).then((response)=>{
                if(response.data.status == '0'){
                    this.dialogregisterVisible = false,
                    this.ReuserName = '',
                    this.ReuserPwd = '',
                    this.userName = '',
                    this.userPwd = ''
                }
            });
        },
        checkLogin(){
                this.$http.get("http://localhost:3001/users/checkLogin").then((response)=>{
                    var path = this.$route.pathname;
                    if(response.data.status=="0"){
                      this.nickName = response.data.result[0]
                      localStorage.setItem('userId',response.data.result[1])
                    }
                });
            },
            logout(){
                 this.$http.post("http://localhost:3001/users/logout").then((response)=>{
                    if(response.data.status=="0"){
                        this.nickName = '';
                        this.dialogVisible = false
                    }else{
                      if(this.$route.path!="/"){
                        this.$router.push("/");
                      }
                    }
                });

            },
            //获取所有的文章
            fetch(){
                  this.$http.get("http://localhost:3001/articles/").then((response)=>{
                    if(response.data.status=="0"){
                        this.ArticleData = response.data.result
                    }
                });
            },
            //跳转到文章发布页面
            toAddArticle(){
                this.$router.push("/addarticle");

            },
            toCollect(){
                this.$router.push("/user_collect");

            },
            toabout(){
                this.$router.push("/about")
            },
              toadmin(){
            this.AdmindialogloginVisible = true;
                  
            if(!this.adminName || !this.adminPwd){
                this.errorTip = true;
                return;
            }
            var param ={
                adminName:this.adminName,
                adminPwd:this.adminPwd
            }
            this.$http.get("http://localhost:3001/admins/login",{params:param}).then((response)=>{
                if(response.data.status == '0'){
                this.$router.push("/admin");
                }
            });
                
            },
            toZan(){
                this.$router.push("/user_zan");

            },
            toComment(){
                this.$router.push("/user_comment");

            }


  }
}

</script>
<style scoped>
 

.main-wrap{
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 1000px;
}
.main{
    position: relative;
    height: 16rem;
    width: 67rem;
    margin: 0 auto;
}
.search-wrap{
    position: relative;
    width: 30rem;
    top: 7rem;
    left: 20rem;
    opacity: .5;
    transition: all .5s ease-in-out;
}
.nickName{
       position: relative;
       font-size: 2rem;
       color: #333;
       font-weight: bolder;
    width: 30rem;
    opacity: .6;
    top: 10rem;
    left: 28rem;
    opacity: .5;
    transition: all .5s ease-in-out;
    opacity: .6;

}
.nickName:hover{
    opacity: 1;
}
.search-wrap:hover{
    opacity: 1;
}
.nav-wrap{
    position: relative;
    right:-39rem;
}
.nav div{
    float: left;
    padding: .5rem;
    position: relative;
    color: black;
    font-size: 1.1rem;
    opacity: .8;
    font-family: serif;
    transition: all .2s ease-in;
}
.nav div:hover{
    opacity: 1;
    color: black;
}
.nav div:hover:after{
    position: absolute;
    content: "";
    width: 100%;
    height: 10%;
    background-color: rgb(233, 215, 215);
    top: 40px;
    left: 0;
 


}


</style>