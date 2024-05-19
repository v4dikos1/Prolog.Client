import { useRunPlanningMutation } from '@/entities/order'
import { getApiFormatDateString } from '@/shared/helpers/getApiFormatDateString'
import { Form } from './types'

export const useSave = () => {
	const [runPlanning, { isLoading }] = useRunPlanningMutation()

	const save = (form: Form) => {
		const date = form.date || new Date()

		return runPlanning({
			startDate: getApiFormatDateString(date, form.start),
			endDate: getApiFormatDateString(date, form.start),
			binds: form.binds.map((bind) => ({
				driverId: bind.driverID,
				transportId: bind.vehicleID,
				storageId: bind.storageID,
			})),
		})
	}

	return { save, isLoading }
}
