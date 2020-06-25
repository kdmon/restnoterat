import Vuex from "vuex";
import Vue from "vue";
import supplies from "./modules/supplies.js";

// Initiera Vuex
Vue.use(Vuex);

// Skapa lagring
export default new Vuex.Store({
  modules: {
    supplies
  }
});
