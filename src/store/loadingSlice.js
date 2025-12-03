import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'globalLoading',
    initialState: {
        loadingRequestCount: 0,
    },
    reducers: {
        manualStartLoading: (state) => {
            state.loadingRequestCount += 1;
        },
        manualStopLoading: (state) => {
            state.loadingRequestCount -= 1;
        },
    },
    extraReducers: (builder) => {
        builder

            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loadingRequestCount += 1;
                }
            )

            .addMatcher(
                (action) =>
                    action.type.endsWith('/fulfilled') ||
                    action.type.endsWith('/rejected'),
                (state) => {

                    if (state.loadingRequestCount > 0) {
                        state.loadingRequestCount -= 1;
                    }
                }
            );
    },
});


export const selectIsGlobalLoading = (state) => state.globalLoading.loadingRequestCount > 0;

export default loadingSlice.reducer;
