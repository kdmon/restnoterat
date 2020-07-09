import axios from 'axios'
import Vue from 'vue'

const state = {
  shortages: {},
  products: {},
  loading: true,
  combined: {}

}

/*
Receives the state and then brings out the object of a specific ID
the ID is a nplid is based on the route params from /npld:id.
Then an object is created containing data from two APIs
describing a product.
*/
const getters = {
  allSupplies: state => state.shortages,
  shortages: (state) => (currentShortage, query) => {
    console.log(currentShortage)
    if (currentShortage === true) {
      const obj = {}
      for (const nplid in state.combined) {
        const shortage = state.combined[nplid]
        if (shortage.currentShortage) {
          obj[shortage.nplId] = shortage
        }
      }
      console.log('filtered', Object.keys(obj).length)
      return obj
    } else {
      return state.combined
    }
  },
  productByNplId: (state) => (id) => {
    return state.combined[id]
    // const product = {}
    // // Data from products state
    // product.name = state.products[id].name
    // product.prod = state.products[id].prod
    // product.rx = state.products[id].rx
    // product.flags = state.products[id].flags
    // product.substances = state.products[id].substances
    // product.form = state.products[id].form
    // product.strength = state.products[id].strength
    // product.packages = state.products[id].packages
    // product.atc = state.products[id].atc

    // // Data from shortages state
    // product.shortages = state.shortages[id].shortages
    // product.currentShortage = false
    // for (const shortage in state.shortages[id].shortages) {
    //   if (!shortage.actualEndDate) {
    //     product.currentShortage = true
    //     break
    //   }
    // }
    // // product.forecastDate = state.shortages[id].forecastDate
    // // product.nplId = state.shortages[id].nplId
    // // product.packs = state.shortages[id].packs
    // // product.publiccontact = state.shortages[id].publicContact
    // // product.publicationDate = state.shortages[id].publicationDate
    // // product.referenceNumber = state.shortages[id].referenceNumber
    // return product
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
  async fetchData ({ commit }) {
    commit('setLoading', 'Hämtar restnoteringar')
    const shortages = await axios.get('/supplyshortage.json')
    console.log(Object.keys(shortages.data).length)
    commit('saveSupplies', shortages.data)
    commit('setLoading', 'Hämtar läkemedelskatalog')
    const products = await axios.get('/products.json')
    commit('saveProducts', products.data)
    const combined = {}
    let c = 0
    for (var id of Object.keys(shortages.data)) {
      if (products.data[id]) { // TODO: fix latest catalog
        combined[id] = {}
        combined[id].nplId = id
        combined[id].name = products.data[id].name
        combined[id].prod = products.data[id].prod
        combined[id].rx = products.data[id].rx
        combined[id].flags = products.data[id].flags
        combined[id].substances = products.data[id].substances
        combined[id].form = products.data[id].form
        combined[id].strength = products.data[id].strength
        combined[id].packages = products.data[id].packages
        combined[id].atc = products.data[id].atc

        // Data from shortages state
        combined[id].shortages = shortages.data[id].shortages
        combined[id].currentShortage = false
        for (const shortage of shortages.data[id].shortages) {
          if (!shortage.actualEndDate) {
            combined[id].currentShortage = true
            break
          }
        }
      } else c++
    }
    console.log(c, 'combinedlength', Object.keys(combined).length)
    commit('saveCombined', combined)
    console.log('combined', combined)
    commit('setLoading', false)
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
  },
  saveCombined (state, products) {
    Vue.set(state, 'combined', products)
  },
  setLoading (state, value) {
    state.loading = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
