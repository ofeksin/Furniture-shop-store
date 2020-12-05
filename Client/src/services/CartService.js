import Api from '@/services/Api'


export default {
    updateCartItem(cartItem) {
        return Api().post(`/cart/`, cartItem);
    },
    getCartItems() {
        return Api().get(`/cart`);
    },
    removeCartItem(carId) {
        return Api().delete(`/cart/${carId}`);
    }
}