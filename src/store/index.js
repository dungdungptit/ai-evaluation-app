import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import problemReducer from "./reducers/problemSlice";
import groupReducer from "./reducers/groupSlice";
import subgroupReducer from "./reducers/subgroupSlice";
import userReducer from "./reducers/userSlice";
import submissionReducer from "./reducers/submissionSlice";
import hubReducer from "./reducers/hubSlice";
import adminReducer from "./reducers/adminSlice";
import datasetReducer from "./reducers/datasetSlice";

// store
const store = configureStore({
    reducer: {
        authReducer,
        problemReducer,
        groupReducer,
        subgroupReducer,
        userReducer,
        adminReducer,
        submissionReducer,
        hubReducer,
        datasetReducer
    }
})

export default store;