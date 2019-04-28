<template>
  <div class="UserInfo">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div class="user-info" v-else>
      <section class="user_index">
        <nav>
          <ul>
            <li>
              <router-link :to="{name:'root'}">
                主页
              </router-link>
              <span>/</span>
            </li>
          </ul>
        </nav>
        <div class="index_container">
          <div class="avatar">
            <img :src="posts.avatar_url">
            <span>{{posts.loginname}}</span>
          </div>

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
      <section class="user_recent_topics">
        <div class="lists">
          <div class="list-header">
            <span>最近创建的话题</span>
          </div>
          <div class="list-container">
            <ul>
              <li class="list" v-for="list in posts.recent_topics" :key="list.id">
                <!-- 用户头像 -->
                <img :src="list.author.avatar_url">
                <!-- 评论/点击 -->
                <span class="reply_count">
                  <span>{{list.reply_count}}</span>/<span>{{list.visit_count}}</span>
                </span>
                <!-- 文章跳转 -->
                <router-link :to="{name:'topic',params:{id:list.id}}">
                  {{list.title}}
                </router-link>
                <!-- 最后更新时间 -->
                <span class="last_active_time">{{list.last_reply_at | formatDate}}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section class="user_recent_replies">
        <div class="lists">
          <div class="list-header">
            <span>最近回复的话题</span>
          </div>
          <div class="list-container">
            <ul>
              <li class="list" v-for="list in posts.recent_replies" :key="list.id">
                <!-- 用户头像 -->
                <img :src="list.author.avatar_url">
                <!-- 评论/点击 -->
                <span class="reply_count">
                  <span>{{list.reply_count}}</span>/<span>{{list.visit_count}}</span>
                </span>
                <!-- 文章跳转 -->
                <router-link :to="{name:'topic',params:{id:list.id}}">
                  {{list.title}}
                </router-link>
                <!-- 最后更新时间 -->
                <span class="last_active_time">{{list.last_reply_at | formatDate}}</span>
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
  name:'UserInfo',
  data(){
    return {
      isLoading: false,
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
    getCount(temp,type){
      return Promise.all(
        type.map((element, key) =>{
          return this.request(`topic/${element.id}`)
          .then(res =>{
            type[key].reply_count = res.reply_count;
            type[key].visit_count = res.visit_count;
            return temp;
          })
        })
      )
    },
    // getUserData(params){
    //   this.request(`/user/${params}`)
    //   .then(response=>{
    //     this.posts = response
    //     this.isLoading = false
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })
    // }
  },
  beforeMount(){
    //  this.isLoading = true
    //  this.getUserData(this.$route.params.loginname)
    let p1 = this.request(`/user/${this.$route.params.loginname}`).then(
      response => {
        let p3 = this.getCount(response, response.recent_replies);
        let p4 = this.getCount(response, response.recent_topics);
        console.log('p3,p4获取成功')
        Promise.all([p3,p4]).then(e => {
          this.posts = e[0][0];
          this.limitTo5();
          this.isLoading = false
          console.log('this.posts')
          console.log(this.posts)
        });
      }
    )

    let p2 = this.request(`topic_collect/${this.$route.params.loginname}`).then(
      response => {
        this.topicCollect = response.length
      }
    )
  }
}
</script>

<style lang="scss" scoped>
  .UserInfo{
    .user_index{
      nav{
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
        a{
          color: #80bd01;
        }
        span{
          padding: 0 5px;
          color: #ccc;
        }
      }
      .index_container{
        background-color: #fff;
        padding: 10px;
        border-top: 1px solid #e5e5e5;
        .avatar{
          span{
            display: inline-block;
            vertical-align: top;
            padding-top: 5px;
          }
        }
        ul{
          li{
            margin: 10px 0;
          }
          li:not(:first-child){
            color: #ababab;
          }
        }
      }
    }
    .user_recent_topics ,.user_recent_replies{
      margin-top: 15px;
      .list-header{
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
      }
      .list-container{
        background: #fff;
        ul>li{
          display: flex;
          padding: 10px;
          img{
            width: 30px;
            height: 30px;
          }
          .reply_count{
            width: 70px;
            display: inline-block;
            text-align: center;
            width: 70px;
            vertical-align: top;
            margin-top: 2px;
            span:first-child{
              color: #9e78c0;
            }
            span:last-child{
              font-size: 10px;
              color: #b4b4b4;
            }
          }
        }
        a{
          white-space: nowrap;
          display: inline-block;
          vertical-align: middle;
          font-size: 16px;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }
        .last_active_time{
          font-size: 11px;
          color: #777;
        }
      }
      .list-container ul>li:not(:first-child){
        border-top: 1px solid #f0f0f0
      }
    }
    img{
      width: 40px;
      height: 40px;
    }
    li{
      .icon{
        width: 15px;
        height: 15px;
      }
    }

  }
</style>
