import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXA_API,
});


export const totalTxCountApi = createApi({
    reducerPath: 'totalTxCountApi',
    baseQuery,
    endpoints: (builder) => ({
        getTotalTxCount: builder.query({
            query: () => 'transactions/count',
            transformResponse: (response) => {
                return response.data.length > 0 ? response.data : [];
            },
        }),
    }),
});

// Persist configuration
const totalTxCountPersistConfig = {
    key: 'totalTxCountApi',
    storage,
};

// Apply persistReducer to the API slice reducer
export const persistedTotalTxCountApiReducer = persistReducer(
    totalTxCountPersistConfig,
    totalTxCountApi.reducer
);

// Exports
export const { useGeTotalTxCountsQuery } = totalTxCountApi;
export const totalTxCountApiMiddleware = totalTxCountApi.middleware;


/*




 */