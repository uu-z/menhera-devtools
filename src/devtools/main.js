import Vue from "vue";
import axios from "axios";
import TreeView from "vue-json-tree-view";
import "../main/devtools";

// import VueCodemirror from "vue-codemirror";
// import "codemirror/lib/codemirror.css";

import App from "./App";
import router from "./router";
import store from "./store";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(TreeView);

// Vue.use(Vue => {
//   Vue.mixin({
//     created() {
//       const vm = this;
//       const use = vm.$options.$use;
//       if (use) {
//         _.$use(use);
//       }
//     }
//   });
// });

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
