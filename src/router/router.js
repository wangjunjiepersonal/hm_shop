import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import home from '@/components/tabber/Home.vue'
import menver from '@/components/tabber/Member.vue'
import shopcar from '@/components/tabber/Shopcar.vue'
import search from '@/components/tabber/Search.vue'
import newslist from '@/components/news/Newslist.vue'
import newsinfo from '@/components/news/Newsinfo.vue'
import photolist from '@/components/photo/Photolist.vue'
import photoinfo from '@/components/photo/Photoinfo.vue'
import goodlist from '@/components/good/Goodlist.vue'
import goodinfo from '@/components/good/Goodinfo.vue'
import goodsdesc from '@/components/good/Goodsdesc.vue'
import goodscomment from '@/components/good/Goodscomment.vue'

export default new Router({
	//配置路由规则
  routes: [
  	{path:'/',redirect:'/home'},
    {path:'/home',component:home},
    {path:'/member',component:menver},
    {path:'/shopcar',component:shopcar},
    {path:'/search',component:search},
    {path:'/home/newslist',component:newslist},
    {path:'/home/newsinfo/:id',component:newsinfo},
    {path:'/home/photolist',component:photolist},
    {path:'/home/photoinfo/:id',component:photoinfo},
    {path:'/home/goodlist',component:goodlist},
    {path:'/home/goodinfo/:id',component:goodinfo,name:'goodinfo'},
    {path:'/home/goodsdesc/:id',component:goodsdesc,name:'goodsdesc'},
    {path:'/home/goodscomment/:id',component:goodscomment,name:'goodscomment'}
  ],
  //设置路由高亮
  linkActiveClass:'mui-active'
})
