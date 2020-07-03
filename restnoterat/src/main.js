import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import { mapActions } from 'vuex';

new Vue({
  store,
  router,
  render: h => h(App),
  mounted: function() {
    this.fetchSupplies();
    this.fetchProducts();
  },
  methods: mapActions(['fetchSupplies', 'fetchProducts'])
}).$mount('#app');
