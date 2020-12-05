import Api from '@/services/Api'

let authPath = '/auth';
export default {
    login(user) {
        return Api().post(authPath + `/login`, user);
    },
    signup(user) {
        return Api().post(authPath + `/signup`, user);
    }
}