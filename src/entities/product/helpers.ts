import { ProductsFromAPI } from './apiModel'
import { Product } from './model'

export const transformProductsFromAPI = (productsFromAPI: ProductsFromAPI): Product[] => {
	console.log(productsFromAPI)
	return productsFromAPI.items.map((item) => ({
		ID: item.id,
		code: item.code,
		name: item.name,
		weight: item.weight,
		volume: item.volume,
		price: item.price,
	}))
}
