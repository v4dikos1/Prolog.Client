import { ClientsFromAPI } from './apiModel'
import { Client } from './model'

export const transformClientsFromAPI = (clientsFromAPI: ClientsFromAPI): Client[] => {
	return clientsFromAPI.items.map((item) => ({
		ID: item.id,
		name: item.name,
		phone: item.phoneNumber,
	}))
}
