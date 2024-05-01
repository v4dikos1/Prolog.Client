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
import { Client, ClientsFromAPI, transformClientsFromAPI } from '@/entities/client'
import { Storage, StoragesFromAPI, transformStoragesFromAPI } from '@/entities/storage'
import { apiBaseQuery } from './baseQuery'

const ROUTES = {
	incomingOrders: 'orders?Status=0',
	activeOrders: 'orders?Status=1',
	completedOrders: 'orders?Status=2',
	products: 'products',
	clients: 'customers',
	storages: 'storages',
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: apiBaseQuery(),
	tagTypes: ['Orders', 'Clients', 'Storages'],
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
		getClients: builder.query<Client[], void>({
			query: () => ({
				url: ROUTES.clients,
			}),
			providesTags: (result) =>
				result
					? [...result.map(({ ID }) => ({ type: 'Clients', ID } as const)), { type: 'Clients', id: 'LIST' }]
					: [{ type: 'Clients', id: 'LIST' }],
			transformResponse: (response: ClientsFromAPI) => {
				return transformClientsFromAPI(response)
			},
		}),
		addClient: builder.mutation<void, { name: string; phone: string }>({
			query: ({ name, phone }) => ({
				url: ROUTES.clients,
				method: 'POST',
				body: {
					name: name,
					phoneNumber: phone,
				},
			}),
			invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
		}),
		changeClient: builder.mutation<void, { id: string; name: string; phone: string }>({
			query: ({ id, name, phone }) => ({
				url: `${ROUTES.clients}/${id}`,
				method: 'PUT',
				body: {
					name,
					phoneNumber: phone,
				},
			}),
			invalidatesTags: (_, __, arg) => [
				{ type: 'Clients', id: arg.id },
				{ type: 'Clients', id: 'LIST' },
			],
		}),
		deleteClients: builder.mutation<void, string[]>({
			query: (ids) => {
				const queryParams = ids.map((id) => 'CustomerIds=' + id).join('&')
				return {
					url: `${ROUTES.clients}?${queryParams}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
		}),
		getStorages: builder.query<Storage[], void>({
			query: () => ({
				url: ROUTES.storages,
			}),
			transformResponse: (response: StoragesFromAPI) => {
				return transformStoragesFromAPI(response)
			},
		}),
		addStorage: builder.mutation<void, { name: string; address: string }>({
			query: ({ name, address }) => ({
				url: ROUTES.storages,
				method: 'POST',
				body: {
					name,
					address,
				},
			}),
			invalidatesTags: [{ type: 'Storages', id: 'LIST' }],
		}),
		changeStorage: builder.mutation<void, { id: string; name: string; address: string }>({
			query: ({ id, name, address }) => ({
				url: `${ROUTES.storages}/${id}`,
				method: 'PUT',
				body: {
					name,
					address,
				},
			}),
			invalidatesTags: (_, __, arg) => [
				{ type: 'Storages', id: arg.id },
				{ type: 'Storages', id: 'LIST' },
			],
		}),
		deleteStorages: builder.mutation<void, string[]>({
			query: (ids) => {
				const queryParams = ids.map((id) => 'StoragesIds=' + id).join('&')
				return {
					url: `${ROUTES.storages}?${queryParams}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: [{ type: 'Storages', id: 'LIST' }],
		}),
	}),
})

export const {
	useGetIncomingOrdersQuery,
	useGetActiveOrdersQuery,
	useGetCompletedOrdersQuery,
	useGetProductsQuery,
	useGetClientsQuery,
	useGetStoragesQuery,
	useToggleOrderMutation,
	useAddClientMutation,
	useChangeClientMutation,
	useDeleteClientsMutation,
	useAddStorageMutation,
	useChangeStorageMutation,
	useDeleteStoragesMutation,
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

export const getClientByID = createSelector([apiSlice.endpoints.getClients.select(), (_, id) => id], (clients, id) => {
	if (!clients.data) return null
	return clients.data.find((client) => client.ID === id)
})
