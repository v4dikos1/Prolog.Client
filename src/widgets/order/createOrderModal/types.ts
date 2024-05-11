export interface Form {
	storageID: string
	address: string
	date?: Date
	pickUpStart: string
	pickUpEnd: string
	deliveryStart: string
	deliveryEnd: string
	clientID: string
	price: string
	productIDs: Map<string, number>
}

export const defaultFromState: Form = {
	storageID: '',
	address: '',
	pickUpStart: '',
	pickUpEnd: '',
	deliveryStart: '',
	deliveryEnd: '',
	clientID: '',
	price: '',
	productIDs: new Map(),
}
