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
	transformOrdersFromAPIToCompleted,
	toggleOrderInIncomingOrders,
	toggleOrderInActiveOrders,
	toggleOrderInCompletedOrders,
	StatusEnum,
	CompletedOrders,
	CompletedOrdersFromAPI,
} from '@/entities/order'
import { ProductsFromAPI, Product, transformProductsFromAPI } from '@/entities/product'
import { apiBaseQuery } from './baseQuery'

const ROUTES = {
	incomingOrders: 'orders?Status=0',
	activeOrders: 'orders?Status=1',
	completedOrders: 'orders?Status=2',
	products: 'products',
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
		getCompletedOrders: builder.query<CompletedOrders, void>({
			query: () => ({
				url: ROUTES.completedOrders,
			}),
			transformResponse: (response: CompletedOrdersFromAPI) => {
				return transformOrdersFromAPIToCompleted(response)
			},
		}),
		toggleOrder: builder.mutation<void, { status: StatusEnum; id: number }>({
			queryFn: async () => {
				return { data: undefined }
			},
			async onQueryStarted({ status, id }, { dispatch, queryFulfilled }) {
				let action
				if (status === StatusEnum.incoming) {
					action = apiSlice.util.updateQueryData('getIncomingOrders', undefined, (incomingOrders) =>
						toggleOrderInIncomingOrders(id, incomingOrders),
					)
				} else if (status === StatusEnum.active) {
					action = apiSlice.util.updateQueryData('getActiveOrders', undefined, (activeOrders) =>
						toggleOrderInActiveOrders(id, activeOrders),
					)
				} else {
					action = apiSlice.util.updateQueryData('getCompletedOrders', undefined, (completedOrders) =>
						toggleOrderInCompletedOrders(id, completedOrders),
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
		getProducts: builder.query<Product[], void>({
			query: () => ({
				url: ROUTES.products,
			}),
			transformResponse: (response: ProductsFromAPI) => {
				return transformProductsFromAPI(response)
			},
		}),
	}),
})

export const {
	useGetIncomingOrdersQuery,
	useGetActiveOrdersQuery,
	useGetCompletedOrdersQuery,
	useToggleOrderMutation,
} = apiSlice

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
	apiSlice.endpoints.getCompletedOrders.select(),
	(completedOrders) => completedOrders.data?.count,
)

export const isOrdersLoading = createSelector(
	[
		apiSlice.endpoints.getIncomingOrders.select(),
		apiSlice.endpoints.getActiveOrders.select(),
		apiSlice.endpoints.getCompletedOrders.select(),
	],
	(iO, aO, cO) => iO.isLoading || aO.isLoading || cO.isLoading,
)

export const isIncomingOrderSelected = createSelector(apiSlice.endpoints.getIncomingOrders.select(), (incomingOrders) =>
	incomingOrders.data?.items.some((item) => item.orders.some((order) => order.selected)),
)

export const isActiveOrderSelected = createSelector(apiSlice.endpoints.getActiveOrders.select(), (activeOrders) =>
	activeOrders.data?.items.some((item) =>
		item.orders.some((groupByDriver) => groupByDriver.orders.some((order) => order.selected)),
	),
)

export const isCompletedOrderSelected = createSelector(
	apiSlice.endpoints.getCompletedOrders.select(),
	(completedOrders) => completedOrders.data?.items.some((item) => item.orders.some((order) => order.selected)),
)
