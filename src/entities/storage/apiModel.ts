import { API_Response } from '@/shared/types'

export type StorageFromAPI = {
	id: string
	name: string
	address: string
}

export type StoragesFromAPI = API_Response<StorageFromAPI>
