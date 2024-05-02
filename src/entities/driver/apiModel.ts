import { API_Response } from '@/shared/types'

// export type DriverFromAPI = {
// 	distance: number
// 	driverId: string
// 	endDate: string
// 	licencePlate: string
// 	name: string
// 	ordersCompletedCount: number
// 	phoneNumber: string
// 	startDate: string
// 	totalOrdersCount: number
// 	transportId: string
// }

export type DriverFromAPI = {
	id: string
	name: string
	surname: string
	patronymic: string
	phoneNumber: string
	telegram: string
	salary: number
}

export type DriversFromAPI = API_Response<DriverFromAPI>
