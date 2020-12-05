import axios from 'axios'


export default () => {
    const options = {
        baseURL: process.env.VUE_APP_APIURL,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    const instance = axios.create(options)

    // Adds token to every http requrest
    instance.interceptors.request.use(config => {
        const token = localStorage.getItem('token'); // TODO: ADD IF STATEMENT FOR $state.token
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    })

    //instance.interceptors.response.use(function (response) {
    //  return response
    // }, function (error) {
    //console.log(error.response.data)
    // if (error.response.data.error.statusCode === 401) {
    //    this.$store.dispatch('logout')
    //    this.$router.push('/login')
    // }
    // return Promise.reject(error)
    //})

    return instance
}