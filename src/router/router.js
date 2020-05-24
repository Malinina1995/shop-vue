import Vue from 'vue'
import VueRouter from 'vue-router'
import catalog from "../components/catalog/catalog";
import cart from "../components/cart/cart";

Vue.use(VueRouter)

const routes = [
    { path: '/', component: catalog, name: 'catalog'  },
    { path: '/cart', component: cart, name: 'cart', props: true }
]

export const router = new VueRouter({
    mode: 'history',
    routes
})
