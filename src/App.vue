<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <div class="el-container">
        <div class="el-main">
          <router-view name="main"></router-view>
        </div> 
        <div class="el-aside">
          <router-view name="SlideBar"></router-view>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components:{
    Header,

  }
}
</script>

<style lang="scss">

* {margin: 0;padding: 0;}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 400;
}
li {
  list-style-type: none;
}
body {
  background: #e1e1e1;
  font-size: 14px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif;
}
a {
  color: inherit;
  text-decoration: none;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.el-container{
  display: flex;
  margin: 15px auto;
  max-width: 1400px;
  min-width: 960px;
  .el-main{
    flex: 1;
    padding-right: 15px;
    max-width: 1095px;
  }
  .el-aside{
    width: 290px;
  }
}
@import "./assets/markdown.css";
</style>
