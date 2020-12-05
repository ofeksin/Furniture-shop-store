import Api from '@/services/Api'


export default {
    get(productId) {
        return Api().get(`products/${productId}`);
    },
    getAll() {
        return Api().get(`/products`);
    }
}