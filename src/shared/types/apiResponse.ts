export type API_Response<Item> = {
	totalItems: number
	itemsQuantity: number
	itemsOffset: number
	items: Item[]
}
