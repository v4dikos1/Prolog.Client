import { API_Response } from '@/shared/types'

export type StorageFromAPI = {
	ID: string
	name: string
	address: string
}

export type StoragesFromAPI = API_Response<StorageFromAPI>
