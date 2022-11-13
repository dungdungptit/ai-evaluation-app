import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";

// store
const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})

export default store;