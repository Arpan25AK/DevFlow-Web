import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchRepos = createAsyncThunk('repos/fetch', async () => {
    const email = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:8080/api/repositories/getrepos/${email}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    if(!response.ok) throw new Error('error fetching list')
    return await response.json()
})

const repoSlice = createSlice({
    name : 'fetchRepos',
    initialState : {list : [] , loading: false, error : '' },
    reducers : {},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchRepos.pending, (state) =>{state.loading = true; state.error = ''})
            .addCase(fetchRepos.fulfilled, (state, action) => {state.loading = false; state.list = action.payload})
            .addCase(fetchRepos.rejected, (state) => {state.loading = false; state.error = 'failed to fetch repos'})
    }
})

export default repoSlice.reducer