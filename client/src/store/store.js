import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice/authSlice'
import adminProductsSlice from './products-slice/productsSlice'
import shoppingProductSlice from './shopProducts-slice/shopProductSlice'
import shoppingCartSlice from './cart-slice/cartSlice'
import addressSlice from './address-slice/addressSlice'
import shoppingOrderSlice from './order-Slice.js/orderSlice'
import adminOrderSlice from './adminOrders-slice/adminOrderSlice'
import searchSlice from './search-slice/searchSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        adminOrder: adminOrderSlice,
        shopProducts: shoppingProductSlice,
        shoppingCart: shoppingCartSlice,
        address: addressSlice,
        shopOrder: shoppingOrderSlice,
        shopSearch: searchSlice
    }
})

export default store;