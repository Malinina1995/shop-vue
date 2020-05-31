export default {
    SET_PRODUCTS_TO_STATE(state, products) {
        state.products = products;
    },
    SET_CART(state, product) {
        let isExists = false;
        if (state.cart.length) {
            state.cart.map(item => {
                if (item.article === product.article) {
                    isExists = true;
                    item.quantity++;
                }
            });
            if (!isExists) {
                state.cart.push(product);
            }
        } else {
            state.cart.push(product);
        }
    },
    REMOVE_FROM_CART(state, index) {
        state.cart.splice(index, 1);
    },
    INCREMENT(state, index) {
        state.cart[index].quantity++;
    },
    DECREMENT(state, index) {
        if (state.cart[index].quantity > 1) {
            state.cart[index].quantity--;
        }
    },
    SWITCH_MOBILE(state) {
        state.isMobile = true;
        state.isDesktop = false;
    },
    SWITCH_DESKTOP(state) {
        state.isMobile = false;
        state.isDesktop = true;
    },
    SET_SEARCH_VALUE(state, value) {
        state.searchValue = value
    },
}
