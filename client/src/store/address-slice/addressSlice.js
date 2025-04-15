import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  axios  from "axios";

const initialState = {
    isLoading: false,
    addressList: []
}

const addAddress = createAsyncThunk('/address/addAddress',async(formData) => {
    const response = await axios.post('http://localhost:5000/api/shop/address/add',formData)
    return response?.data
})

const fetchAddress = createAsyncThunk('/address/fetchAddress',async(userId) => {
    const response = await axios.get(`http://localhost:5000/api/shop/address/get/${userId}`)
    return response?.data
})
const deleteAddress = createAsyncThunk('/address/addAddress',async({userId, addressId}) => {
    const response = await axios.delete(`http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`)
    return response?.data
})
const updateAddress = createAsyncThunk('/address/updateAddress',async({userId, addressId, formData}) => {
    const response = await axios.put(`http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,formData)
    return response?.data
})

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addAddress.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(addAddress.fulfilled, (state,action)=> {
            state.isLoading = false;
            // state.addressList = action.payload.data
        })
        .addCase(addAddress.rejected, (state)=> {
            state.isLoading = false;
            state.addressList = []
        })
        .addCase(fetchAddress.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(fetchAddress.fulfilled, (state,action)=> {
            state.isLoading = false;
            state.addressList = action.payload.data
        })
        .addCase(fetchAddress.rejected, (state)=> {
            state.isLoading = false;
            state.addressList = []
        })
    }

})
export {addAddress, fetchAddress, deleteAddress, updateAddress}
export default addressSlice.reducer
