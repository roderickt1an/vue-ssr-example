import Vue from 'vue'
import App from './App.vue'
import { createRouter } from "./router";
import { createStore } from "./store";
import { sync } from 'vuex-router-sync'
import { Toast } from 'vant';
import 'vant/lib/vant-css/toast.css';
import axios from 'axios'
Vue.prototype.$http = axios

axios.defaults.proxy = "http://192.168.0.220:9000"
Vue.config.productionTip = false

Vue.prototype.$Get = function(url, config, success, fail=function(err){console.log(err);_self.$Message.error(err)}){
  let _self = this
  this.$http.get(url,config).then(function(res){
      // _self.$backToLogin(res)
      if(res.data.msgCode == "40000"){
          success(res)
      }else{
          if(res.data.msg){
              Toast.fail(res.data.msg)
          }else{
              console.error(res)
          }
      }
  }).catch(function(err){
      // _self.$Message.error('数据异常！')
      console.error(err)
  })
}

Vue.prototype.$Post = function(url, config, success, fail){
  let _self = this
  this.$http.post(url,config).then(function(res){
      // _self.$backToLogin(res)
      if(res.data.msgCode == "40000"){
          if(res.data.msg){
            Toast.success(res.data.msg)
          }
          success(res)
      }else{
          Toast.fail(res.data.msg)
          fail(res)
          console.warn(res)
      }
  }).catch(function(err){
      fail(err)
      Toast.fail(err)
      console.error(err)
  })
}


// createRouter.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }else{
//     document.title = "e账柜"
//   }
//   next()
// })

// new Vue({
//   render: h => h(App),
//   router
// }).$mount('#app')

//  服务端渲染
export function createApp () {
  const router = new createRouter()
  const store = new createStore()
  sync( router, store )
  // router.beforeEach((to, from, next) => {
  //   /* 路由发生变化修改页面title */
  //   if (to.meta.title) {
  //     document.title = to.meta.title
  //   }else{
  //     document.title = "e账柜"
  //   }
  //   next()
  // })
  const app = new Vue({
    render: h => h(App),
    router,
    store
  })
  return { app, router, store }
}