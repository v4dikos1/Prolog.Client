import { IncomingOrders, IncomingOrdersFromAPI } from './model'

export const transformIncomingOrdersFromAPI = (ordersFromAPI: IncomingOrdersFromAPI): IncomingOrders => {
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
