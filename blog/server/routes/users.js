var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Article = require('../models/article');

var localStorage = require('localStorage');
var mongoose = require('mongoose');
require('../util/util')



//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/myBlog');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});


/* GET users listing. */
router.get('/',function(req,res,next){
  User.find({},function (err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc
      });
    }
  })
})

//用户登陆
router.get("/login", function (req,res,next) {
  var param = {
      userName:req.query.userName,
      userPwd:req.query.userPwd
  };
  User.find(param, function (err,doc) {
      if(err){
          res.json({
              status:"1",
              msg:err.message
          });
      }else{
        if(doc.length !=0){
          localStorage.setItem('userName',param.userName),
          localStorage.setItem('userId',doc[0].userId)
          // res.cookie("userName",param.userName,{maxAge: 900000, httpOnly: true}); 
          // res.cookie("userId",doc[0].userId,{maxAge: 900000, httpOnly: true}); 

          res.json({
            status:'0',
            msg:'',
            result:{
                userId:doc[0].userId,
                userName:doc[0].userName,
            }
        });
        }else{
          res.json('账号密码错误')
        }
              
      }
  });
});
//用户注册
router.get('/register',function(req,res,next){
  var r1 = Math.floor(Math.random()*10);
  var r2 = Math.floor(Math.random()*10);
  var sysDate = new Date().Format('yyyyMMddhhmmss');
  var userId = r1+r2+sysDate;
  var userName = req.param('userName'); 
  var params = {
    userId:userId,
    userName:req.param('userName'),
    userPwd:req.param('userPwd'),
};

User.find({userName:userName},function(err,doc){
  if(doc.length != 0){
      res.json({
          status:"1",
          msg:'用户已注册'
      })
  }else{
    var registerUser = new User(params)
    registerUser.save(function (){
      res.json({
        status:'0',
        msg:'',
        result:{
            userId:userId,
            registerUser:registerUser.userName,
        }
    })
  })
}
});
})
//登出接口
router.post("/logout", function (req,res,next) {
  // res.cookie("userName",'',{maxAge: 900000, httpOnly: true}); 
  // res.cookie("userId",'',{maxAge: 900000, httpOnly: true}); 
  localStorage.setItem('userName','');
  localStorage.setItem('userId','');

  res.json({
      status:"0",
      msg:'',
      result:''
  })
});

// 检查登录状态cookies
router.get("/checkLogin", function (req,res,next) { 
  if(localStorage.getItem('userId')){
      res.json({
          status:'0',
          msg:'',
          result:[localStorage.getItem('userName'),localStorage.getItem('userId')] || ''
      });
  }else{
      res.json({
          status:'1',
          msg:'未登录',
          result:''
      });
  }
});
//用户发表新文章
router.get('/add',function(req,res,next){
  //var userId = req.cookies.userId;
  var userId = localStorage.getItem('userId');
  //console.log(merchantId)
  //var userId = req.param('userId');
  var r1 = Math.floor(Math.random()*10);
  var r2 = Math.floor(Math.random()*10);
  var sysDate = new Date().Format('yyyyMMddhhmmss');
  var this_Date = new Date().Format('yyyy-MM-dd hh:mm:ss');
  var articleId = r1+r2+sysDate;
  if(!userId){
    res.json({
      status:'1',
      msg:'请先登陆..'
    })
  }else{
    var AddAricle = new Article({
      "articleId":articleId,
      "userId":userId,
      "title":req.param('title'),
      "content":req.param('content'),
      "type":req.param('type'),
      "collectnum":'0',
      "likenum":'0',
      "viewsnum":'0',
      "time": this_Date
      
  })
  AddAricle.save(function (){
      res.json({
          status:'0',
          msg:'发帖成功',
          result:AddAricle
      })
  })

  }

 
});
//用户点击之后进入文章详情页面
router.get('/article_detail',function(req,res,next){
  var articleId = req.param('articleId')
  Article.find({articleId:articleId},function (err,doc){
    if(err){  
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        doc[0].viewsnum+=1
      }
      doc[0].save(function(err,doc1){
        res.json({
          status:'0',
          msg:'正在进入...',
          result:doc1
        })

      })
    }
  })
})
//用户取消点赞
router.get('/del_zan',function(req,res,next){
  var articleId = req.param('articleId')
  // var userId = req.cookies.userId;
  var userId = localStorage.getItem('userId');

  User.update({
    userId:userId
  },{
    $pull:{
        'like':{
            'articleId':articleId
        }
    }
  }, function (err,doc) {
    if(err){
        res.json({
            status:'1',
            msg:err.message,
            result:'删除点赞失败'
        });
    }else{
        res.json({
            status:'0',
            msg:'',
            result:'删除点赞成功'
        });
    }
  });  
})

//用户为该文章点赞  同时完成 收藏数+1 ，用户表中增加收藏文章
router.get('/add_zan',function(req,res,next){
  var articleId = req.param('articleId')
  // var userId = req.cookies.userId;
  var userId = localStorage.getItem('userId');

  Article.find({articleId:articleId},function (err,doc){
    if(err){  
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        doc[0].likenum+=1
      }
      doc[0].save(function(err,doc){
      })
    }
  })
      var params = {
        articleId:req.param('articleId')
      };
      User.find({userId:userId},function(err,doc1){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            if(doc1){
                let houseItem = '';
                doc1[0].like.forEach(function (item){
                    if(item.articleId == params.articleId){
                      houseItem = item;
                    }
                })
                if(houseItem){
                    res.json({
                      status:'4',
                      msg:'您已经收藏过了'
                  })
                }else{ 
                    doc1[0].like.push(params);
                    doc1[0].save(function (){
                        res.json({
                            status:'0',
                            msg:'收藏成功'
                        })
                    })
                }
            }
           
        }
      })

})

//用户对文章发表评论
router.get('/addcomment',function(req,res,next){
  //var userId = req.cookies.userId;
  var articleId = req.param('articleId');
  // var userId = req.cookies.userId;
  var userId = localStorage.getItem('userId');
 // var userId = '920190405154458'
  var this_Date = new Date().Format('yyyy-MM-dd hh:mm:ss');
  var user_params = {  
    articleId:articleId,
    content:req.param('content'),
    time:this_Date
  };
  User.find({userId:userId},function(err,doc){
      if(err){
          res.json({
              status:'1',
              msg:err.message
          })
      }else{
          if(doc){
            doc[0].comment.push(user_params);
            doc[0].save(function (){
              res.json({
                  status:'0',
                  msg:'评论成功',
                  result:doc
              })
          }) 
          }
            }
          })
})
//用户去取消收藏
router.get('/del_collect',function(req,res,next){
  var articleId = req.param('articleId')
  // var userId = req.cookies.userId;
  var userId = localStorage.getItem('userId')
  User.update({
    userId:userId
  },{
    $pull:{
        'collect':{
            'articleId':articleId
        }
    }
  }, function (err,doc) {
    if(err){
        res.json({
            status:'1',
            msg:err.message,
            result:'删除收藏失败'
        });
    }else{
        res.json({
            status:'0',
            msg:'',
            result:'删除收藏成功'
        });
    }
  });  
})
//用户对文章进行收藏操作  同时完成 收藏数+1 ，用户表中增加收藏文章
router.get('/add_collect',function(req,res,next){
  var articleId = req.param('articleId')
  // var userId = req.cookies.userId;
  var userId = localStorage.getItem('userId');
  Article.find({articleId:articleId},function (err,doc){
    if(err){  
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        doc[0].collectnum+=1
      }
      doc[0].save(function(err,doc){
      })
    }
  })
      var params = {
        articleId:req.param('articleId')
      };
      User.find({userId:userId},function(err,doc1){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            if(doc1){
                let houseItem = '';
                doc1[0].collect.forEach(function (item){
                    if(item.articleId == params.articleId){
                      houseItem = item;
                    }
                })
                if(houseItem){
                    res.json({
                      status:'4',
                      msg:'您已经收藏过了'
                  })
                }else{ 
                    doc1[0].collect.push(params);
                    doc1[0].save(function (){
                        res.json({
                            status:'0',
                            msg:'收藏成功'
                        })
                    })
                }
            }
           
        }
      })

})
//展示用户所有的评论
router.get('/showallcomment',function(req,res,next){
  // var userId = req.cookies.userId;
  var userId = localStorage.getItem('userId')
 User.find({userId:userId},function(err,doc){
     if(err){
         res.json({
             status:'1',
             msg:err.message
         })
     }else{
       res.json({
         status:'0',
         result:doc[0].comment
       })
        
     }
 })
})

//展示用户所有的收藏
router.get('/showallcollect',function(req,res,next){
  // var userId =req.cookies.userId;
  var userId = localStorage.getItem('userId')
 User.find({userId:userId},function(err,doc){
     if(err){
         res.json({
             status:'1',
             msg:err.message
         })
     }else{
       res.json({
         status:'0',
         result:doc[0].collect
       })
        
     }
 })
})

//展示用户所有的点赞
router.get('/showallzan',function(req,res,next){
  // var userId = req.cookies.userId;
  var userId = localStorage.getItem('userId')
 User.find({userId:userId},function(err,doc){
     if(err){
         res.json({
             status:'1',
             msg:err.message
         })
     }else{
       res.json({
         status:'0',
         result:doc[0].like
       })
        
     }
 })
})
















module.exports = router;
