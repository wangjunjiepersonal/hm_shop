// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//引入mui
import '../lib/mui-master/dist/css/mui.min.css'
import '../lib/mui-master/dist/css/icons-extra.css'

//引入vue-router
import router from './router/router.js'

//导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

//导入vue图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//全局配置根路径VueResource
Vue.http.options.root = 'http://localhost:8080/static/lb'
//全局配置post表单数据格式
Vue.http.options.emulateJSON = true
Vue.config.productionTip = false

//导入时间处理插件 moment
import moment from 'moment'
//定义全局过滤器
Vue.filter('dataFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
	moment(dataStr).format(pattern)
})

//导入vuex
var car = JSON.parse(localStorage.getItem('car') || '[]')
let store = new Vuex.Store({
	state:{      //this.$store.state.xxx
		//用一个数据来存储购物车的数据  包括 商品的ID  商品的购买数量   商品的购买单价    商品是否选中
		car:car
	},
	mutations:{  //this.$store.commit('xxxx')
		//点击加入购物车 将商品信息存储到state中
		addToCar(state,goodshop){
			//通过一个flag标记来控制当前是否有存储 如果没有存储false 那么将数据push到state.car.中 如果没有存储 flag为true
			let flag = false
			state.car.some(item => {
				if (item.id == goodshop.id) {
					item.count += parseInt(goodshop.count)
					flag = true
					return true
				}
			})
			if (flag == false) {
				state.car.push(goodshop)
			}
			//每次对car进行修改之后 都将数据通过localStorage储存到浏览器
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		//通过控制购物车的加减改变state.car.count
		updateGoodShop(state,goodinfo){
			state.car.some(item => {
				if (item.id == goodinfo.id) {
					item.count = goodinfo.count
					return true
				}
			})
			//每次对car进行修改之后 都将数据通过localStorage储存到浏览器
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		//点击删除按钮删除state.car中的数据
		deleteCar(state,id){
			state.car.some((item,index) => {
				item.id == id
				state.car.splice(index,1)
				return true
			})
			//每次对car进行修改之后 都将数据通过localStorage储存到浏览器
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		//将切换按钮的状态同步state.car的selected上
		updateGoodsSelected(state,info){
			state.car.some(item => {
				if (item.id == info.id) {
					item.selected = info.selected
				}
				
			})
			//每次对car进行修改之后 都将数据通过localStorage储存到浏览器
			localStorage.setItem('car',JSON.stringify(state.car))
		}
	},
	getters:{     //this.$store.getters.xxx
		//通过getters属性来计算
		getAllCount(state){
			let c = 0
			state.car.forEach(item => {
				c += item.count
			})
			return c
		},
		//计算单个的数量
		getGoodsCount(state){
			let o = {}
			state.car.forEach(item => {
				o[item.id] = item.count
			})
			return o
		},
		//计算勾选数
		getGoodsSelected(state){
			let o = {}
			state.car.forEach(item => {
				o[item.id] = item.selected
			})
			return o
		},
		//计算勾选总价和数量
		getGoodsCountAmount(state){
			let o = {
				count:0,
				amount:0
			}
			state.car.forEach(item => {
				 if (item.selected) {
				 	o.count += item.count
				 	o.amount += item.price*item.count
				 }
			})
			return o
		}
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
