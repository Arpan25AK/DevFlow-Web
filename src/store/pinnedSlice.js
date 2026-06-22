import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('pinned')) || []

export const pinnedSlice = createSlice({
    name: 'pinned',
    initialState,
    reducers: {
        togglePin: (state, action) => {
            const repo = action.payload
            const index = state.findIndex(r => r.id === repo.id)

            if(index !== -1){
                state.splice(index,1)
            }else{
                state.push(repo)
            }
        }
    }
})

export const { togglePin } = pinnedSlice.actions
export default pinnedSlice.reducer