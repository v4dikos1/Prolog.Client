import { IncomingOrders, ActiveOrders, CompletedOrders } from './model'
import { ActiveOrdersFromAPI, CompletedOrdersFromAPI, IncomingOrdersFromAPI } from './apiModel'
import { getRandomColor } from '@/shared/utils/getRandomColor'

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

export const toggleOrderInIncomingOrders = (id: number, incomingOrders: IncomingOrders) => {
	for (let i = 0; i < incomingOrders.items.length; i++) {
		const orders = incomingOrders.items[i].orders
		for (let j = 0; j < orders.length; j++) {
			const order = orders[j]
			if (order.ID === id) {
				order.selected = !order.selected
			}
		}
	}
}

export const toggleOrderInActiveOrders = (id: number, activeOrders: ActiveOrders) => {
	for (let i = 0; i < activeOrders.items.length; i++) {
		const groupsByDriver = activeOrders.items[i].orders
		for (let j = 0; j < groupsByDriver.length; j++) {
			const groupByDriver = groupsByDriver[j]
			for (let k = 0; k < groupByDriver.orders.length; k++) {
				const order = groupByDriver.orders[k]
				if (order.ID === id) {
					order.selected = !order.selected
				}
			}
		}
	}
}

export const toggleOrderInCompletedOrders = (id: number, completedOrders: CompletedOrders) => {
	for (let i = 0; i < completedOrders.items.length; i++) {
		const orders = completedOrders.items[i].orders
		for (let j = 0; j < orders.length; j++) {
			const order = orders[j]
			if (order.ID === id) {
				order.selected = !order.selected
			}
		}
	}
}
