import { API_Response } from '@/shared/types'

export type ClientFromAPI = {
	id: string
	name: string
	phoneNumber: string
}

export type ClientsFromAPI = API_Response<ClientFromAPI>
