
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXA_API,
});

const richListApi = createApi({
    reducerPath: 'richListApi',
    baseQuery,
    keepUnusedDataFor: 5,
    endpoints: (builder) => ({
        getRichLists: builder.query({
            query: () => 'https://tokenapi.otoplo.com/api/v1/tokens/top?max=10',
            transformResponse: (response, meta) => {
                if (meta.response.headers.get('content-type')?.includes('application/json')) {
                    return response.length > 0 ? response : [];
                } else {
                    throw new Error('Received non-JSON response');
                }
            },
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
