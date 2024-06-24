import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const { persistReducer } = require('redux-persist');
const storage = require('redux-persist/lib/storage').default;

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXA_API,
});

const richListApi = createApi({
    reducerPath: 'richListApi',
    baseQuery,
    endpoints: (builder) => ({
        getRichLists: builder.query({
            query: () => 'tokens/top?max=20',
        }),
    }),
});

const richListPersistConfig = {
    key: 'richListApi',
    storage,
};

export const persistedRichListApiReducer = persistReducer(
    richListPersistConfig,
    richListApi.reducer
);

export const { useGetRichListsQuery } = richListApi;
export const richListApiMiddleware = richListApi.middleware;
