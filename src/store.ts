import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiSlice } from "./reducers/apiSlice";
import appReducer from "./reducers/appSlice";
import adminReducer from "./reducers/adminSlice";
import qrReducer from "./reducers/qrSlice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        admin: adminReducer,
        qr: qrReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
