<!--  -->
<template>
  <div class="root">

      <nav-header></nav-header>
    <div class="main-wrap">
        <div class="main">
            <p>   姓名：牟韦西 </p>
           <p> 年龄：22</p>
            <p>   毕业院校：长江师范学院 </p>
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
     

    };
  },

  components: {
    NavHeader,
    NavFooter


  },

  computed: {},

  mounted (){

  },

  methods: {
  

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
.main-wrap{
    width: 100%;
}
.main{
    width: 67rem;
    margin: 0 auto;
    text-align: center;
    min-height: 37rem;
}
</style>