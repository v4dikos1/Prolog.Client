import { getRandomColor } from '@/shared/helpers/getRandomColor'
import { IncomingOrders, ActiveOrders, CompletedOrders, ActiveOrdersGroupByDate } from './model'
import { ActiveOrdersFromAPI, CompletedOrdersFromAPI, IncomingOrdersFromAPI } from './apiModel'
import { Order } from './model'

export const transformOrdersFromAPIToIncoming = (ordersFromAPI: IncomingOrdersFromAPI): IncomingOrders => {
	const incomingOrders: IncomingOrders = {
		count: ordersFromAPI.totalItems,
		items: ordersFromAPI.items.map((item) => ({
			date: item.orderDate,
			orders: item.ordersGroupedByDriver
				.map((groupByDriver) =>
					groupByDriver.orders.map((order) => ({
						ID: order.id,
						visibleID: order.visibleId,
						price: order.price,
						storage: {
							ID: order.storage.storageId,
							name: order.storage.storageName,
							coordinates: order.storage.storageCoordinates,
						},
						client: {
							ID: order.client.clientId,
							name: order.client.clientName,
							phone: order.client.clientPhone,
							address: order.client.address,
							coordinates: order.client.coordinates,
						},
						cargo: {
							volume: order.volume,
							weight: order.weight,
							count: order.amount,
						},
						selected: false,
						status: 0,
						pickUpStart: order.pickUpStartDate,
						pickUpEnd: order.pickUpEndDate,
						deliveryStart: order.deliveryStartDate,
						deliveryEnd: order.deliveryEndDate,
					})),
				)
				.flat(),
		})),
	}

	return incomingOrders
}

export const transformOrdersFromAPIToActive = (ordersFromAPI: ActiveOrdersFromAPI): ActiveOrders => {
	const activeOrders: ActiveOrders = {
		count: ordersFromAPI.totalItems,
		items: ordersFromAPI.items.map((item) => ({
			date: item.orderDate,
			orders: item.ordersGroupedByDriver.map((groupByDriver) => ({
				driver: {
					ID: groupByDriver.driver.driverId,
					name: groupByDriver.driver.name,
					phone: groupByDriver.driver.phoneNumber,
					licensePlate: groupByDriver.driver.licencePlate,
					transportID: groupByDriver.driver.transportId,
					start: groupByDriver.driver.startDate,
					end: groupByDriver.driver.endDate,
					ordersCount: groupByDriver.driver.totalOrdersCount,
					completedOrdersCount: groupByDriver.driver.ordersCompletedCount,
					distance: groupByDriver.driver.distance,
					color: getRandomColor(),
				},
				orders: groupByDriver.orders.map((order) => ({
					ID: order.id,
					visibleID: order.visibleId,
					price: order.price,
					storage: {
						ID: order.storage.storageId,
						name: order.storage.storageName,
						coordinates: order.storage.storageCoordinates,
					},
					client: {
						ID: order.client.clientId,
						name: order.client.clientName,
						phone: order.client.clientPhone,
						address: order.client.address,
						coordinates: order.client.coordinates,
					},
					cargo: {
						volume: order.volume,
						weight: order.weight,
						count: order.amount,
					},
					selected: false,
					status: 1,
					deliveryStart: order.deliveryStartDate,
					deliveryEnd: order.deliveryEndDate,
				})),
				routes: groupByDriver.routes,
			})),
		})),
	}

	return activeOrders
}

export const transformOrdersFromAPIToCompleted = (ordersFromAPI: CompletedOrdersFromAPI): CompletedOrders => {
	const completedOrders: CompletedOrders = {
		count: ordersFromAPI.totalItems,
		items: ordersFromAPI.items.map((item) => ({
			date: item.orderDate,
			orders: item.ordersGroupedByDriver
				.map((groupByDriver) =>
					groupByDriver.orders.map((order) => ({
						ID: order.id,
						visibleID: order.visibleId,
						price: order.price,
						storage: {
							ID: order.storage.storageId,
							name: order.storage.storageName,
							coordinates: order.storage.storageCoordinates,
						},
						client: {
							ID: order.client.clientId,
							name: order.client.clientName,
							phone: order.client.clientPhone,
							address: order.client.address,
							coordinates: order.client.coordinates,
						},
						cargo: {
							volume: order.volume,
							weight: order.weight,
							count: order.amount,
						},
						selected: false,
						status: 2,
						driver: {
							name: groupByDriver.driver.name,
							licensePlate: groupByDriver.driver.licencePlate,
						},
						pickedUp: order.pickUpStartDate,
						completed: Boolean(order.status),
						end: order.deliveryEndDate,
					})),
				)
				.flat(),
		})),
	}

	return completedOrders
}

export const toggleOrderInIncomingOrders = (ID: number, incomingOrders: IncomingOrders) => {
	for (let i = 0; i < incomingOrders.items.length; i++) {
		const orders = incomingOrders.items[i].orders
		for (let j = 0; j < orders.length; j++) {
			const order = orders[j]
			if (order.ID === ID) {
				order.selected = !order.selected
			}
		}
	}
}

export const toggleOrderInActiveOrders = (ID: number, activeOrders: ActiveOrders) => {
	for (let i = 0; i < activeOrders.items.length; i++) {
		const groupsByDriver = activeOrders.items[i].orders
		for (let j = 0; j < groupsByDriver.length; j++) {
			const groupByDriver = groupsByDriver[j]
			for (let k = 0; k < groupByDriver.orders.length; k++) {
				const order = groupByDriver.orders[k]
				if (order.ID === ID) {
					order.selected = !order.selected
				}
			}
		}
	}
}

export const toggleOrderInCompletedOrders = (ID: number, completedOrders: CompletedOrders) => {
	for (let i = 0; i < completedOrders.items.length; i++) {
		const orders = completedOrders.items[i].orders
		for (let j = 0; j < orders.length; j++) {
			const order = orders[j]
			if (order.ID === ID) {
				order.selected = !order.selected
			}
		}
	}
}

export const filterOrder = (order: Order, searchStr = '') => {
	if (searchStr === '') return true

	const includesID = order.visibleID.toLowerCase().includes(searchStr)
	const includesAddress = order.client.address.toLowerCase().includes(searchStr)
	const includesStorage = order.storage.name.toLowerCase().includes(searchStr)
	const includesClient = order.client.name.toLowerCase().includes(searchStr)

	if (includesID || includesAddress || includesStorage || includesClient) return true

	return false
}

export const filterActiveOrders = (activeOrders: ActiveOrders, searchStr = ''): ActiveOrders => {
	const result: ActiveOrders = {
		count: activeOrders.count,
		items: [],
	}

	for (let i = 0; i < activeOrders.items.length; i++) {
		const item = activeOrders.items[i]
		const newItem: ActiveOrdersGroupByDate = {
			date: item.date,
			orders: [],
		}

		for (let j = 0; j < item.orders.length; j++) {
			const driverGroup = item.orders[j]
			const filteredDriverGroup = driverGroup.orders.filter((order) => filterOrder(order, searchStr))

			if (filteredDriverGroup.length > 0) {
				newItem.orders.push({
					driver: driverGroup.driver,
					orders: filteredDriverGroup,
					routes: driverGroup.routes,
				})
			}
		}

		if (newItem.orders.length > 0) {
			result.items.push(newItem)
		}
	}

	return result
}

export const filterIncomingOrders = (incomingOrders: IncomingOrders, searchStr = ''): IncomingOrders => {
	const result: IncomingOrders = {
		count: incomingOrders.count,
		items: [],
	}

	for (let i = 0; i < incomingOrders.items.length; i++) {
		const item = incomingOrders.items[i]
		const filteredOrders = item.orders.filter((order) => filterOrder(order, searchStr))

		if (filteredOrders.length > 0) {
			result.items.push({
				date: item.date,
				orders: filteredOrders,
			})
		}
	}

	return result
}

export const filterCompletedOrders = (completedOrders: CompletedOrders, searchStr = ''): CompletedOrders => {
	const result: CompletedOrders = {
		count: completedOrders.count,
		items: [],
	}

	for (let i = 0; i < completedOrders.items.length; i++) {
		const item = completedOrders.items[i]
		const filteredOrders = item.orders.filter((order) => filterOrder(order, searchStr))

		if (filteredOrders.length > 0) {
			result.items.push({
				date: item.date,
				orders: filteredOrders,
			})
		}
	}

	return result
}

export const activeOrdersGroupByDateIsEmpty = (activeOrdersGroupByDate: ActiveOrdersGroupByDate): boolean => {
	return activeOrdersGroupByDate.orders.every(
		(activeOrdersGroupByDriver) => activeOrdersGroupByDriver.orders.length === 0,
	)
}

export const getSelectedOrdersIDs = (orders: Order[]): number[] => {
	return orders.filter((order) => order.selected).map((order) => order.ID)
}
