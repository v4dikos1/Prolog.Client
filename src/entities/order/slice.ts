import { createSelector } from '@reduxjs/toolkit/react'
import { ActiveOrderPin, CompletedOrderPin, IncomingOrderPin, Route, StoragePin } from '@/entities/map'
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
	planning: 'orders/planning',
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

interface RunPlanningProps {
	startDate: string
	endDate: string
	binds: {
		driverId: string
		transportId: string
		storageId: string
	}[]
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
			providesTags: [
				{ type: 'Orders', id: 'ALL' },
				{ type: 'Orders', id: 'COMPLETED' },
			],
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
			invalidatesTags: [
				{ type: 'Orders', id: 'INCOMING' },
				{ type: 'Orders', id: 'ACTIVE' },
				{ type: 'Orders', id: 'COMPLETED' },
			],
		}),
		runPlanning: builder.mutation<void, RunPlanningProps>({
			query: (props) => ({
				url: ROUTES.planning,
				method: 'POST',
				body: {
					startDate: props.startDate,
					endDate: props.endDate,
					binds: props.binds,
				},
			}),
			invalidatesTags: [
				{ type: 'Orders', id: 'INCOMING' },
				{ type: 'Orders', id: 'ACTIVE' },
			],
		}),
		cancelActiveOrders: builder.mutation<void, number[]>({
			query: (ids) => {
				const queryParams = ids.map((id) => 'OrderIds=' + id).join('&')
				return {
					url: `${ROUTES.orders}?${queryParams}`,
					method: 'PATCH',
				}
			},
			invalidatesTags: [
				{ type: 'Orders', id: 'ACTIVE' },
				{ type: 'Orders', id: 'INCOMING' },
			],
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
	useRunPlanningMutation,
	useCancelActiveOrdersMutation,
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

export const getAllStoragesFromIncoming = createSelector(
	ordersApi.endpoints.getIncomingOrders.select(),
	(incomingOrders) => {
		if (incomingOrders.data === undefined) return []

		const storages = new Map<string, StoragePin>()

		incomingOrders.data.items.forEach((item) => {
			item.orders.forEach((order) => {
				const [latitude, longitude] = order.storage.coordinates.split(' ').map((value) => Number(value))
				const storage = {
					storageID: order.storage.ID,
					coordinates: {
						longitude,
						latitude,
					},
					storageName: order.storage.name,
				}

				if (!storages.has(order.storage.ID)) {
					storages.set(order.storage.ID, storage)
				}
			})
		})

		return Array.from(storages.values())
	},
)

export const getIncomingPins = createSelector(ordersApi.endpoints.getIncomingOrders.select(), (incomingOrders) => {
	if (incomingOrders.data === undefined) return []

	const pins = new Map<number, IncomingOrderPin>()

	incomingOrders.data.items.forEach((item) => {
		item.orders.forEach((order) => {
			const [latitude, longitude] = order.client.coordinates.split(' ').map((value) => Number(value))
			const pin = {
				orderID: order.ID,
				coordinates: { longitude, latitude },
				clientName: order.client.name,
				deliveryStart: order.deliveryStart,
				deliveryEnd: order.deliveryEnd,
			}

			pins.set(order.ID, pin)
		})
	})

	return Array.from(pins.values())
})

export const getAllStoragesFromActive = createSelector(ordersApi.endpoints.getActiveOrders.select(), (activeOrders) => {
	if (activeOrders.data === undefined) return []

	const storages = new Map<string, StoragePin>()

	activeOrders.data.items.forEach((item) => {
		item.orders.forEach((driverGroup) => {
			driverGroup.orders.forEach((order) => {
				const [latitude, longitude] = order.storage.coordinates.split(' ').map((value) => Number(value))
				const storage = {
					storageID: order.storage.ID,
					coordinates: {
						longitude,
						latitude,
					},
					storageName: order.storage.name,
				}

				if (!storages.has(order.storage.ID)) {
					storages.set(order.storage.ID, storage)
				}
			})
		})
	})

	return Array.from(storages.values())
})

export const getActivePins = createSelector(ordersApi.endpoints.getActiveOrders.select(), (activeOrders) => {
	if (activeOrders.data === undefined) return []

	const pins = new Map<number, ActiveOrderPin>()

	activeOrders.data.items.forEach((item) => {
		item.orders.forEach((driverGroup) => {
			driverGroup.orders.forEach((order) => {
				const index = driverGroup.routes.find((route) => route.id === String(order.ID))?.index || 1

				const [latitude, longitude] = order.client.coordinates.split(' ').map((value) => Number(value))
				const pin = {
					orderID: order.ID,
					coordinates: {
						latitude,
						longitude,
					},
					clientName: order.client.name,
					color: driverGroup.driver.color,
					index,
					deliveryStart: order.deliveryStart,
					deliveryEnd: order.deliveryEnd,
				}

				pins.set(order.ID, pin)
			})
		})
	})

	return Array.from(pins.values())
})

export const getAllStoragesFromCompleted = createSelector(
	ordersApi.endpoints.getCompletedOrders.select(),
	(completedOrders) => {
		if (completedOrders.data === undefined) return []

		const storages = new Map<string, StoragePin>()

		completedOrders.data.items.forEach((item) => {
			item.orders.forEach((order) => {
				const [latitude, longitude] = order.storage.coordinates.split(' ').map((value) => Number(value))
				const storage = {
					storageID: order.storage.ID,
					coordinates: {
						longitude,
						latitude,
					},
					storageName: order.storage.name,
				}

				if (!storages.has(order.storage.ID)) {
					storages.set(order.storage.ID, storage)
				}
			})
		})

		return Array.from(storages.values())
	},
)

export const getCompletedPins = createSelector(ordersApi.endpoints.getCompletedOrders.select(), (completedOrders) => {
	if (completedOrders.data === undefined) return []

	const pins = new Map<number, CompletedOrderPin>()

	completedOrders.data.items.forEach((item) => {
		item.orders.forEach((order) => {
			const [latitude, longitude] = order.client.coordinates.split(' ').map((value) => Number(value))
			const pin = {
				orderID: order.ID,
				coordinates: { longitude, latitude },
				completed: order.completed,
				clientName: order.client.name,
				endTime: order.end,
			}

			pins.set(order.ID, pin)
		})
	})

	return Array.from(pins.values())
})

export const getlIncomingSelectedOrderIDs = createSelector(
	ordersApi.endpoints.getIncomingOrders.select(),
	(incomingOrders) => {
		const orders = incomingOrders.data?.items || []
		const selectedIncoming = orders.map((item) => getSelectedOrdersIDs(item.orders)).flat()

		return selectedIncoming
	},
)

export const getlActiveSelectedOrderIDs = createSelector(
	ordersApi.endpoints.getActiveOrders.select(),
	(activeOrders) => {
		const orders = activeOrders.data?.items || []
		const selectedCompleted = orders
			.map((dateGroup) => dateGroup.orders.map((driverGroup) => getSelectedOrdersIDs(driverGroup.orders)).flat())
			.flat()

		return selectedCompleted
	},
)

export const getlCompletedSelectedOrderIDs = createSelector(
	ordersApi.endpoints.getCompletedOrders.select(),
	(completedOrders) => {
		const orders = completedOrders.data?.items || []
		const selectedCompleted = orders.map((item) => getSelectedOrdersIDs(item.orders)).flat()

		return selectedCompleted
	},
)

export const getActiveRoutes = createSelector(ordersApi.endpoints.getActiveOrders.select(), (activeOrders) => {
	if (activeOrders.data === undefined) return []

	const routes: Route[] = []

	activeOrders.data.items.forEach((groupByDate) => {
		groupByDate.orders.forEach((groupByDriver) => {
			const sortedRoutes = [...groupByDriver.routes].sort((routeA, routeB) => routeA.index - routeB.index)
			for (let i = 0; i < sortedRoutes.length - 1; i++) {
				const point1 = sortedRoutes[i]
				const point2 = sortedRoutes[i + 1]

				routes.push({
					ID: point1.id + '_' + point2.id + '_' + groupByDriver.driver.ID,
					from: {
						latitude: Number(point1.latitude),
						longitude: Number(point1.longitude),
					},
					to: {
						latitude: Number(point2.latitude),
						longitude: Number(point2.longitude),
					},
					color: groupByDriver.driver.color,
				})
			}
		})
	})

	return routes
})
