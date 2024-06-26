import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const { persistReducer } = require('redux-persist');
const storage = require('redux-persist/lib/storage').default;

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXA_API,
});

export const richListApi = createApi({
    reducerPath: 'richListApi',
    baseQuery,
    keepUnusedDataFor: 5,
    endpoints: (builder) => ({
        getRichLists: builder.query({
            query: () => 'tokens/top?max=20',
            transformResponse: (response ) =>{
                console.log(response);
                if (response.headers.get('content-type')?.includes('application/json')) {
                    return response.length > 0 ? response : [];
                } else {
                    // Handle non-JSON response (like HTML)
                    throw new Error('Received non-JSON response');
                }
            } ,
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
