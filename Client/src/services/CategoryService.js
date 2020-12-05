import Api from '@/services/Api'


export default {
    getProducts(categoryId) {
        return Api().get(`/category/${categoryId}`);
    },
    getProductsByPage(categoryId) {
        return Api().get(`/category/${categoryId}/products?page=1`);
    },
    getAll() {
        return Api().get(`/category`);
    }
}