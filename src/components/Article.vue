<template>
  <div class="article">
    <!-- 如果正在加载，显示此div -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div class="container" v-else>
      <div class="main">
        <div class="header">
          <h1>
            <span v-if="post.top === true | post.good === true" class="put_style">{{post | tabFormatter}}</span>
            {{post.title}}
          </h1>
          <ul>
            <li>发布于 {{post.create_at | formatDate}}</li>
            <li>作者 {{post.author.loginname}}</li>
            <li>{{post.visit_count}}次浏览</li>
            <li>来自 {{post | tabFormatter}}</li>
          </ul>
        </div>
        <div v-html="post.content" class="content"></div>
      </div>


      <div class="comments">
        <div class="header">
          <span>{{post.replies.length}} </span>回复
        </div>

        <div class="comment" v-for="(reply,index) in post.replies" :key="index">
          <div class="avatar">
            <router-link :to="{name:'user_info',params:{loginname: reply.author.loginname}}">
              <img :src="reply.author.avatar_url">
            </router-link>
          </div>

          <div class="comment-container">
          <div class="comment_info">
            <router-link :to="{
              name:'user_info',params:{loginname: reply.author.loginname}
            }">{{reply.author.loginname}}
            </router-link>
            <span>{{index}}楼·{{reply.create_at | formatDate}}</span>
          </div>

          <div class="comment_content">
            <p v-html="reply.content"></p>
          </div>

          <span class="comment_ups">
            <span>👍</span> 
            <span v-if="reply.ups.length > 0">
              {{reply.ups.length}}
            </span>
            <span v-else>0</span>
          </span>
        </div>
          

        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name:'Article',
  data(){
    return {
     isLoading: false,
     post: {}, //代表当前文章的所有内容
    }
  },
  methods:{
    getArticleData(params){
      this.request(`/topic/${params}`,'GET')
      .then(response=>{
        this.post = response;
        this.isLoading = false;
      })
      .catch(err=>{
        console.log(err)
      });
    }
  },
  beforeMount () {
    this.isLoading = true
    this.getArticleData(this.$route.params.id)
  },
  // watch: {
  //   '$route'(to, from) {
  //     this.getArticleData(this.$route.params.id)
  //   }
  // }  
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
    this.getArticleData(this.$route.params.id)
    next()
  }
}
</script>

<style lang="scss" scoped>

.article{
  .loading {
    display: block;
    position: relative;
    width: 64px;
    height: 64px;
    margin: 0 auto;
  }
  .container {

    .main {
      margin-bottom: 13px;

      > .header {
        padding: 10px;
        background: #fff;
        border-radius: 3px 3px 0 0;
        border-bottom: solid 1px #e5e5e5;
        h1 {
          font-size: 22px;
          font-weight: 700;
          margin: 8px 0;
          display: inline-block;
          vertical-align: bottom;
          width: 75%;
          line-height: 130%;

          .put_style{
            background: #80bd01;
            padding: 2px 4px;
            border-radius: 3px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            -o-border-radius: 3px;
            color: #fff;
            font-size: 12px;
          }
        }
        ul {
          display: flex;
          flex-direction: row;
          li{
            &:first-child::before{
              content: '•';
              padding:0 5px 0 0;
            }
            &::before{
              content: '•';
              padding: 0 5px;
            }
            font-size: 12px;
            color: #838383;
          }
          // display: flex;
          // font-size: 12px;
          // color: #838383;
          // > li {
          //   &::before {
          //     content: "•";
          //     padding: 0 5px;
          //   }
          // }
        }
      }
    }
    .comments{
      
      .header{
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
        color: #444;
      }
      .comment{
        display: flex;
        position: relative;
        background: #fff;
        border-top: 1px solid #f0f0f0;
        padding: 10px;
        &:last-child {
          border-radius: 0 0 3px 3px;
        }
        .avatar {
          img {
            width: 30px;
            height: 30px;
            border-radius: 3px;
          }
        }
        .comment_info{  
          color: #666;
          text-decoration: none;
          padding-left: 10px;
        }
        .comment_content{
          max-width: 1000px;
        }
        .comment_ups{
          position: absolute;
          top: 10px;
          left: 1020px;
        }
      }
    }
  }
}

</style>
