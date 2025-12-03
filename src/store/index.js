import productReducer from './productSlice';
import orderReducer from './orderSlice';
import {configureStore} from "@reduxjs/toolkit";
import loadingReducer from './loadingSlice';
export const store = configureStore({
    reducer: {
        products: productReducer,
        orders: orderReducer,
        globalLoading: loadingReducer,
    }
});

