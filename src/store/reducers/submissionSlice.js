import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addNewSubmission, getAllSubmissions, getSubmissionById, updateSubmission, deleteSubmission, getSubmissionByUserId, getSubmissionByProblemIdAndUserId} from "../../services/submissionApi";

// get all submissions
export const getAllSubmissionsAsync = createAsyncThunk("submission/getAllSubmissions", getAllSubmissions);

// get submission by id
export const getSubmissionByIdAsync = createAsyncThunk("submission/getSubmissionById", getSubmissionById);

// add new submission
export const addNewSubmissionAsync = createAsyncThunk("submission/addNewSubmission", addNewSubmission);

// update submission
export const updateSubmissionAsync = createAsyncThunk("submission/updateSubmission", updateSubmission);

// delete submission
export const deleteSubmissionAsync = createAsyncThunk("submission/deleteSubmission", deleteSubmission);

// get submission by user id
export const getSubmissionByUserIdAsync = createAsyncThunk("submission/getSubmissionByUserId", getSubmissionByUserId);

// get submission by problem id and user id
export const getSubmissionByProblemIdAndUserIdAsync = createAsyncThunk("submission/getSubmissionByProblemIdAndUserId", getSubmissionByProblemIdAndUserId);

const submissionSlice = createSlice({
    name: "submission",
    initialState: {
        submissions: [],
        submissionUser: [],
        submissionProblem: [],
        submission: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        // get submissions
        [getAllSubmissionsAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllSubmissionsAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.submissions = action.payload.data;
        },
        [getAllSubmissionsAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // get submission by id
        [getSubmissionByIdAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getSubmissionByIdAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.submission = action.payload.data;
        },
        [getSubmissionByIdAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // add new submission
        [addNewSubmissionAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addNewSubmissionAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.submissions.push(action.payload.data);
        },
        [addNewSubmissionAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // update submission
        [updateSubmissionAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateSubmissionAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.submission = action.payload.data;
        },
        [updateSubmissionAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // delete submission
        [deleteSubmissionAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteSubmissionAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.submission = null;
        },
        [deleteSubmissionAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // get submission by user id
        [getSubmissionByUserIdAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getSubmissionByUserIdAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.submissionUser = action.payload.data;
        },
        [getSubmissionByUserIdAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // get submission by problem id and user id
        [getSubmissionByProblemIdAndUserIdAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getSubmissionByProblemIdAndUserIdAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.submissionProblem = action.payload.data;
        },
        [getSubmissionByProblemIdAndUserIdAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },
    }
});


const submissionReducer = submissionSlice.reducer;
export const submissionsSelector = (state) => state.submissionReducer.submissions;
export const submissionSelector = (state) => state.submissionReducer.submission;
export const submissionUserSelector = (state) => state.submissionReducer.submissionUser;
export const submissionProblemSelector = (state) => state.submissionReducer.submissionProblem;

export default submissionReducer;

