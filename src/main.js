import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import AppSpinner from "./components/UI/AppSpinner";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.component("AppSpinner", AppSpinner);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// TODO:
// add - add category component
// add vuetify icons
