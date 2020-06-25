// import axios from "axios";

import axios from "axios";

const state = {
  supplies: []
};

const getters = {
  allSupplies: (state) => state.supplies,
};

const actions = {
  async fetchSupplies() {
    const response = await axios.get("testing.json");

    console.log(response.data);
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
