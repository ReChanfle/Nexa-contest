import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const { persistReducer } = require('redux-persist');
const storage = require('redux-persist/lib/storage').default;

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXA_API,
});


const api = createApi({
    reducerPath: 'api',
    baseQuery,
    keepUnusedDataFor: 5,
    endpoints: (builder) => ({
        getTop: builder.query({
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
        getTxCount: builder.query({
            query: () => 'transactions/count',
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

const apiPersistConfig = {
    key: 'api',
    storage,
};

export const persistedApiReducer = persistReducer(
    apiPersistConfig,
    api.reducer
);

export const { useGetsQuery } = api;
export const { endpoints, reducerPath, reducer, middleware } = api

