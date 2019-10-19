import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    golang_api: {
      base_url: "http://localhost:30000/api/ex-golang",
    },
    
  },
  getters: {
    getGoHealthUrl(state) {
      return state.golang_api.base_url + "/health"
    },
    getGoRestUrl(state) {
      return state.golang_api.base_url + "/rest-api"
    }
  },
  mutations: {},
  actions: {}
});
