import Vue from 'vue'
import App from './App.vue'

import router from './Dependencias/routes'
import store from './Dependencias/store'
import './Dependencias/filters'
import './Dependencias/form'
import './Dependencias/bootstrap'
import './Dependencias/httpClient'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
