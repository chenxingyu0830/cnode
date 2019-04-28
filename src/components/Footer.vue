<template>
  <div class="footer">
    <section>
        <div class="footer-container">
          <p>RSS | 源码地址</p>
          <p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
          <p>新手搭建 Node.js 服务器，推荐使用无需备案的 <a href="https://www.digitalocean.com/">DigitalOcean(https://www.digitalocean.com/)</a></p>
        </div>
    </section>
  </div>
</template>
<script>
export default {
  name:'Footer',
}
</script>

<style lang="scss" scoped>

.footer{
  clear: both;
  background: #fff;
  .footer-container{
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    margin: 0 auto;
    color: #ababab;
    padding: 20px 0;
    font-size: 13px;
    line-height: 2em;
  }
}



</style>
