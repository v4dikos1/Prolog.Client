import { StoragesFromAPI } from './apiModel'
import { Storage } from './model'

export const transformStoragesFromAPI = (storagesFromAPI: StoragesFromAPI): Storage[] => {
	return storagesFromAPI.items.map((item) => ({
		ID: item.id,
		name: item.name,
		address: item.address,
	}))
}
