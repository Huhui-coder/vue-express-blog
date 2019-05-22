// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Routers from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
Vue.use(VueRouter)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '../static/reset.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)





Vue.use(iView);


Vue.use(ElementUI)

 
Vue.config.productionTip = false
Vue.prototype.$http = axios

const RouterConfig = {
    mode:'history',
    routes:Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to,from,next)=>{
  window.document.title = to.meta.title;
  next();
})
router.afterEach((to,form,next)=>{
  window.scrollTo(0,0)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  data() {
    return { value: '' }
},
  router,
  render:h=>{
    return h(App)
  }
})
