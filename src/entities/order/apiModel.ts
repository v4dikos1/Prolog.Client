type DriverFromAPI = {
	distance: number
	driverId: string
	endDate: string
	licencePlate: string
	name: string
	ordersCompletedCount: number
	phoneNumber: string
	startDate: string
	totalOrdersCount: number
	transportId: string
}

type OrderFromAPI = {
	address: string
	amount: number
	clientId: string
	clientName: string
	clientPhone: string
	dateDelivered: null
	datePickedUp: null
	deliveryEndDate: string
	deliveryStartDate: string
	id: number
	pickUpEndDate: string
	pickUpStartDate: string
	price: number
	status: null
	storageId: string
	storageName: string
	visibleId: string
	volume: number
	weight: number
}

export type IncomingOrdersFromAPI = {
	totalItems: number
	itemsQuantity: number
	itemsOffset: number
	items: {
		orderCount: number
		orderDate: string
		ordersGroupedByDriver: {
			driver: null
			orders: OrderFromAPI[]
		}[]
	}[]
}

export type ActiveOrdersFromAPI = {
	totalItems: number
	itemsQuantity: number
	itemsOffset: number
	items: {
		orderCount: number
		orderDate: string
		ordersGroupedByDriver: {
			driver: DriverFromAPI
			orders: OrderFromAPI[]
		}[]
	}[]
}