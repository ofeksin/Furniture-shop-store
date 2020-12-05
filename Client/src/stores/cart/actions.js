import CartService from "../../services/CartService";

// Loads user cart by fetching an Api request to the server
export const getCartItems = ({ commit }) => {
    commit('loadingCart', true)
    return new Promise((resolve, reject) => {
        CartService.getCartItems().then(res => {
            let cartItemsRes = res.data.data
            commit('setCartItems', cartItemsRes);
            resolve(cartItemsRes)
        }).catch(err => {
            reject(err)
        })
    })
}

// Removes cart item from the cart
export const removeCartItem = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        CartService.removeCartItem(id).then(() => {
            commit('removeCartItem', id);
            resolve()
        }).catch(err => {
            reject(err)
        })
    })
}

// Clears all cart items 
export const resetCart = ({ commit }) => {
    commit("resetCart");
}

// Creates and updates cart item
export const updateCartItem = ({ commit, state, dispatch }, cartItem) => {
    const item = state.cartItems.find(currentCartItem => {
        return currentCartItem.product_id === cartItem.product_id
    });
    let req;
    if (item) {
        if (cartItem.isAddToCart) {
            req = {
                ...cartItem,
                quantity: ++item.quantity
            }
        } else {
            req = {
                ...cartItem,
            }
        }
    } else {
        req = {
            ...cartItem,
        }
    }

    return new Promise((resolve, reject) => {

        CartService.updateCartItem(req).then((res) => {
            commit('updateCartItem', res.data.data)
            dispatch('push_notification', {
                type: 'success',
                link: "/cart",
                message: 'Product successfully added to your shopping cart!'
            })
            resolve()
        }).catch(err => {
            dispatch('push_notification', {
                type: 'error',
                message: 'Failed to add product. Please try again later.'
            })
            reject(err)
        })
    })

}


