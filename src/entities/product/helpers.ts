import { ProductsFromAPI } from './apiModel'
import { Product } from './model'

export const transformProductsFromAPI = (productsFromAPI: ProductsFromAPI): Product[] => {
	return productsFromAPI.items.map((item) => ({
		ID: item.id,
		code: item.code,
		name: item.name,
		weight: item.weight,
		volume: item.volume,
		price: item.price,
	}))
}

export const filterProduct = (searchStr: string, product: Product) => {
	searchStr = searchStr.toLowerCase()
	const code = product.code.toLowerCase()
	const name = product.name.toLowerCase()

	const includeCode = code.replace(' ', '').includes(searchStr) || code.includes(searchStr)
	const includeName = name.toLowerCase().includes(searchStr)
	return includeCode || includeName
}
