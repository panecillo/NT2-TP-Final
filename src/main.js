import Vue from 'vue'
import App from './App.vue'


import router from './routes'
import './filters'
import './form'
import './bootstrap'
import './httpClient'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
