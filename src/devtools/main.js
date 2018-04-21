import Vue from "vue";
import axios from "axios";
import TreeView from "vue-json-tree-view";
import UUID from "vue-uuid";
import VueCodemirror from "vue-codemirror";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "../main/devtools";

import App from "./App";
import router from "./router";
import store from "./store";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(TreeView);
Vue.use(VueCodemirror);
Vue.use(UUID);

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
