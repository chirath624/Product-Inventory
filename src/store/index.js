import productReducer from './productSlice';
import orderReducer from './orderSlice';
import {configureStore} from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        products: productReducer,
        orders: orderReducer,
    }
});

