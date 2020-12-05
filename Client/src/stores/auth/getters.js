export const isLoggedIn = state => state.isLoggedIn || (localStorage.getItem('token'));
export const getUser = state => {
    return state.user;

}
