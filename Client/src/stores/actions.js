import CategoryService from "../services/CategoryService"

//Adds a new toast notification 
export const push_notification = ({ commit }, notification) => {
    commit('push_notification', notification);
}

// Removes toast notification 
export const removeNotification = ({ commit }, notification) => {
    commit('remove_notification', notification);
}

// Eexcutes an Api request to fetch all store categories
export const loadCategoryIds = ({ commit }) => {
    return new Promise((resolve, reject) => {
        CategoryService.getAll().then((res) => {
            let categoryIds = res.data.map((category) => category.id);
            commit("loadCategoryIds", categoryIds)
            resolve(res);
        }).catch(err => {
            commit("failedLoadingHomePage")
            reject(err)
        })
    })
}

// Loads categories 
export const loadCategoriesProducts = ({ commit, state }) => {
    return new Promise((resolve) => {
        let nextCategories = state.categoryIds.splice(-2);// Loads only 2 categories every call

        nextCategories.forEach((categoryId) => {
            // Executes an API call to fetch products per category id
            CategoryService.getProductsByPage(categoryId).then((res) => {
                // Adds the category to the categories array
                commit("setCategoryProducts", { ...res.data })

                // Checks if the categories are loaded for the first time
                commit("finishedLoadingFirstTime")

            }).catch(err => {
                commit("failedLoadingHomePage")

                resolve(err)
            })
        })

        // If the array is empty. Set the finished flag to true
        if (!state.categoryIds.length) {
            commit("finished")
        }
        resolve()
    })
}