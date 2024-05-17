import { createSelector } from '@reduxjs/toolkit/react'
import { apiSlice } from '@/shared/store'
import { ActiveOrdersFromAPI, CompletedOrdersFromAPI, IncomingOrdersFromAPI } from './apiModel'
import { ActiveOrders, CompletedOrders, IncomingOrders, StatusEnum } from './model'
import {
	toggleOrderInActiveOrders,
	toggleOrderInCompletedOrders,
	toggleOrderInIncomingOrders,
	transformOrdersFromAPIToActive,
	transformOrdersFromAPIToCompleted,
	transformOrdersFromAPIToIncoming,
	getSelectedOrdersIDs,
} from './helpers'

const ROUTES = {
	orders: 'orders',
	incomingOrders: 'orders?Status=0',
	activeOrders: 'orders?Status=1',
	completedOrders: 'orders?Status=2',
}

interface AddIncomingOrderProps {
	storageID: string
	address: string
	pickUpStart: string
	pickUpEnd: string
	deliveryStart: string
	deliveryEnd: string
	clientID: string
	price: number
	productIDs: { productId: string; count: number }[]
}

const ordersApi = apiSlice.enhanceEndpoints({ addTagTypes: ['Orders'] }).injectEndpoints({
	endpoints: (builder) => ({
		getIncomingOrders: builder.query<IncomingOrders, void>({
			query: () => ({
				url: ROUTES.incomingOrders,
			}),
			providesTags: [
				{ type: 'Orders', id: 'ALL' },
				{ type: 'Orders', id: 'INCOMING' },
			],
			transformResponse: (response: IncomingOrdersFromAPI) => {
				return transformOrdersFromAPIToIncoming(response)
			},
		}),
		getActiveOrders: builder.query<ActiveOrders, void>({
			query: () => ({
				url: ROUTES.activeOrders,
			}),
			providesTags: [
				{ type: 'Orders', id: 'ALL' },
				{ type: 'Orders', id: 'ACTIVE' },
			],
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
		toggleOrder: builder.mutation<void, { status: StatusEnum; ID: number }>({
			queryFn: async () => {
				return { data: undefined }
			},
			async onQueryStarted({ status, ID }, { dispatch, queryFulfilled }) {
				let action
				if (status === StatusEnum.incoming) {
					action = ordersApi.util.updateQueryData('getIncomingOrders', undefined, (incomingOrders) =>
						toggleOrderInIncomingOrders(ID, incomingOrders),
					)
				} else if (status === StatusEnum.active) {
					action = ordersApi.util.updateQueryData('getActiveOrders', undefined, (activeOrders) =>
						toggleOrderInActiveOrders(ID, activeOrders),
					)
				} else {
					action = ordersApi.util.updateQueryData('getCompletedOrders', undefined, (completedOrders) =>
						toggleOrderInCompletedOrders(ID, completedOrders),
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
		addIncomingOrder: builder.mutation<void, AddIncomingOrderProps>({
			query: (props) => ({
				url: ROUTES.orders,
				method: 'POST',
				body: {
					storageId: props.storageID,
					address: props.address,
					pickUpDateFrom: props.pickUpStart,
					pickUpDateTo: props.pickUpEnd,
					deliveryDateFrom: props.deliveryStart,
					deliveryDateTo: props.deliveryEnd,
					customerId: props.clientID,
					price: props.price,
					products: props.productIDs,
				},
			}),
			invalidatesTags: [{ type: 'Orders', id: 'INCOMING' }],
		}),
		deleteOrders: builder.mutation<void, number[]>({
			query: (ids) => {
				const queryParams = ids.map((id) => 'OrderIds=' + id).join('&')
				return {
					url: `${ROUTES.orders}?${queryParams}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: [{ type: 'Orders', id: 'ALL' }],
		}),
	}),
})

export const {
	useGetIncomingOrdersQuery,
	useGetActiveOrdersQuery,
	useGetCompletedOrdersQuery,
	useToggleOrderMutation,
	useAddIncomingOrderMutation,
	useDeleteOrdersMutation,
} = ordersApi

export const getIncomingOrdersCount = createSelector(
	ordersApi.endpoints.getIncomingOrders.select(),
	(incomingOrders) => incomingOrders.data?.count,
)

export const getActiveOrdersCount = createSelector(
	ordersApi.endpoints.getActiveOrders.select(),
	(activeOrders) => activeOrders.data?.count,
)

export const getCompletedOrdersCount = createSelector(
	ordersApi.endpoints.getCompletedOrders.select(),
	(completedOrders) => completedOrders.data?.count,
)

export const getIncomingOrders = createSelector(ordersApi.endpoints.getIncomingOrders.select(), (orders) => orders.data)

export const getActiveOrders = createSelector(ordersApi.endpoints.getActiveOrders.select(), (orders) => orders.data)

export const getCompletedOrders = createSelector(
	ordersApi.endpoints.getCompletedOrders.select(),
	(orders) => orders.data,
)

export const isIncomingOrderSelected = createSelector(
	ordersApi.endpoints.getIncomingOrders.select(),
	(incomingOrders) => incomingOrders.data?.items.some((item) => item.orders.some((order) => order.selected)),
)

export const isActiveOrderSelected = createSelector(ordersApi.endpoints.getActiveOrders.select(), (activeOrders) =>
	activeOrders.data?.items.some((item) =>
		item.orders.some((groupByDriver) => groupByDriver.orders.some((order) => order.selected)),
	),
)

export const isCompletedOrderSelected = createSelector(
	ordersApi.endpoints.getCompletedOrders.select(),
	(completedOrders) => completedOrders.data?.items.some((item) => item.orders.some((order) => order.selected)),
)

export const getAllSelectedOrdersIDs = createSelector(
	[
		ordersApi.endpoints.getIncomingOrders.select(),
		ordersApi.endpoints.getActiveOrders.select(),
		ordersApi.endpoints.getCompletedOrders.select(),
	],
	(iO, aO, cO) => {
		const selectedIncoming = (iO.data?.items || []).map((item) => getSelectedOrdersIDs(item.orders)).flat()
		const selectedActive = (aO.data?.items || [])
			.map((item) => item.orders.map((item) => getSelectedOrdersIDs(item.orders)).flat())
			.flat()
		const selectedCompleted = (cO.data?.items || []).map((item) => getSelectedOrdersIDs(item.orders)).flat()

		return [...selectedIncoming, ...selectedActive, ...selectedCompleted]
	},
)
