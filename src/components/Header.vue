<template>
  <div class="header">
    <div class="container">
      <img src="../assets/cnodejs_light.svg" alt="">
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">新手入门</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">关于</a></li>
        <li><a href="#">注册</a></li>
        <li><a href="#">登录</a></li>
      </ul>
    </div>

  </div>
</template>
<script>
export default {
   name:'Header',
}
</script>
<style scoped>
.header{
  background-color: #444;
  height: 50px; 
}
.header .container{
  width: 100%;
  min-width: 960px;
  margin: 0 auto;
  max-width: 1400px;
}
.header .container img{
  max-width: 120px;
  margin: 10.5px 10px 10.5px 50px;
}
.header .container ul{
  list-style: none;
  float: right;
  margin: 4.5px;
}
.header .container ul>li{
  display: inline-block;
  padding: 10px 15px;
}
.header .container ul>li>a{
  text-decoration: none;
  color: #ccc;
  font-size: 14px;
  text-shadow: none;
}
</style>
