<template>
    <div class="cart-item">
        <img class="cart-item__image" :src="require('@/assets/images/' + cart_item_data.image)" alt="">
        <div class="cart_item__info">
            <p>{{cart_item_data.name}}</p>
            <p>{{cart_item_data.price | toFix | formattedPrice}}</p>
            <p>{{cart_item_data.article}}</p>
        </div>
        <div class="cart_item_quantity">
            <p>Qty:</p>
            <span class="quantity__tools">
                <span class="quantity__btn" @click="decrementItem">-</span>
                {{cart_item_data.quantity}}
                <span class="quantity__btn" @click="incrementItem">+</span>
            </span>
        </div>
        <button class="btn " @click="deleteItem">Delete</button>
    </div>
</template>

<script>
    import toFix from "../../filters/toFix";
    import formattedPrice from "../../filters/price-format";

    export default {
        name: "cart-item",
        props: {
            cart_item_data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        filters: {
            toFix,
            formattedPrice
        },
        methods: {
            deleteItem() {
                this.$emit('deleteItem')
            },
            decrementItem() {
                this.$emit('decrement')
            },
            incrementItem() {
                this.$emit('increment')
            }
        }
    }
</script>

<style lang="scss">
    .cart-item {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 8px 0 #e0e0e0;
        padding: $padding * 2;
        margin-bottom: $margin * 2;

        &__image {
            max-width: 50px;
        }
        .quantity__btn {
            cursor: pointer;
        }
        .quantity__tools {
            user-select: none;
        }
    }

</style>
