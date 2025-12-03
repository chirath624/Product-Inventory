import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {fetchProductByIdApi, fetchProductsApi, updateProductApi} from "../service/productService";
const initialFilters = {

    priceRange: [0, 2000]
};

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

export const updateProduct = createAsyncThunk(
    'products/update',
    async ({ id, changes }, thunkAPI) => {
        try {
            const updatedProduct = await updateProductApi({ id, changes });
            return updatedProduct;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        selectedStatus: 'idle',
        updateStatus: 'idle',
        selectedProduct: null,
        error: null,
        filters: initialFilters,

    },
    reducers: {
        setProductFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetProductFilters: (state) => {
            const maxPrice = state.items.length
                ? Math.max(...state.items.map((p) => p.price))
                : 1000;

            state.filters = {
                priceRange: [0, maxPrice]
            };
        },

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
            .addCase(updateProduct.pending, (state) => {
                state.updateStatus = 'loading';
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                state.selectedProduct = {
                    ...action.payload,
                    isActive: action.payload.isActive ?? true
                };
                state.items = state.items.map((product) =>
                    product.id === action.payload.id
                        ? {
                            ...action.payload,
                            isActive:
                                action.payload.isActive ??
                                product.isActive ??
                                (action.payload.stock > 0)
                        }
                        : product
                );
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.payload;
            });


    }
});
export const { setProductFilters, resetProductFilters } = productSlice.actions;
export const selectProductFilters = (state) => state.products.filters;
export default productSlice.reducer;
