import { configureStore } from '@reduxjs/toolkit'
import pinnedReducer from './pinnedSlice'
import reposReducer from './repoSlice'

export const store = configureStore({
    reducer: {
        pinned: pinnedReducer,
        repos: reposReducer
    }
})

// Persist to localStorage whenever the pinned slice changes
store.subscribe(() => {
    localStorage.setItem('pinned', JSON.stringify(store.getState().pinned))
})