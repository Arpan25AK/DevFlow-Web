import { configureStore } from '@reduxjs/toolkit'
import pinnedReducer from './pinnedSlice'

export const store = configureStore({
    reducer: {
        pinned: pinnedReducer
    }
})

// Persist to localStorage whenever the pinned slice changes
store.subscribe(() => {
    localStorage.setItem('pinned', JSON.stringify(store.getState().pinned))
})