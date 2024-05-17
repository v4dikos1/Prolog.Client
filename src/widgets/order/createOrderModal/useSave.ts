import { useAddIncomingOrderMutation } from '@/entities/order/slice'
import { getApiFormatDateString } from '@/shared/helpers/getApiFormatDateString'
import { Form } from './types'

export const useSave = () => {
	const [addIncomingOrder, { isLoading }] = useAddIncomingOrderMutation()

	const save = (form: Form) => {
		const date = form.date || new Date()

		return addIncomingOrder({
			storageID: form.storageID,
			address: form.address,
			pickUpStart: getApiFormatDateString(date, form.pickUpStart),
			pickUpEnd: getApiFormatDateString(date, form.pickUpEnd),
			deliveryStart: getApiFormatDateString(date, form.deliveryStart),
			deliveryEnd: getApiFormatDateString(date, form.deliveryEnd),
			clientID: form.clientID,
			price: Number(form.price),
			productIDs: Array.from(form.productIDs).map(([ID, count]) => ({ productId: ID, count })),
		})
	}

	return { save, isLoading }
}
