import { useDispatch, useSelector } from 'react-redux'
import { configureStore, createSelector } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'
import {
	IncomingOrdersFromAPI,
	ActiveOrdersFromAPI,
	IncomingOrders,
	ActiveOrders,
	transformOrdersFromAPIToIncoming,
	transformOrdersFromAPIToActive,
	toggleOrderInIncomingOrders,
	toggleOrderInActiveOrders,
	StatusEnum,
} from '@/entities/order'
import { apiBaseQuery } from './baseQuery'

const ROUTES = {
	incomingOrders: 'orders?Status=0',
	activeOrders: 'orders?Status=1',
	completedOrders: 'orders?Status=2',
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: apiBaseQuery(),
	tagTypes: ['Orders'],
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
		toggleOrder: builder.mutation<void, { status: StatusEnum; id: number }>({
			queryFn: async () => {
				return { data: undefined }
			},
			async onQueryStarted({ status, id }, { dispatch, queryFulfilled }) {
				let action
				if (status == StatusEnum.incoming) {
					action = apiSlice.util.updateQueryData('getIncomingOrders', undefined, (incomingOrders) =>
						toggleOrderInIncomingOrders(id, incomingOrders),
					)
				} else {
					action = apiSlice.util.updateQueryData('getActiveOrders', undefined, (activeOrders) =>
						toggleOrderInActiveOrders(id, activeOrders),
					)
				}
				const patchResult = dispatch(action)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
		}),
	}),
})

export const { useGetIncomingOrdersQuery, useGetActiveOrdersQuery, useToggleOrderMutation } = apiSlice

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
