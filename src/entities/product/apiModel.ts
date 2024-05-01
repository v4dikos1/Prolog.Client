import { API_Response } from '@/shared/types'

export type ProductFromAPI = {
	id: string
	code: string
	name: string
	weight: number
	volume: number
	price: number
}

export type ProductsFromAPI = API_Response<ProductFromAPI>
