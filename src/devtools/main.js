import Vue from "vue";
import axios from "axios";
import VueCodemirror from "vue-codemirror";
import "../main/devtools";

import "codemirror/lib/codemirror.css";

import App from "./App";
import router from "./router";
import store from "./store";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

import Rx from "rxjs/Rx";
import VueRx from "vue-rx";

// tada!
Vue.use(VueRx, Rx);

Vue.use(VueCodemirror);
Vue.use(Vue => {
  Vue.mixin({
    created() {
      const vm = this;
      const use = vm.$options.$use;
      if (use) {
        _.$use(use);
      }
    }
  });
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
