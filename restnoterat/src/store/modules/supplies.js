import axios from 'axios'
import Vue from 'vue'

const state = {
  shortages: {},
  products: {}
}

/*
Receives the state and then brings out the object of a specific ID
the ID is a nplid is based on the route params from /npld:id.
Then an object is created containing data from two APIs
describing a product.
*/
const getters = {
  allSupplies: state => state.shortages,
  productByNplId: (state) => (id) => {
    const product = {}
    // Data from products state
    product.name = state.products[id].name
    product.prod = state.products[id].prod
    product.rx = state.products[id].rx
    product.flags = state.products[id].flags
    product.substances = state.products[id].substances
    product.form = state.products[id].form
    product.strength = state.products[id].strength
    product.packages = state.products[id].packages
    product.atc = state.products[id].atc

    // Data from shortages state
    product.advice = state.shortages[id].advice
    product.forecastDate = state.shortages[id].forecastDate
    product.nplId = state.shortages[id].nplId
    product.packs = state.shortages[id].packs
    product.publiccontact = state.shortages[id].publicContact
    product.publicationDate = state.shortages[id].publicationDate
    product.referenceNumber = state.shortages[id].referenceNumber
    return product
  }
}

/*
"name": "Celectol Sanofi-Aventis",
  "prod": "LIC",
  "rx": "1",
  "flags": {},
  "substances": [{"name":"IDE4POF6UARA4VERT1","type":"ACTI","qunit2":"EQ"}],
  "form": "FICOTA",
  "strength": "200 mg",
  "packages": {"20131105100082":{"text":"Licensförpackning","otc":"N"}},
  "atc": "C07AB08"
*/

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
