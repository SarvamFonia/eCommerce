import { SERVER_URL } from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    searchResults: []
}

export const getSearchResults = createAsyncThunk('/order/getSearchResults', async (keyword) => {
    const response = await axios.get(`${SERVER_URL}/shop/search/${keyword}`)
    return response?.data
})

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getSearchResults.pending, (state) => {
            state.isLoading = true
        }).addCase(getSearchResults.fulfilled, (state,action) => {
            state.isLoading = false
            state.searchResults = action.payload.data
        }).addCase(getSearchResults.rejected, (state) => {
            state.isLoading = false
            state.searchResults = []
        })
    }
})

export default searchSlice.reducer