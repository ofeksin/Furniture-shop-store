import AuthService from "../../services/AuthService";

export const login = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        AuthService.login(user).then((res) => {
            const token = res.data.api_token;
            const userData = {
                name: res.data.name,
                last_name: res.data.last_name
            }
            // Store user data in localStorage to save the data even the user refresh the page
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem('token', token) // If the user closes the browser, allow the user to return to the application without login again
            commit('auth_success', userData, token)
            resolve("token" + token)

        }).catch(err => {
            localStorage.removeItem('token')
            reject(err)
        })
    })
}

export const register = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        AuthService.signup(user).then(res => {
            resolve(res)
            commit();
        }).catch(err => {
            reject(err)
        })
    })
}
