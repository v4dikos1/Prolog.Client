import { ProductsFromAPI } from './apiModel'
import { Product } from './model'

export const transformProductsFromAPI = (productsFromAPI: ProductsFromAPI): Product[] => {
	return productsFromAPI.items.map((item) => ({
		id: item.id,
		code: item.code,
		name: item.name,
		weight: item.weight,
		volume: item.volume,
		price: item.price,
		selected: false,
		count: 0,
	}))
}
