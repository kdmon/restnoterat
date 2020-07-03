import axios from 'axios';
import Vue from 'vue';

const state = {
  shortages: {},
  products: []
};

const getters = {
  allSupplies: state => state.shortages
};

const actions = {
  async fetchSupplies({ commit }) {
    const response = await axios.get('supplyshortage.json');
    console.log(response.data);
    commit('saveSupplies', response.data);
  },
  async fetchSuppliesTwo({ commit }) {
    const response = await axios.get('/supplyshortage.json');
    console.log(response.data);
    commit('saveSupplies', response.data);
  },
  async fetchProducts({ commit }) {
    const response = await axios.get(
      'https://webappeditor.com/uploads/output_new.json'
    );
    console.log(response.data);
    commit('saveProducts', response.data);
  }
};

const mutations = {
  saveSupplies(state, shortages) {
    console.log('shortages', shortages);
    Vue.set(state, 'shortages', shortages);
  },
  saveProducts(state, products) {
    Vue.set(state, 'products', products);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
