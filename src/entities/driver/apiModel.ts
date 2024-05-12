import { API_Response } from '@/shared/types'

export type DriverFromAPI = {
	id: string
	name: string
	surname: string
	patronymic: string
	phoneNumber: string
	telegram: string
	salary: number
}

export type DriverInOrderFromAPI = {
	driverId: string
	name: string
	phoneNumber: string
	licencePlate: string
	transportId: string
	startDate: string
	endDate: string
	totalOrdersCount: number
	ordersCompletedCount: number
	distance: number
}

export type DriversFromAPI = API_Response<DriverFromAPI>
