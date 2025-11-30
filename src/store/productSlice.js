import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchProductByIdApi, fetchProductsApi} from "../service/productService";


export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async (_, thunkAPI) => {
        try {
            const products = await fetchProductsApi();
            return products;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchById',
    async (id, thunkAPI) => {
        try {
            const product = await fetchProductByIdApi(id);
            return product;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.map((product) => ({
                    ...product,
                    isActive: product.isActive ?? true
                }));

            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.selectedStatus = 'loading';
                state.selectedProduct = null;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.selectedStatus = 'succeeded';
                state.selectedProduct = {
                    ...action.payload,
                    isActive: action.payload.isActive ?? true
                };
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.selectedStatus = 'failed';
                state.error = action.payload;
            })


    }
});

export default productSlice.reducer;
