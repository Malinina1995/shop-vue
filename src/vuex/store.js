import Vue from 'vue';
import Vuex from 'vuex';
import actionsCommon from "./actions/actions";
import apiRequests from './actions/api-requests';
import mutations from "./mutations/mutations";
import getters from "./getters/getters";

Vue.use(Vuex)

const actions = {...actionsCommon, ...apiRequests};

export const store = new Vuex.Store({
    state: {
        products: [],
        cart: []
    },
    mutations,
    actions,
    getters,
})
