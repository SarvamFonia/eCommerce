import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProduct = createAsyncThunk('/products/addNewProduct', async (formData) => {
    const response = await axios.post('http://localhost:5000/api/admin/products/add', formData, {
        headers: {
            'Content-Type' : 'application/json'
        }
        // withCredentials: true
    });
    return response?.data;
})

export const fetchAllProduct = createAsyncThunk('/products/fetchAllproducts', async () => {
    const response = await axios.get('http://localhost:5000/api/admin/products/get',  {
        headers: {
            'Content-Type' : 'application/json'
        }
        // withCredentials: true
    });
    return response?.data;
})

export const editProduct = createAsyncThunk('/products/editProduct', async ({id,formData}) => {
    const response = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, formData, {
        headers: {
            'Content-Type' : 'application/json'
        }
        // withCredentials: true
    });
    return response?.data;
})

export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id) => { 
    // debugger;
    const response = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
    return response?.data;
})

const AdminProductSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProduct.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllProduct.fulfilled, (state,action) => {
            state.isLoading = false;
            state.productList = action.payload.data;
        })
        .addCase(fetchAllProduct.rejected, (state,action) => {
            state.isLoading = false;
            state.productList = [];
            
        })
    }
})


export default AdminProductSlice.reducer;