import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { mapActions } from 'vuex'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  mounted: function () {
    this.fetchSupplies()
    this.fetchProducts()
  },
  methods: mapActions(['fetchSupplies', 'fetchProducts'])
}).$mount('#app')
