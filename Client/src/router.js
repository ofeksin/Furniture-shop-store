import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/auth/login.vue"
import Store from "@/components/Store.vue"
import Product from "@/components/Product.vue"
import Cart from "@/components/cart/cart.vue"
import Register from "@/components/auth/Register.vue"
import NotFound from "@/components/NotFound.vue"


Vue.use(Router)


const router = new Router({
    mode: 'history',

    routes: [
        {
            path: '/',
            name: 'mainpage',
            component: Store,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                disableIfLoggedIn: true
            },
        },
        {
            path: '/register',
            name: 'register',
            meta: {
                disableIfLoggedIn: true
            },
            component: Register,
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/products/:productId',
            name: 'product',
            component: Product,
        },
        {
            path: '/notfound',
            name: 'notfound',
            component: NotFound
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Checks if the token is defined otherwise ridirects to the login component (/login)
        if (localStorage.getItem('token') === null) {
            sessionStorage.setItem('redirectPath', to.path)
            next('/login')
        }
        next()
        return

    } if (to.matched.some(record => record.meta.disableIfLoggedIn)) { // Redirect logged in user from login/register components
        if (localStorage.getItem('token') !== null) {
            next('/')
        }
        next()
    } else if (!to.matched.length) {
        // Page not found, redirect to 404 component
        next('/notfound')
    } else {
        next();
    }
})

export default router;