import {useDispatch, useSelector} from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import {persistStore} from "redux-persist";
import {persistedRichListApiReducer, richListApiMiddleware} from "./features/getRichListQuery";



export const store = configureStore({
    reducer: {
        richListApi:  persistedRichListApiReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            richListApiMiddleware
        ),
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);
