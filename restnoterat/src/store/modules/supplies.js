import axios from 'axios'
import Vue from 'vue'

const state = {
  shortages: {},
  products: {},
  loading: true,
  combined: {},
  atcLexicon: {},
  formLexicon: {},
  graph: {
    min: -10,
    max: 10,
    rows: 0,
    scale: 1,
    pixelsPerDay: 10,
    rowHeight: 36
  }

}

const methods = {
  // Returns a filtered object containing products matching name and atc based on queries
  searchHandler: function (query, data) {
    console.log(query)
    query = query.trim().toLowerCase()
    const filteredObj = {}
    for (const nplId in data) {
      if (data[nplId].name.toLowerCase().includes(query) ||
        data[nplId].atc.toLowerCase().substring(0, query.length) === query) {
        filteredObj[nplId] = data[nplId]
      }
    }
    return filteredObj
  }
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
    if (currentShortage === true) {
      const obj = {}
      for (const nplid in state.combined) {
        const shortage = state.combined[nplid]
        if (shortage.currentShortages.length > 0) {
          obj[shortage.nplId] = shortage
          obj[shortage.nplId].shortages = obj[shortage.nplId].shortages.filter(period => period.status === 'current')
        }
      }
      return methods.searchHandler(query, obj)
    } else {
      return methods.searchHandler(query, state.combined)
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
    commit('setLoading', 'Hämtar lexikon')
    const formLexicon = await axios.get('/lex.json')
    commit('saveFormLexicon', formLexicon.data)
    const atcLexicon = await axios.get('/atc.json')
    commit('saveAtcLexicon', atcLexicon.data)
    commit('setLoading', 'Hämtar restnoteringar')
    const shortages = await axios.get('/supplyshortage.json')
    console.log(Object.keys(shortages.data).length)
    commit('saveSupplies', shortages.data)
    commit('setLoading', 'Hämtar läkemedelskatalog')
    const products = await axios.get('/products.json')
    commit('saveProducts', products.data)
    const combined = {}
    let c = 0
    let earliestDay = 0
    let latestDay = 0
    let rows = 0
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
        combined[id].currentShortages = []
        combined[id].previousShortages = []
        // Loop through forecast dates to convert into days
        let i = 0
        let packCount = 0
        combined[id].offset = rows
        for (const shortage of shortages.data[id].shortages) {
          // Adding a default status for all shortages
          combined[id].shortages[i].status = 'current'
          // Get days between forcast start date and end date
          // N.B: The duration can be NULL if it has no end date
          const startDate = shortage.forecastDate.startDate
          const endDate = shortage.actualEndDate ? shortage.actualEndDate : shortage.forecastDate.endDate
          const timeDiffForecast = (new Date(endDate)) - (new Date(startDate))
          const forecastDays = timeDiffForecast / (1000 * 60 * 60 * 24)
          // Get days since shortage
          const today = new Date().toISOString().slice(0, 10)
          const timeDiffDaysPast = (new Date(startDate)) - (new Date(today))
          const daysPast = timeDiffDaysPast / (1000 * 60 * 60 * 24)
          combined[id].shortages[i].relativeStartDay = daysPast
          combined[id].shortages[i].duration = forecastDays
          // ADD status for upcoming shortages
          // Some upcoming forecasts has an existing actual end date
          if (today < shortage.forecastDate.startDate) {
            combined[id].shortages[i].status = 'upcoming'
          }
          const packs = []
          // Looping through the packs to split them into previous and current shortages
          for (const pack of shortage.packs) {
            if (combined[id].packages[pack.nplpackid]) {
              packs.push({
                name: combined[id].packages[pack.nplpackid].text,
                nplPackId: pack.nplpackid
              })
            }
          }
          if (!shortage.actualEndDate) {
            combined[id].currentShortages.push(
              { ...shortage, packs }
            )
          } else {
            combined[id].shortages[i].status = 'previous'
            combined[id].previousShortages.push(
              { ...shortage, packs }
            )
          }
          i++
          // Check for earliest shortage start date
          if (daysPast < earliestDay) {
            earliestDay = daysPast
          }
          if (forecastDays + daysPast > latestDay && forecastDays != null) {
            latestDay = forecastDays + daysPast
          }
          rows += shortage.packs.length
          packCount += shortage.packs.length
        }
        combined[id].packCount = packCount
        // Looping thourgh all shortages to check for current shortages since there can be > 1
        combined[id].currentShortages.sort(function (a, b) {
          if (a.publicationDate.endDate > b.publicationDate.endDate) {
            return 1
          } else if (a.publicationDate.endDate < b.publicationDate.endDate) {
            return -1
          } else {
            return 0
          }
        })
        combined[id].previousShortages.sort(function (a, b) {
          if (a.actualEndDate > b.actualEndDate) {
            return -1
          } else if (a.actualEndDate < b.actualEndDate) {
            return 1
          } else {
            return 0
          }
        })
      } else c++
    }
    console.log(c, 'combinedlength', Object.keys(combined).length)
    Object.freeze(combined)
    commit('saveCombined', combined)
    console.log('combined', combined[20040607001097])
    commit('setLoading', false)
    commit('setBound', { max: latestDay, min: earliestDay, rows: rows })
  }
  // async fetchProducts ({ commit }) {
  //   const response = await axios.get('products.json')
  //   console.log('Products', response.data)
  //   commit('saveProducts', response.data)
  // }
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
  },
  saveAtcLexicon (state, atcLexicon) {
    Vue.set(state, 'atcLexicon', atcLexicon)
  },
  saveFormLexicon (state, formLexicon) {
    Vue.set(state, 'formLexicon', formLexicon)
  },
  setBound (state, { min, max, rows }) {
    console.log('KOLLA HÄÄÄR', min, max)
    Vue.set(state.graph, 'min', min)
    Vue.set(state.graph, 'max', max)
    Vue.set(state.graph, 'rows', rows)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
