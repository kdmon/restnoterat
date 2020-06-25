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
    const response = await axios.get("testing.json");
    console.log(response.data.supplyshortages.supplyshortage);
    commit('saveSupplies', response.data.supplyshortages.supplyshortage)
    
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
