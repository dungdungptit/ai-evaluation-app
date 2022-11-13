import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register, login } from '../services/authApi';

const initialState = {
    user: null,
};

export const registerAsync = createAsyncThunk('auth/register', register);
export const loginAsync = createAsyncThunk('auth/login', login);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: {
        // register
        [registerAsync.pending] : (state, action) => { // pending
            console.log("pending")
        },
        [registerAsync.fulfilled] : (state, action) => { // fulfilled = success
            console.log("fulfilled")
            state.user = action.payload
        },
        [registerAsync.rejected] : (state, action) => { // rejected = error
            console.log("rejected")
        },

        // login
        [loginAsync.pending] : (state, action) => { // pending
            console.log("pending")
        },
        [loginAsync.fulfilled] : (state, action) => { // fulfilled = success
            console.log("fulfilled")
            state.user = action.payload
        },
        [loginAsync.rejected] : (state, action) => { // rejected = error
            console.log("rejected")
        },
    }
});

export const { logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

const authReducer = authSlice.reducer;
export default authReducer;