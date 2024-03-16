export type Storage = {
	ID: number
	name: string
}

export type Client = {
	ID: number
	name: string
	phone: string
}

export type Cargo = {
	volume: number
	weight: number
	count: number
}

export type OrderBase = {
	ID: number
	visibleID: string
	price: number
	address: string
	storage: Storage
	client: Client
	cargo: Cargo
	selected: boolean
}

export type IncomingOrder = OrderBase & {
	status: 0
	pickUpStart: Date
	pickUpEnd: Date
	deliveryStart: Date
	deliveryEnd: Date
}

export type ActiveOrder = OrderBase & {
	status: 1
	deliveryStart: Date
	deliveryEnd: Date
}

export type CompletedOrder = OrderBase & {
	status: 2
	pickedUp: Date
	completed: boolean
	end: Date
}

export type Order = IncomingOrder | ActiveOrder | CompletedOrder

export const fakeOrders: Order[] = [
	{
		ID: 1,
		visibleID: '49463',
		price: 10240,
		address: 'Телевизорная ул., 1, стр. 90',
		storage: {
			ID: 20,
			name: 'Склад Октябрьский',
		},
		client: {
			ID: 32,
			name: 'Аллея',
			phone: '+79248274997',
		},
		cargo: {
			volume: 10,
			weight: 25,
			count: 3,
		},
		status: 0,
		pickUpStart: new Date(2023, 2, 13, 9),
		pickUpEnd: new Date(2023, 2, 13, 9, 30),
		deliveryStart: new Date(2023, 2, 13, 12),
		deliveryEnd: new Date(2023, 2, 13, 12, 30),
		selected: false,
	},
	{
		ID: 2,
		visibleID: '94519',
		price: 45700,
		address: 'Айвазовского 12. А',
		storage: {
			ID: 20,
			name: 'Склад Ноябрьский',
		},
		client: {
			ID: 32,
			name: 'Перекрёсток',
			phone: '+79203908082',
		},
		cargo: {
			volume: 2,
			weight: 0.4,
			count: 1,
		},
		status: 1,
		deliveryStart: new Date(2023, 2, 13, 12, 30),
		deliveryEnd: new Date(2023, 2, 13, 14, 30),
		selected: true,
	},
	{
		ID: 3,
		visibleID: '56800',
		price: 90320,
		address: 'Курская 12. А. стр. 2',
		storage: {
			ID: 20,
			name: 'Склад 30 Комиссаров',
		},
		client: {
			ID: 32,
			name: 'ИП Владимир Горбачёв',
			phone: '+79803200506',
		},
		cargo: {
			volume: 30,
			weight: 70,
			count: 20,
		},
		status: 2,
		pickedUp: new Date(2023, 2, 13, 9, 46),
		completed: false,
		end: new Date(2023, 2, 13, 12, 15),
		selected: true,
	},
]
