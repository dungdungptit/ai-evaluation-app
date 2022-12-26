import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewProblem, deleteProblem, getAllProblems, getProblemById, updateProblem, getAllProblemsFree } from "../../services/problemApi";

// get all problems
export const getAllProblemsAsync = createAsyncThunk("problem/getAllProblems", getAllProblems);

// get problem by id
export const getProblemByIdAsync = createAsyncThunk("problem/getProblemById", getProblemById);

// add new problem
export const addNewProblemAsync = createAsyncThunk("problem/addNewProblem", addNewProblem);

// update problem
export const updateProblemAsync = createAsyncThunk("problem/updateProblem", updateProblem);

// delete problem
export const deleteProblemAsync = createAsyncThunk("problem/deleteProblem", deleteProblem);

// get all problems free
export const getAllProblemsFreeAsync = createAsyncThunk("problem/getAllProblemsFree", getAllProblemsFree);

const problemSlice = createSlice({
    name: "problem",
    initialState: {
        problems: [],
        problem: null,
        problemfree: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        // get problems
        [getAllProblemsAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllProblemsAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.problems = action.payload.data;
        },
        [getAllProblemsAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // get problem by id
        [getProblemByIdAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getProblemByIdAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.problem = action.payload.data;
        },
        [getProblemByIdAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },  
        
        // add new problem
        [addNewProblemAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addNewProblemAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.problem = action.payload.data;
        },
        [addNewProblemAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // update problem
        [updateProblemAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateProblemAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.problem = action.payload.data;
        },
        [updateProblemAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // delete problem
        [deleteProblemAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteProblemAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.problem = action.payload.data;
        },
        [deleteProblemAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // get all problems free
        [getAllProblemsFreeAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllProblemsFreeAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.problemfree = action.payload.data;
        },
        [getAllProblemsFreeAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },
    }
});


const problemReducer = problemSlice.reducer;
export const problemsSelector = (state) => state.problemReducer.problems;
export const problemSelector = (state) => state.problemReducer.problem;
export const problemfreeSelector = (state) => state.problemReducer.problemfree;

export default problemReducer;