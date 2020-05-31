<template>
    <div class="catalog">
        <notification
            :messages="messages"
        />
        <router-link :to="{ name: 'cart', params: { cart_data:CART }}">
            <div class="catalog__link_to_cart">Cart: {{CART.length}}</div>
        </router-link>
        <h1>Catalog</h1>
        <div class="filters">
            <v-select
                    :selected="selected"
                    :options="categories"
                    :is-expanded="false"
                    @select="sortByCategories"
            />
            <div class="range-slider">
                <input
                        type="range" min="0"
                        max="10000" step="10"
                        v-model.number="minPrice"
                        @change="setRangeSlider"
                >
                <input
                        type="range" min="0"
                        ax="10000" step="10"
                        v-model.number="maxPrice"
                        @change="setRangeSlider"
                >
            </div>
            <div class="range-values">
                <p>Min: {{minPrice}}</p>
                <p>Max: {{maxPrice}}</p>
            </div>
        </div>
        <div class="catalog__list">
            <catalog-item
                    v-for="product in filteredProducts"
                    :key="product.article"
                    :product_data="product"
                    @addToCart="addToCart"
                    @productClick="productClick"
            />
        </div>
    </div>
</template>

<script>
    import catalogItem from './catalog-item';
    import vSelect from "../select";
    import notification from "../notifications/notification";
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "catalog",
        components: {
            catalogItem,
            vSelect,
            notification
        },
        data() {
            return {
                categories: [
                    {name: 'Все', value: 'ALL'},
                    {name: 'Мужские', value: 'м'},
                    {name: 'Женские', value: 'ж'},
                ],
                selected: 'Все',
                sortedProducts: [],
                minPrice: 0,
                maxPrice: 10000,
                messages: []
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'CART',
                'IS_DESKTOP',
                'SEARCH_VALUE'
            ]),
            filteredProducts() {
                if (this.sortedProducts.length) {
                    return this.sortedProducts;
                } else {
                    return this.PRODUCTS
                }
            }
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART'
            ]),
            addToCart(data) {
                this.ADD_TO_CART(data)
                    .then(() => {
                        let time = Date.now().toLocaleString();
                        this.messages.unshift({
                            name: 'Товар добавлен в корзину',
                            icon: 'check_circle',
                            id: time});
                    })
            },
            productClick(article) {
                this.$router.push( {name: 'product', query: { 'product': article }})
            },
            sortByCategories(category) {
                this.sortedProducts = [...this.PRODUCTS];
                this.sortedProducts = this.sortedProducts.filter(item => {
                    return item.price >= this.minPrice && item.price <= this.maxPrice
                })
                if (category) {
                    this.sortedProducts = this.sortedProducts.filter(item => {
                        this.selected = category.name
                        return item.category === category.name
                    })
                }
            },
            setRangeSlider() {
                if (this.maxPrice < this.minPrice) {
                    let temp = this.minPrice;
                    this.minPrice = this.maxPrice;
                    this.maxPrice = temp;
                }
                this.sortByCategories();
            },
            sortedBySearchFilter(value){
                this.sortedProducts = [...this.PRODUCTS];
                if(value){
                    this.sortedProducts = this.sortedProducts.filter(item => {
                        return item.name.toLowerCase().includes(value.toLowerCase())
                    })
                } else {
                    this.sortedProducts = this.PRODUCTS
                }
            }
        },
        watch: {
            SEARCH_VALUE() {
                this.sortedBySearchFilter(this.SEARCH_VALUE)
            }
        },
        mounted() {
            this.GET_PRODUCTS_FROM_API();
            this.sortByCategories();
            this.sortedBySearchFilter(this.SEARCH_VALUE);
        },
    }
</script>

<style lang="scss">
    .catalog {
        &__list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
        }

        &__link_to_cart {
            position: absolute;
            top: 100px;
            right: 10px;
            padding: $padding*2;
            border: 1px solid #aeaeae;
        }
    }

    .filters {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .range-slider {
        width: 200px;
        margin: auto 16px;
        text-align: center;
        position: relative;
    }

    .range-slider svg, .range-slider input[type=range] {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    input[type=range]::-webkit-slider-thumb {
        z-index: 2;
        position: relative;
        top: 2px;
        margin-top: -7px;
    }

</style>
