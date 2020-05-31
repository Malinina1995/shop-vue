<template>
    <div class="catalog-item" @click="productClick">
        <popup
                v-if="isInfoPopupVisible"
                @closePopup="hidePopupInfo"
                right-btn-title="Add to cart"
                :pop-up-title="product_data.name"
                @rightBtnAction="addToCart"
        >
            <img class="v-catalog-item__image"
                 :src=" require('../../assets/images/' + product_data.image) "
                 alt="img"
            >
            <div>
                <p class="v-catalog-item__name">{{product_data.name}}</p>
                <p class="v-catalog-item__price">Price: {{product_data.price | toFix | formattedPrice}}</p>
                <p class="v-catalog-item__price">{{product_data.category}}</p>
            </div>
        </popup>
        <img class="catalog-item__image" :src="require('@/assets/images/' + product_data.image)" alt="">
        <p class="catalog-item__name">{{product_data.name}}</p>
        <p class="catalog-item__price">Price: {{product_data.price | toFix | formattedPrice}}</p>
        <button
                class="catalog-item__show-info"
                @click="showPopupInfo"
        >
            Show info
        </button>
        <button
                class="catalog-item__add_to_cart_btn btn"
                @click="addToCart"
        >Add to cart
        </button>
    </div>
</template>

<script>
    import popup from "../popup/popup";
    import toFix from "../../filters/toFix";
    import formattedPrice from "../../filters/price-format";

    export default {
        name: "catalog-item",
        data() {
            return {
                isInfoPopupVisible: false
            }
        },
        components: {
            popup
        },
        filters: {
            toFix,
            formattedPrice
        },
        props: {
            product_data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            addToCart() {
                this.$emit('addToCart', this.product_data);
            },
            showPopupInfo() {
                this.isInfoPopupVisible = true
            },
            hidePopupInfo() {
                this.isInfoPopupVisible = false
            },
            productClick() {
                this.$emit('productClick', this.product_data.article)
            },
        },
        mounted() {
            this.$set(this.product_data, 'quantity', 1)
        }
    }
</script>

<style lang="scss">
    .catalog-item {
        flex-basis: 25%;
        box-shadow: 0 0 8px 0 #e0e0e0;
        padding: $padding * 2;
        margin-bottom: $margin * 2;

        &__image {
            width: 100px;
        }
    }

</style>
