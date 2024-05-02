import { Product } from '@/entities/product'

export const filterProduct = (searchStr: string, product: Product) => {
	searchStr = searchStr.toLowerCase()
	const code = product.code.toLowerCase()
	const name = product.name.toLowerCase()

	const includeCode = code.replace(' ', '').includes(searchStr) || code.includes(searchStr)
	const includeName = name.toLowerCase().includes(searchStr)
	return includeCode || includeName
}
