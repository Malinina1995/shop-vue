import Vue from 'vue'
import VueRouter from 'vue-router'
import catalog from "../components/catalog/catalog";
import cart from "../components/cart/cart";
import mainPage from '../components/pages/main-page';
import productPage from '../components/catalog/product-page'

Vue.use(VueRouter)

const routes = [
    {path: '/', component: mainPage, name: 'mainPage'},
    {path: '/catalog', component: catalog, name: 'catalog'},
    {path: '/product', component: productPage, name: 'product'},
    {path: '/cart', component: cart, name: 'cart', props: true}
]

export const router = new VueRouter({
    mode: 'history',
    routes
})
