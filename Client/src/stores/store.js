import Vue from 'vue'
import Vuex from 'vuex'
import Cart from "./cart/index"
import Auth from "./auth/index"


import state from "./state";
import * as getters from './getters';
import * as mutations from "./mutations";
import * as actions from "./actions";
//import axios from 'axios'


Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        Cart,
        Auth
    }
})

