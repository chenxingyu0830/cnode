<template>
  <div class="post-list">
    <!-- 在数据未返回的时候，显示loading -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <!-- 表示主题帖子列表 -->
    <div class="lists" v-else>
      <div class="lists-header">
        <a class="current-tab">全部</a>
        <a>精华</a>
        <a>分享</a>
        <a>问答</a>
        <a>招聘</a>
      </div>
      <div class="lists-container">
        <ul>
          <li v-for="list in posts" :key="list.id">
            <!-- 头像 -->
            <img :src="list.author.avatar_url" :title="list.author.loginname">
            <!-- 回复/浏览 -->
            <span class="reply_count">
              <span title="回复数">{{list.reply_count}}</span>/<span title="点击数">{{list.visit_count}}</span>
            </span>
            <!-- 帖子的分类 -->
            <span :class="[{put: true,put_good:(list.good === true),put_top:(list.top === true),
            'topiclist-tab':(list.good !=true && list.top != true)}]">
              <a>
                {{list | tabFormatter}}
              </a>
            </span>
            <!-- 标题 -->
            <span class="title" :title="list.title">
              <router-link :to="{name: 'topic', params:{id:list.id, loginname:list.author.loginname}}">
                  {{list.title}}
              </router-link>
            </span>
            <!-- 最终回复时间 -->
            <span class="last_reply">
              {{list.last_reply_at | formatDate}}
            </span>
          </li>
        </ul>
        <!-- 分页 -->
        <pagination @current-change="onCurrentChange"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import pagination from './Pagination'
export default {
  name:'PostList',
  data(){
    return {
      isLoading: false,
      posts: {}, //代表页面的列表数组
      page: 1
    }
  },
  components: {
    pagination
  },
  methods:{
    // getData(){
    // this.$http.get('https://cnodejs.org/api/v1/topics',{
    //   params:{
    //     page: this.postpage,
    //     limit: 20
    //   }

    // })
    // .then(res=>{
    //   this.isLoading = false; //加载成功，去除动画
    //   this.posts = res.data.data;
    //   console.log(res)
    // })
    // .catch(err=>{
    //   //处理返回失败后的问题
    //   console.log('网络波动,请稍后再试！')
    //   console.log(err)        
    //   })
    // },
    getData(){
      this.request('https://cnodejs.org/api/v1/topics','GET',{page:this.page, limit:20}).then(
        res=>{
          this.isLoading = false  //加载成功，去除动画
          this.posts = res
          this.$router.push({
            path: "/",
            query: {
              page: this.page
            }
          })
      })
    },
    onCurrentChange(value){
      this.page = value
      this.getData()
    }
  },
  beforeMount(){
    this.isLoading = true //加载成功之前显示加载动画
    this.getData()  //在页面加载之前获取数据
  }
}
</script>

<style lang="scss">
  .post-list{
    margin: 0 auto;
    .loading {
    display: block;
    position: relative;
    width: 64px;
    height: 64px;
    margin: 0 auto;
    }

    .lists {
      .lists-header{
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
        > a {
          margin: 0 10px;
          color: #80bd01;
          &.current-tab {
            background-color: #80bd01;
            color: #fff;
            padding: 3px 4px;
            border-radius: 3px;
            cursor: pointer;
          }
        }
      }
      .lists-container {
        ul {
          > li {
            padding: 10px;
            background: #fff;
            font-size: 14px;
            display: flex;
            align-items: center;
            &:hover {
              background: #f5f5f5;
            }
            &:not(:first-child) {
              border-top: 1px solid #f0f0f0;
            }
            &:last-child {
              border-radius: 0 0 3px 3px;
            }
            > img {
              width: 30px;
              height: 30px;
              border-radius: 3px;
            }
            .reply_count{
              width: 70px;
              display: inline-block;
              text-align: center;
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
              .put{
                background-color: #e5e5e5;
                color: #999;
                padding: 2px 4px;
                border-radius: 3px;
                font-size: 12px;
                &.put_top,
                &.put_good {
                  background: #80bd01;
                  color: #fff;
                }
              }
               .title {
                overflow: hidden;
                flex: 1;
                margin-left: 5px;
                > a {
                  max-width: 70%;
                  white-space: nowrap;
                  display: inline-block;
                  vertical-align: middle;
                  font-size: 16px;
                  line-height: 30px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
              .last_reply{
                color: #778087;
              }
            }


        }
      }
    }
  }
</style>
