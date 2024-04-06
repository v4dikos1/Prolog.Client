import { IncomingOrders, ActiveOrders } from './model'
import { ActiveOrdersFromAPI, IncomingOrdersFromAPI } from './apiModel'
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
