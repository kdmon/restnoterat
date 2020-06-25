import axios from "axios";
import Vue from "vue"

const state = {
  supplies: []
};

const getters = {
  allSupplies: state => state.supplies
};

const actions = {
  async fetchSupplies({ commit }) {
    const response = await axios.get("supplyshortage.json");
    console.log(response.data);
    commit('saveSupplies', response.data)
    
  }
};

const mutations = {
  saveSupplies (state, supplies) {
    Vue.set(state, 'supplies', supplies)
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
