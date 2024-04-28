export type ProductFromAPI = {
	id: string
	code: string
	name: string
	weight: number
	volume: number
	price: number
}

export type ProductsFromAPI = {
	totalItems: number
	itemsQuantity: number
	itemsOffset: number
	items: ProductFromAPI[]
}
