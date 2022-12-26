import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register, login } from '../../services/authApi';

export const registerAsync = createAsyncThunk('auth/register', register);
export const loginAsync = createAsyncThunk('auth/login', login);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        isAuth: false,
        isLoading: false,
        error: null,
    },
    reducers: {
        // logout
        logout: (state, action) => {
            state.user = null;
            state.token = null;
            state.isAuth = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            sessionStorage.removeItem('usernamehub');
            sessionStorage.removeItem('tokenhub');
        },
    },
    extraReducers: {
        // login
        [loginAsync.pending]: (state, action) => {
            console.log('pending');
            state.isLoading = true;
        },
        [loginAsync.fulfilled]: (state, action) => {
            console.log('success');
            console.log(action.payload);
            state.isLoading = false;
            const user = action.payload.data;
            const { accessToken } = action.payload.data;
            state.user = user;
            state.token = accessToken;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(accessToken));
            state.isAuth = true;
        },
        [loginAsync.rejected]: (state, action) => {
            console.log('error');
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // register
        [registerAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [registerAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.isLoading = false;
            const user = action.payload.data;
            const { accessToken } = action.payload.data;
            state.user = user;
            state.token = accessToken;
            state.isAuth = true;
        },
        [registerAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        }
    },
})

const authReducer = authSlice.reducer

export const { logout } = authSlice.actions

export const authSelector = (state) => state.authReducer;

export default authReducer;