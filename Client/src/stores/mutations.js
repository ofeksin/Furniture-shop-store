export const push_notification = (state, notification) => {
    state.notifications.push({
        ...notification,
        id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
    })
}

export const remove_notification = (state, notificationToRemove) => {
    state.notifications = state.notifications.filter((notification) => {
        return notificationToRemove.id !== notification.id
    })
}

export const loadCategoryIds = (state, categoryIds) => state.categoryIds.push(...categoryIds);

export const setCategoryProducts = (state, categoryProducts) => state.categories.push(categoryProducts)

export const finished = (state) => state.finishedLoadCategories = true

export const finishedLoadingFirstTime = (state) => state.isLoadingHomePage = false

export const failedLoadingHomePage = (state) => state.loadingHomePageSucceded = false


