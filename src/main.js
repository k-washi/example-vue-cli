import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios';
import firebase from "firebase/app"

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
/* eslint-disable no-console */
//console.log(vuetify)
/* eslint-enable no-console */

//axios config
Vue.prototype.$axios.defaults.baseURL = 'http://localhost:30000';
//Vue.prototype.$axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Vue.prototype.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 

import Firebase from "./firebase";
Firebase.init();

/*
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
*/

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    if (user.ma) {
      localStorage.setItem('jwt', user.ma);
    } 
    if (user.displayName) {
      store.commit('onAuthNameChanged', user.displayName)
    } else {
      store.commit('onAuthNameChanged', "Anonymous user") 
    }
    store.commit('onAuthEmailChanged', user.email);
    if (user.uid) {
      store.commit('onUserStatusChanged', true) 
    } else {
      store.commit('onUserStatusChanged', false)
    }
  } else {
    store.commit('onAuthNameChanged', "Anonymous user")
    store.commit('onAuthEmailChanged', "")
  }
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");

})



