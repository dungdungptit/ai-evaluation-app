import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewGroup, deleteGroup, getAllGroups, getGroupById, updateGroup } from "../../services/groupApi";

// get all groups
export const getAllGroupsAsync = createAsyncThunk("group/getAllGroups", getAllGroups);

// get group by id
export const getGroupByIdAsync = createAsyncThunk("group/getGroupById", getGroupById);

// add new group
export const addNewGroupAsync = createAsyncThunk("group/addNewGroup", addNewGroup);

// update group
export const updateGroupAsync = createAsyncThunk("group/updateGroup", updateGroup);

// delete group
export const deleteGroupAsync = createAsyncThunk("group/deleteGroup", deleteGroup);

const groupSlice = createSlice({
    name: "group",
    initialState: {
        groups: [],
        group: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        // get groups
        [getAllGroupsAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllGroupsAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.groups = action.payload.data;
        },
        [getAllGroupsAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // get group by id
        [getGroupByIdAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getGroupByIdAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.group = action.payload.data;
        },
        [getGroupByIdAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // add new group
        [addNewGroupAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addNewGroupAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
        },
        [addNewGroupAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // update group
        [updateGroupAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateGroupAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
        },
        [updateGroupAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // delete group
        [deleteGroupAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteGroupAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
        },
        [deleteGroupAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        }
    },
});

const groupReducer = groupSlice.reducer;

export const groupsSelector = state => state.groupReducer.groups;
export const groupSelector = state => state.groupReducer.group;

export default groupReducer;

