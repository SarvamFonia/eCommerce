import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isloading: false,
    productList: [],
    productDetails: null
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllproducts', async ({filterParams, sortParams}) => { 
    // debugger;
    const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams
    })
    const response = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`, {
        headers: {
            'Content-Type': 'application/json'
        }
        // withCredentials: true
    });
    return response?.data;
})

export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails', async (id) => { 
    // debugger;
    
    const response = await axios.get(`http://localhost:5000/api/shop/products/get/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
        // withCredentials: true
    });
    return response?.data;
})


const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.productDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending,(state,action) =>{
            state.isloading = true
        })
        .addCase(fetchAllFilteredProducts.fulfilled,(state,action) =>{
            state.isloading = false
            state.productList = action.payload?.data
        })
        .addCase(fetchAllFilteredProducts.rejected,(state,action) =>{
            state.isloading = false
            state.productList = []
        })
        .addCase(fetchProductDetails.pending,(state,action) =>{
            state.isloading = true
        })
        .addCase(fetchProductDetails.fulfilled,(state,action) =>{
            state.isloading = false
            state.productDetails = action.payload?.data
        })
        .addCase(fetchProductDetails.rejected,(state,action) =>{
            state.isloading = false
            state.productDetails = null
        })
    }
})

export const {setProductDetails} = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer