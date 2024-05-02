import { API_Response } from '@/shared/types'

type VehicleFromAPI = {
	id: string
	brand: string
	volume: number
	capacity: number
	fuelConsumption: number
	licencePlate: string
}

export type VehiclesFromAPI = API_Response<VehicleFromAPI>
