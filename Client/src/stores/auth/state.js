export default {
    token: '' || localStorage.getItem('token'),
    isLoggedIn: "",
    user: "" || JSON.parse(localStorage.getItem('user'))
}