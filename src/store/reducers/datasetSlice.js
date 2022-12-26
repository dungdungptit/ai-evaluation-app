import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatasets, getDataset, postDataset, deleteDataset, postDatasetSample, deleteDatasetSample } from "../../services/datasetApi";

export const getAllDatasetsAsync = createAsyncThunk("dataset/getDatasets", getDatasets);

export const getDatasetAsync = createAsyncThunk("dataset/getDataset", getDataset);

export const addNewDatasetAsync = createAsyncThunk("dataset/addNewDataset", postDataset);

export const deleteDatasetAsync = createAsyncThunk("dataset/deleteDataset", deleteDataset);

export const addNewDatasetSampleAsync = createAsyncThunk("dataset/addNewDatasetSample", postDatasetSample);

export const deleteDatasetSampleAsync = createAsyncThunk("dataset/deleteDatasetSample", deleteDatasetSample);

const datasetSlice = createSlice({
    name: "dataset",
    initialState: {
        datasets: [],
        dataset: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        // getAllDatasetsAsync
        [getAllDatasetsAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllDatasetsAsync.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.datasets = action.payload.data;
        },
        [getAllDatasetsAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // getDatasetAsync
        [getDatasetAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getDatasetAsync.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.dataset = action.payload.data;
        },
        [getDatasetAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // addNewDatasetAsync
        [addNewDatasetAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addNewDatasetAsync.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.dataset = action.payload.data;
        },
        [addNewDatasetAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // deleteDatasetAsync
        [deleteDatasetAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteDatasetAsync.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.dataset = action.payload.data;
        },
        [deleteDatasetAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },


        // addNewDatasetSampleAsync
        [addNewDatasetSampleAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addNewDatasetSampleAsync.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.dataset = action.payload.data;
        },
        [addNewDatasetSampleAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },

        // deleteDatasetSampleAsync
        [deleteDatasetSampleAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteDatasetSampleAsync.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.dataset = action.payload.data;
        },
        [deleteDatasetSampleAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.resMessage;
        },
    },
});

const datasetReducer = datasetSlice.reducer;
export const datasetsSelector = (state) => state.datasetReducer.datasets;
export const datasetSelector = (state) => state.datasetReducer.dataset;

export default datasetReducer;

