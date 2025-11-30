import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchOrderByIdApi, fetchOrdersApi} from "../service/ordersService";


export const fetchOrders = createAsyncThunk(
    'orders/fetchAll',
    async (_, thunkAPI) => {
        try {
            const orders = await fetchOrdersApi();
            return orders;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchOrderById = createAsyncThunk(
    'orders/fetchById',
    async (id, thunkAPI) => {
        try {
            const order = await fetchOrderByIdApi(id);
            return order;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        items: [],
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload || [];
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

    }
});

export default orderSlice.reducer;
