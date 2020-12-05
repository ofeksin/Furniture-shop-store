import Vue from 'vue'
import App from './App.vue'
import store from './stores/store'
import Router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueObserveVisibility from 'vue-observe-visibility'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

Vue.use(VueObserveVisibility)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
new Vue({
  render: h => h(App),
  store,
  router: Router,
}).$mount('#app')
