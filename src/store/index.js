import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import problemReducer from "./reducers/problemSlice";
import groupReducer from "./reducers/groupSlice";
import subgroupReducer from "./reducers/subgroupSlice";
import userReducer from "./reducers/userSlice";

// store
const store = configureStore({
    reducer: {
        authReducer,
        problemReducer,
        groupReducer,
        subgroupReducer,
        userReducer,
    }
})

export default store;