export const cartItems = (state) => {
    return state.cartItems
};

export const cartTotalPrice = (state) => {
    let total = 0;
    state.cartItems.map((cartItem) => total += cartItem.quantity * cartItem.price);
    return total;
}

export const cartTotalItems = (state) => {
    let total = 0;
    state.cartItems.map((cartItem) => total += cartItem.quantity);
    return total;
}

export const getGuestItem = (state) => state.guestItem;
export const isLoadingCart = (state) => state.loadingCart;
export const isCartEmpty = (state) => state.cartItems.length == 0

