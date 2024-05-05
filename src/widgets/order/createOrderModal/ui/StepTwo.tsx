import { ProductTable } from '@/widgets/product'
import { ImportOrdersButton } from '@/features/order'
import { Button } from '@/shared/ui/Button'
import type { Form } from './index'
import { useAddIncomingOrderMutation } from '@/entities/order/slice'
import { getApiFormatDateString } from '@/shared/helpers/getApiFormatDateString'

interface Props {
	prev: () => void
	form: Form
	setForm: (form: Form) => void
	openAddition: () => void
}

export const StepTwo = ({ prev, form, setForm, openAddition }: Props) => {
	const [addIncomingOrder, { isLoading }] = useAddIncomingOrderMutation()

	const saveHandler = () => {
		if (!form.date) return

		const pickUpStart = getApiFormatDateString(form.date, form.pickUpStart)
		const pickUpEnd = getApiFormatDateString(form.date, form.pickUpEnd)
		const deliveryStart = getApiFormatDateString(form.date, form.deliveryStart)
		const deliveryEnd = getApiFormatDateString(form.date, form.deliveryEnd)

		console.log(Array.from(form.productIDs))
		addIncomingOrder({
			storageID: form.storageID,
			address: form.address,
			pickUpStart,
			pickUpEnd,
			deliveryStart,
			deliveryEnd,
			clientID: form.clientID,
			price: Number(form.price),
			productIDs: Array.from(form.productIDs),
		})
	}

	return (
		<>
			<ProductTable
				selectedProducts={form.productIDs}
				setSelectedProducts={(newProductIDs) => setForm({ ...form, productIDs: newProductIDs })}
				openAddition={openAddition}
			/>
			<div className='flex justify-between px-8 mt-4'>
				<ImportOrdersButton />
				<div className='flex gap-3'>
					<Button category='secondary' clickHandler={() => prev()}>
						Назад
					</Button>
					<Button loading={isLoading} clickHandler={saveHandler}>
						Сохранить
					</Button>
				</div>
			</div>
		</>
	)
}
