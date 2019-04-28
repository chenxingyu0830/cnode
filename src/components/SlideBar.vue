<template>
<div class="slideBar">
  <div class="loading" v-if="isLoading">
    <img src="../assets/loading.gif">
  </div>
  <div class="slide-bar" v-else>
    <section class="author_info">
      <div class="header">作者</div>
      <div class="info_container inner">
        <router-link :to="{name:'user_info'}">
          <img :src="posts.avatar_url" :title="posts.loginname">
        </router-link>
        <span>
          <router-link :to="{name:'user_info'}">
            {{posts.loginname}}
          </router-link>
        </span>
        <ul>
          <li>{{posts.score}} 积分</li>
          <li><span>{{topicCollect}}</span>个话题收藏</li>
          <li>
            <img class="icon" src="https://github.com/favicon.ico" alt="">
            <a :href="`https://github.com/${posts.githubUsername}`">@{{posts.githubUsername}}</a>
          </li>
          <li>注册时间 {{ posts.create_at | formatDate}}</li>
        </ul>
      </div>
    </section>
    <section class="recent_topics">
      <div class="lists-header">
        <span>作者最近主题</span>
      </div>
      <div class="list-container inner">
        <ul>
          <li class="list" v-for="list in posts.recent_topics" :key="list.id">
            <!-- 文章跳转 -->
            <router-link :to="{name:'topic',params:{id:list.id, loginname:list.author.loginname}}">
              {{list.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </section>
    <section class="recent_replies">
        <div class="lists">
          <div class="lists-header">
            <span>最近回复的话题</span>
          </div>
          <div class="list-container inner">
            <ul>
              <li class="list" v-for="list in posts.recent_replies" :key="list.id">
                <!-- 文章跳转 -->
                <router-link :to="{name:'topic',params:{id:list.id, loginname:list.author.loginname}}">
                  {{list.title}}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
    </section>
  </div>
</div>
</template>
<script>
export default {
  name:'SlideBar',
  data(){
    return {
      isLoading: true,
      posts: {},
      topicCollect: ""
    }
  },
  methods:{
    limitTo5(){
      if(this.posts.recent_replies.length > 5){
        this.posts.recent_replies.splice(5);
      }
      if(this.posts.recent_topics.length > 5){
        this.posts.recent_topics.splice(5);
      }
    },
    getData(params){
      let p1 = this.request(`/user/${this.$route.params.loginname}`).then(
        response=>{
          this.posts = response
          this.limitTo5()
          this.isLoading = false
          console.log(this.posts)
        } 
      )
      .catch(err => {
        console.log(err)
      });

      let p2 = this.request(`/topic_collect/${this.$route.params.loginname}`).then(
        response=>{
          this.topicCollect = response.length
        }
      )
      .catch(err => {
        console.log(err)
      });
    }
  },

  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
    this.getData()
    next()
  },
  beforeMount(){
    this.isLoading = true
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.slide-bar{
  .inner{
    line-height: 2em;
    padding: 10px;
    background-color: #fff;
    border-radius: 0 0 5px 5px;
    a{
      max-width: 100%;
      white-space: nowrap;
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      line-height: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .lists-header{
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 5px 5px 0 0;
  }  
  .author_info{
    color: #444;
    font-size: 13px;
    .header{
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 5px 5px 0 0;
    }
    .info_container{
      img{
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 10px;
      }
      span{
        vertical-align: top;
      }
      ul{
        li{
          padding: 3px 0;
          .icon{
            width: 15px;
            height: 15px;
            margin-right: 5px;        
          }
        }
      }
    }
  }
  .recent_topics, .recent_replies{
    margin-top: 15px;
    color: #444;
    border-radius: 3px 3px 0 0;
    font-size: 13px;
  }

}
</style>
