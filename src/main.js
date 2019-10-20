import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

//axios config
Vue.prototype.$axios.defaults.baseURL = 'http://localhost:30000';
//Vue.prototype.$axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Vue.prototype.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
