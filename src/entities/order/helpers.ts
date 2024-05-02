import { getRandomColor } from '@/shared/utils/getRandomColor'
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
						address: order.address,
						storage: {
							ID: order.storageId,
							name: order.storageName,
						},
						client: {
							ID: order.clientId,
							name: order.clientName,
							phone: order.clientPhone,
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
					address: order.address,
					storage: {
						ID: order.storageId,
						name: order.storageName,
					},
					client: {
						ID: order.clientId,
						name: order.clientName,
						phone: order.clientPhone,
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
						address: order.address,
						storage: {
							ID: order.storageId,
							name: order.storageName,
						},
						client: {
							ID: order.clientId,
							name: order.clientName,
							phone: order.clientPhone,
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
	const includesAddress = order.address.toLowerCase().includes(searchStr)
	const includesStorage = order.storage.name.toLowerCase().includes(searchStr)
	const includesClient = order.client.name.toLowerCase().includes(searchStr)

	if (includesID || includesAddress || includesStorage || includesClient) return true

	return false
}

export const filterActiveOrders = (activeOrders: ActiveOrders, searchStr = ''): ActiveOrders => {
	return {
		count: activeOrders.count,
		items: activeOrders.items.map((activeOrdersGroupByDate) => ({
			date: activeOrdersGroupByDate.date,
			orders: activeOrdersGroupByDate.orders.map((activeOrdersGroupByDriver) => ({
				driver: activeOrdersGroupByDriver.driver,
				orders: activeOrdersGroupByDriver.orders.filter((activeOrder) => filterOrder(activeOrder, searchStr)),
			})),
		})),
	}
}

export const filterIncomingOrders = (incomingOrders: IncomingOrders, searchStr = ''): IncomingOrders => {
	return {
		count: incomingOrders.count,
		items: incomingOrders.items.map((incomingOrdersGroupByDate) => ({
			date: incomingOrdersGroupByDate.date,
			orders: incomingOrdersGroupByDate.orders.filter((incomingOrder) => filterOrder(incomingOrder, searchStr)),
		})),
	}
}

export const filterCompletedOrders = (completedOrders: CompletedOrders, searchStr = ''): CompletedOrders => {
	return {
		count: completedOrders.count,
		items: completedOrders.items.map((completedOrdersGroupByDate) => ({
			date: completedOrdersGroupByDate.date,
			orders: completedOrdersGroupByDate.orders.filter((completedOrder) => filterOrder(completedOrder, searchStr)),
		})),
	}
}

export const activeOrdersGroupByDateIsEmpty = (activeOrdersGroupByDate: ActiveOrdersGroupByDate): boolean => {
	return activeOrdersGroupByDate.orders.every(
		(activeOrdersGroupByDriver) => activeOrdersGroupByDriver.orders.length === 0,
	)
}
