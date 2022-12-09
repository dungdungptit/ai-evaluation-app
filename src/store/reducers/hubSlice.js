import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findServer, handleEvaluate } from '../../services/hubApi';

export const findServerAsync = createAsyncThunk( 'hub/findServer', findServer)

export const handleEvaluateAsync = createAsyncThunk( 'hub/handleEvaluate', handleEvaluate)

const hubSlice = createSlice({
    name: 'hub',
    initialState: {
        username: "",
        token: "",
        isLoading: false,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: {
        [findServerAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.username = action.payload.data.username;
            state.token = action.payload.data.token;
            state.isLoading = true;
        },
        [handleEvaluateAsync.fulfilled]: (state, action) => {
            state.isLoading = true;
        },
    }
})

const hubReducer = hubSlice.reducer;

export const { setUsername, setToken } = hubSlice.actions;
export const hubSelector = state => state.hubReducer;

export default hubReducer;

