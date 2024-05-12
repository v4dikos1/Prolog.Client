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

export type DriversFromAPI = API_Response<DriverFromAPI>
