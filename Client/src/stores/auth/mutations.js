export const auth_success = (state, user, token) => {
    state.token = token
    state.user = Object.assign({}, user);
    state.isLoggedIn = true
}
export const logout = (state) => {
    state.token = null
    state.user = null
    state.isLoggedIn = false
    localStorage.removeItem('token')
    localStorage.removeItem("user");

}