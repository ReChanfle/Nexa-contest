import { configureStore} from '@reduxjs/toolkit';
import { persistedRichListApiReducer, richListApiMiddleware } from './features/getRichListQuery';
import { persistStore } from 'redux-persist';



export const store = configureStore({
    reducer: {
        richListApi:  persistedRichListApiReducer,
        //totalTxCountApi: persistedTotalTxCountApiReducer,
        //api: persistedApiReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(richListApiMiddleware),
});

export const persistor = persistStore(store);
