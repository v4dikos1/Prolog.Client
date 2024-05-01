export type ClientFromAPI = {
	id: string
	name: string
	phoneNumber: string
}
export type ClientsFromAPI = {
	totalItems: number
	itemsQuantity: number
	itemsOffset: number
	items: ClientFromAPI[]
}
