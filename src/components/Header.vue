<template>
  <div class="header">
    <div class="container">
      <router-link :to="{name: 'root'}"><img src="../assets/cnodejs_light.svg" alt=""></router-link>
      <ul>
        <li>
          <router-link :to="{name: 'root'}">首页</router-link>
        </li>
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

<style lang="scss" scoped>

.header{
  background-color: #444;
  width: 100%;
  .container{
    width: 100%;
    min-width: 960px;
    margin: 0 auto;
    max-width: 1400px;
    img{
      max-width: 120px;
      margin: 10px auto;
    }
    ul{
      list-style: none;
      float: right;
      margin: 5px 10px 0 0;
      align-items: center;
      justify-content: center;
      > li{
        display: inline-block;
        padding: 11.5px 15px;
        &:first-child >a{
          cursor: pointer;
        }
        > a{
          text-decoration: none;
          color: #ccc;
          font-size: 13px;
          cursor:auto;
          &:hover{
            color: #fff;
          }

        }
      }
    }
  }
}

</style>
