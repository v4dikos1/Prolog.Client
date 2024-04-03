import { useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { IncomingOrders, IncomingOrdersFromAPI } from '@/entities/order/model'
import { transformIncomingOrdersFromAPI } from '@/entities/order'

const BASE_URL = 'https://krsk-prolog.ru/api/admin/'
const ROUTES = {
	incomingOrders: 'orders?Status=0',
	activeOrders: 'orders?Status=1',
	completedOrders: 'orders?Status=2',
}

const apiBaseQuery = (): BaseQueryFn<{ url: string; token: string }, unknown, unknown> => {
	return async ({ url, token }) => {
		try {
			const response = await fetch(BASE_URL + url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			const data = await response.json()

			return {
				data,
			}
		} catch (e) {
			return {
				error: {
					reason: 'Error',
				},
			}
		}
	}
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: apiBaseQuery(),
	endpoints: (builder) => ({
		getIncomingOrders: builder.query<IncomingOrders, string>({
			query: (token) => ({
				url: ROUTES.incomingOrders,
				token,
			}),
			transformResponse: (response: IncomingOrdersFromAPI) => {
				return transformIncomingOrdersFromAPI(response)
			},
		}),
	}),
})

export const { useGetIncomingOrdersQuery } = apiSlice

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector = useSelector
