const routers = [
  {   name:'index',
      path: '/',
      meta: {
          title: '主页'
      },
      component: (resolve) => require(['../views/index.vue'], resolve)
  },  
  {   name:'user',
  path: '/user_collect',
  meta: {
      title: '用户已收藏'
  },
  component: (resolve) => require(['../views/user_collect.vue'], resolve)
}, 
{   name:'user',
path: '/user_zan',
meta: {
    title: '用户已点赞'
},
component: (resolve) => require(['../views/user_zan.vue'], resolve)
}, 
{   name:'user',
path: '/user_comment',
meta: {
    title: '用户已评论'
},
component: (resolve) => require(['../views/user_comment.vue'], resolve)
}, 
{   name:'articleDetail',
path: '/articleDetail/:articleId',
meta: {
    title: '文章详情页'
},
component: (resolve) => require(['../views/articleDetail.vue'], resolve)
}, 
{   name:'addarticle',
path: '/addarticle',
meta: {
    title: '发布文章详情'
},
component: (resolve) => require(['../views/addarticle.vue'], resolve)
}, 
{   name:'admin',
path: '/admin',
meta: {
    title: '管理员页'
},
component: (resolve) => require(['../views/admin.vue'], resolve)

}, 
{   name:'about',
path: '/about',
meta: {
    title: '关于我'
},
component: (resolve) => require(['../views/about.vue'], resolve)
}, 
{
    path: '/search/:search',
    name: 'search',
    meta: {
      title: '搜索结果页面'
  },
  component:(resolve) => require(['../views/search.vue'], resolve)
},


  {
      path: '*',
      redirect: '/'
  }
];
export default routers;