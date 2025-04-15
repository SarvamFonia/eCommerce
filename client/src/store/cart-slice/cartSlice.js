import { SERVER_URL } from "@/config/config";
import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    cartItems: []
};

export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productId, quantity }) => {
    const response = await axios.post(`${SERVER_URL}/shop/cart/add`, { userId, productId, quantity })
    return response.data
});

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async ( userId ) => {
    const response = await axios.get(`${SERVER_URL}/shop/cart/get/${userId}`)
    return response.data
});

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({ userId, productId }) => {
    const response = await axios.delete(`${SERVER_URL}/shop/cart/delete/${userId}/${productId}`)
    return response.data
});

export const updateCartQty = createAsyncThunk('cart/updateCartQty', async ({ userId, productId, quantity }) => {
    const response = await axios.put(`${SERVER_URL}/shop/cart/update-cart`, { userId, productId, quantity })
    return response.data
});

const cartSile = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addToCart.fulfilled, (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data
        })
        .addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = []
        })
        .addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchCartItems.fulfilled, (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data
        })
        .addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = []
        })
        .addCase(updateCartQty.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateCartQty.fulfilled, (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data
        })
        .addCase(updateCartQty.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = []
        })
        .addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteCartItem.fulfilled, (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data
        })
        .addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = []
        })
    }

});


export default cartSile.reducer;
