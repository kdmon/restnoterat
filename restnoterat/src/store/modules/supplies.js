import axios from 'axios'
import Vue from 'vue'

const state = {
  shortages: {},
  products: {}
}

const getters = {
  allSupplies: state => state.shortages,
  productByNplId: (state) => (id) => {
    let o = {}
    o.name = state.products[id].name
    o.advice = state.shortages[id].advice
    o.atc = state.products[id].atc
    return o
  }
}

const actions = {
  async fetchSupplies ({ commit }) {
    const response = await axios.get('supplyshortage.json')
    console.log(response.data)
    commit('saveSupplies', response.data)
  },
  async fetchSuppliesTwo ({ commit }) {
    const response = await axios.get('/supplyshortage.json')
    console.log(response.data)
    commit('saveSupplies', response.data)
  },
  async fetchProducts ({ commit }) {
    const response = await axios.get('products.json')
    console.log('Products', response.data)
    commit('saveProducts', response.data)
  }
}

const mutations = {
  saveSupplies (state, shortages) {
    console.log('shortages', shortages)
    Vue.set(state, 'shortages', shortages)
  },
  saveProducts (state, products) {
    Vue.set(state, 'products', products)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
