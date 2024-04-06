import { useDispatch, useSelector } from 'react-redux'
import { configureStore, createSelector } from '@reduxjs/toolkit'
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { User } from 'oidc-client-ts'

import {
	IncomingOrdersFromAPI,
	ActiveOrdersFromAPI,
	IncomingOrders,
	ActiveOrders,
	transformOrdersFromAPIToIncoming,
	transformOrdersFromAPIToActive,
} from '@/entities/order'

const BASE_URL = 'https://krsk-prolog.ru/api/admin/'
const ROUTES = {
	incomingOrders: 'orders?Status=0',
	activeOrders: 'orders?Status=1',
	completedOrders: 'orders?Status=2',
}

function getUser() {
	const oidcStorage = localStorage.getItem(
		`oidc.user:https://identity.krsk-prolog.ru/realms/prolog:Prolog.LocalWebClient`,
	)

	if (!oidcStorage) {
		return null
	}

	return User.fromStorageString(oidcStorage)
}

const apiBaseQuery = (): BaseQueryFn<{ url: string }, unknown, unknown> => {
	return async ({ url }) => {
		const user = getUser()
		const token = user?.access_token

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
					reason: e,
				},
			}
		}
	}
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: apiBaseQuery(),
	endpoints: (builder) => ({
		getIncomingOrders: builder.query<IncomingOrders, void>({
			query: () => ({
				url: ROUTES.incomingOrders,
			}),
			transformResponse: (response: IncomingOrdersFromAPI) => {
				return transformOrdersFromAPIToIncoming(response)
			},
		}),
		getActiveOrders: builder.query<ActiveOrders, void>({
			query: () => ({
				url: ROUTES.activeOrders,
			}),
			transformResponse: (response: ActiveOrdersFromAPI) => {
				return transformOrdersFromAPIToActive(response)
			},
		}),
	}),
})

export const { useGetIncomingOrdersQuery, useGetActiveOrdersQuery } = apiSlice

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector = useSelector

export const getIncomingOrdersCount = createSelector(
	apiSlice.endpoints.getIncomingOrders.select(),
	(incomingOrders) => incomingOrders.data?.count,
)

export const getActiveOrdersCount = createSelector(
	apiSlice.endpoints.getActiveOrders.select(),
	(activeOrders) => activeOrders.data?.count,
)

export const getCompletedOrdersCount = createSelector(
	apiSlice.endpoints.getIncomingOrders.select(),
	(completedOrders) => completedOrders.data?.count,
)
