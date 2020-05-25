<template>
    <div class="catalog">
        <router-link :to="{ name: 'cart', params: { cart_data:CART }}">
            <div class="catalog__link_to_cart">Cart: {{CART.length}}</div>
        </router-link>
        <h1>Catalog</h1>
        <v-select
            :selected="selected"
            :options="categories"
            @select="sortByCategories"
        />
        <div class="catalog__list">
            <catalog-item
                    v-for="product in filteredProducts"
                    :key="product.article"
                    :product_data="product"
                    @addToCart="addToCart"
            />
        </div>
    </div>
</template>

<script>
    import catalogItem from './catalog-item';
    import vSelect from "../select";
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "catalog",
        components: {
            catalogItem,
            vSelect
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
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'CART'
            ]),
            filteredProducts(){
                if(this.sortedProducts.length){
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
                this.ADD_TO_CART(data);
            },
            sortByCategories(category){
                this.sortedProducts = [];
                this.PRODUCTS.map(item => {
                    if(item.category === category.name){
                        this.sortedProducts.push(item);
                    }
                });
                this.selected = category.name;
            }
        },
        mounted() {
            this.GET_PRODUCTS_FROM_API();
        }
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
            top: 10px;
            right: 10px;
            padding: $padding*2;
            border: 1px solid #aeaeae;
        }
    }

</style>
