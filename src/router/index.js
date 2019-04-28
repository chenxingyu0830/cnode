import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'root',
      path:'/',
      components:{
        main:PostList
      }
    },
    {
      name:'topic',
      path:'/topic/:id&:loginname',
      components:{
        main:Article,
        SlideBar
      }
    },
    {
      name:'user_info',
      path:'/userinfo/:loginname',
      components:{
        main:UserInfo,
        SlideBar
      }
    }
  ]
})
