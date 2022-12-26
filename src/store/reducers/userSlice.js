import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewUser, getAllUsers, getUserById, updateUser, deleteUser } from "../../services/userApi";

// get all users
export const getAllUsersAsync = createAsyncThunk("user/getAllUsers", getAllUsers);

// get user by id
export const getUserByIdAsync = createAsyncThunk("user/getUserById", getUserById);

// add new user
export const addNewUserAsync = createAsyncThunk("user/addNewUser", addNewUser);

// update user
export const updateUserAsync = createAsyncThunk("user/updateUser", updateUser);

// delete user
export const deleteUserAsync = createAsyncThunk("user/deleteUser", deleteUser);

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        // get users
        [getAllUsersAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllUsersAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.users = action.payload.data;
        },
        [getAllUsersAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // get user by id
        [getUserByIdAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getUserByIdAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.user = action.payload.data;
        },
        [getUserByIdAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // add new user
        [addNewUserAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addNewUserAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.users.push(action.payload.data);
        },
        [addNewUserAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // update user
        [updateUserAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateUserAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.user = action.payload.data;
        },
        [updateUserAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // delete user
        [deleteUserAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteUserAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.users = state.users.filter((user) => user.id !== action.payload.data.id);
        },
        [deleteUserAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        }
    }
});

const userReducer = userSlice.reducer;

export const userSelector = (state) => state.userReducer.user;
export const usersSelector = (state) => state.userReducer.users;

export default userReducer;





