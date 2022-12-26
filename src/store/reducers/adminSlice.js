import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin } from "../../services/adminApi";

// get all admins
export const getAllAdminsAsync = createAsyncThunk("admin/getAllAdmins", getAllAdmins);

// get admin by id
export const getAdminByIdAsync = createAsyncThunk("admin/getAdminById", getAdminById);

// add new admin
export const addNewAdminAsync = createAsyncThunk("admin/addNewAdmin", addNewAdmin);

// update admin
export const updateAdminAsync = createAsyncThunk("admin/updateAdmin", updateAdmin);

// delete admin
export const deleteAdminAsync = createAsyncThunk("admin/deleteAdmin", deleteAdmin);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        admins: [],
        admin: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        // get admins
        [getAllAdminsAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllAdminsAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.admins = action.payload.data;
        },
        [getAllAdminsAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // get admin by id
        [getAdminByIdAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAdminByIdAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.admin = action.payload.data;
        },
        [getAdminByIdAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // add new admin
        [addNewAdminAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addNewAdminAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.admins.push(action.payload.data);
        },
        [addNewAdminAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // update admin
        [updateAdminAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateAdminAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.admin = action.payload.data;
        },
        [updateAdminAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // delete admin
        [deleteAdminAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteAdminAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.admins = state.admins.filter((admin) => admin.id !== action.payload.data.id);
        },
        [deleteAdminAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        }
    }
});

const adminReducer = adminSlice.reducer;

export const adminSelector = (state) => state.adminReducer.admin;
export const adminsSelector = (state) => state.adminReducer.admins;

export default adminReducer;





