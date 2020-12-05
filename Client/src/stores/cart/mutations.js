export const setCartItems = (state, cartItems) => {
    state.cartItems = cartItems
    state.loadingCart = false;
}
export const resetCart = (state) => {
    state.cartItems = [];
    state.guestItem = {}
}

export const loadingCart = (state, status) => {
    state.loadingCart = status;
}

export const updateCartItem = (state, cartItem) => {
    const item = state.cartItems.find(currentCartItem => {
        return currentCartItem.product_id === cartItem.product_id
    });
    if (item) {
        item.quantity = cartItem.quantity
    } else {
        state.cartItems.push({
            ...cartItem
        })
    }
}

export const addItemIfNotLoggedIn = (state, cartItem) => {
    state.guestItem = cartItem;
}

export const removeGuestItem = (state) => {
    state.guestItem = {};
}

export const removeCartItem = (state, itemId) => {
    state.cartItems = state.cartItems.filter((itemObj) => itemObj.id != itemId)
}