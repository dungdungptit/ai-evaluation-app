import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewSubgroup, getAllSubgroups, getSubgroupById, updateSubgroup, deleteSubgroup } from "../../services/subgroupApi";

// get all subgroups
export const getAllSubgroupsAsync = createAsyncThunk("subgroup/getAllSubgroups", getAllSubgroups);

// get subgroup by id
export const getSubgroupByIdAsync = createAsyncThunk("subgroup/getSubgroupById", getSubgroupById);

// add new subgroup
export const addNewSubgroupAsync = createAsyncThunk("subgroup/addNewSubgroup", addNewSubgroup);

// update subgroup
export const updateSubgroupAsync = createAsyncThunk("subgroup/updateSubgroup", updateSubgroup);

// delete subgroup
export const deleteSubgroupAsync = createAsyncThunk("subgroup/deleteSubgroup", deleteSubgroup);

const subgroupSlice = createSlice({
    name: "subgroup",
    initialState: {
        subgroups: [],
        subgroup: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        // get subgroups
        [getAllSubgroupsAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllSubgroupsAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.subgroups = action.payload.data;
        },
        [getAllSubgroupsAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // get subgroup by id
        [getSubgroupByIdAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getSubgroupByIdAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.subgroup = action.payload.data;
        },
        [getSubgroupByIdAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // add new subgroup
        [addNewSubgroupAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addNewSubgroupAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
        },
        [addNewSubgroupAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // update subgroup
        [updateSubgroupAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateSubgroupAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
        },
        [updateSubgroupAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // delete subgroup
        [deleteSubgroupAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteSubgroupAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
        },
        [deleteSubgroupAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },
    },
});

const subgroupReducer = subgroupSlice.reducer;

export const subgroupsSelector = (state) => state.subgroupReducer.subgroups;
export const subgroupSelector = (state) => state.subgroupReducer.subgroup;

export default subgroupReducer;
