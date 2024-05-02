import { DriversFromAPI } from './apiModel'
import { Driver } from './model'

export const transformDriversFromAPI = (driversFromAPI: DriversFromAPI): Driver[] => {
	return driversFromAPI.items.map((item) => ({
		ID: item.id,
		name: item.name,
		surname: item.surname,
		patronymic: item.patronymic,
		phone: item.phoneNumber,
		telegram: item.telegram,
		salary: item.salary,
	}))
}
