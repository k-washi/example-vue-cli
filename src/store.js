import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    name: "Anonymous user",
    email: "",
    status: false,
  },
  getters: {
    name(state){
      return state.name
    },
    email(state) {
      return state.email
    },
    isSignedIn(state) {
      return state.status
    },
  },
  mutations: {
    onAuthNameChanged(state, name) {
      state.name = name
    },
    onAuthEmailChanged(state, email) {
      state.email = email; //firebase user情報
    },
    onUserStatusChanged(state, status) {
      state.status = status;
    }
  },
  actions: {}
});
