<!--  -->
<template>
  <div class="main-wrap">
      <div class="main">
         <div class="nickName">{{nickName}}</div>
       <div class="nav">
       <div @click="dialogloginVisible = true" v-show="!nickName">登陆</div>
              <div @click="dialogregisterVisible = true" v-show="!nickName">注册</div>
              <div @click="dialogVisible  = true" v-show="nickName">登出</div>
                  <div v-show="nickName" @click="toAddArticle()">发帖子</div>
              <div v-show="nickName" @click="toCollect()">已收藏</div>
              <div v-show="nickName" @click="toZan()">已点赞</div>   
              <div v-show="nickName" @click="toComment">已评论</div>
              <div @click="toabout">关于站长</div>
              
       </div>
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
</template>

<script>
export default {
  data () {
    return {
       dialogloginVisible:false,
                dialogregisterVisible:false,
                userName:'',
                userPwd:'',
                ReuserName:'',
                ReuserPwd:'',
                formLabelWidth:'120px',
                errorTip:false,
                nickName:'',
                dialogVisible:false,
    };
  },

  components: {},

  computed: {},

  mounted (){
          this.checkLogin()

  },

  methods: {
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
            //跳转到文章发布页面
            toAddArticle(){
                this.$router.push("/addarticle");

            },
            toCollect(){
                this.$router.push("/user_collect");

            },
            toZan(){
                this.$router.push("/user_zan");

            },
             toabout(){
                this.$router.push("/about")
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
}
.main{
    width: 67rem;
    margin: 0 auto;
    height: 8rem;
    position:relative;
}
.nav{
  position: absolute;
  right: 4rem;
  top: 3rem;
}
.nickName{
   position: absolute;
  left: 1rem;
  top: 3rem;
  font-size: 2.6rem;
}
.nav div{
  font-size: 1.1rem;
  float: left;
  padding: .3125rem;
}
.nav div:hover{
    opacity: 1;
    color: white;
    background-color: gray;
}
</style>