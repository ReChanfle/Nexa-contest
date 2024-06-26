import {useDispatch, useSelector} from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import {persistStore} from "redux-persist";
import {persistedRichListApiReducer, richListApiMiddleware} from "./features/getRichListQuery";
import {persistedTotalTxCountApiReducer, totalTxCountApiMiddleware} from "./features/getTotalTxCountQuery";
import {middleware,persistedApiReducer} from "./features/api";

export const store = configureStore({
    reducer: {
        richListApi:  persistedRichListApiReducer,
        //totalTxCountApi: persistedTotalTxCountApiReducer,
        //api: persistedApiReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            richListApiMiddleware,
           // totalTxCountApiMiddleware,
            //middleware
        ),
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);
