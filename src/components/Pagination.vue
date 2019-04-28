<template>
  <div class="pagination">
    <ul class="pagination-ul" onselectstart="return false;">
      <li class="pagebtn" @click="changeBtn">首页</li>
      <li class="pagebtn" @click="changeBtn">上一页</li>
      <li class="pagebtn" v-if="judge">...</li>
      <li :class="[{currentPage:page===currentPage},'pagebtn']" 
      v-for="(page,index) in pages" :key="index"
      @click="changeBtn(page)">
        {{page}}
      </li>
      <li class="pagebtn">...</li>
      <li class="pagebtn" @click="changeBtn">下一页</li>
    </ul>
  </div>
</template>
<script>
import $ from 'jquery'

export default {
  name:'Pagination',
  data(){
    return {
      pages: [1,2,3,4,5],
      currentPage: 1,
      judge: false
    }
  },
  methods:{
    changeBtn(page){
      //点击上一页，下一页,首页
      if(typeof page != 'number'){
        switch(page.target.innerText){
          case '上一页':
            $('li.currentPage').prev().click()
            break;
          case '下一页':
            $('li.currentPage').next().click()
            break;
          case '首页':
            this.pages = [1,2,3,4,5]
            this.changeBtn(1)
            break;
          default:
            break;
        }
        return
      }
      this.currentPage = page
      if(page > 4){
        this.judge = true
      }else{
        this.judge = false
      }
      // if(page > 4){
      //   this.judge_next = true
      // }else{
      //   this.judge_next = false
      // }
      if(page === this.pages[4]){
        this.pages.shift()  //移除第一个元素
        this.pages.splice(4,0,this.pages[3]+1)  //添加最后一个
      }
      if(page === this.pages[0] && page != 1){
        this.pages.unshift(this.pages[0]-1)//先在第一个位置加一个
        this.pages.splice(5,1)//移除最后一个数字
      }
      this.$emit('current-change', this.currentPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.currentPage{
  color: #80bd01;
}
.pagination{
  ul.pagination-ul{
    display: flex;
    background-color: #fff;
    padding: 10px;
    li{
      cursor: pointer;
      &.pagebtn{
        border-top: none;
        width: 45px;
        padding: 5px;
      }
      &:hover{
        background-color: #F5F5F5; 
      }
    }

  }
}


</style>
