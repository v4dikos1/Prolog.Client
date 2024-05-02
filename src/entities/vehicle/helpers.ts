import { VehiclesFromAPI } from './apiModel'
import { Vehicle } from './model'

export const transformVehiclesFromAPI = (vehiclesFromAPI: VehiclesFromAPI): Vehicle[] => {
	return vehiclesFromAPI.items.map((item) => ({
		ID: item.id,
		brand: item.brand,
		volume: item.volume,
		capacity: item.capacity,
		fuelConsumption: item.fuelConsumption,
		licensePlate: item.licencePlate,
	}))
}
