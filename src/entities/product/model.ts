import { ProductFromAPI } from './apiModel'

export type Product = ProductFromAPI & {
	selected: boolean
	count: number
}
