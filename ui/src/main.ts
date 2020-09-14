import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'

import * as io from 'socket.io-client'

/* axios.interceptors.request.use(config => {
  console.log('hmmmmm')
  return config
}) */

const socket = io.connect('http://localhost:8000')

Vue.config.productionTip = false
Vue.prototype.$socketIO = socket

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
