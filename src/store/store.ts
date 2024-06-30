import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import aboutReducer from "./aboutSlice";

import newsReducer from "./newsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        about: aboutReducer,
        news: newsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
