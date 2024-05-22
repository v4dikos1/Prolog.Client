import { ProductTable } from '@/widgets/product'
import { ImportOrdersButton } from '@/features/order'
import { Button } from '@/shared/ui/Button'
import type { Form } from '../types'
import { useSave } from '../useSave'

interface Props {
	prev: () => void
	form: Form
	setForm: (form: Form) => void
	openAddition: () => void
	close: () => void
}

export const StepTwo = ({ prev, form, setForm, openAddition, close }: Props) => {
	const { save, isLoading } = useSave()

	const handleResponse = (response: unknown) => {
		if (response && typeof response === 'object' && 'error' in response) return

		close()
	}

	const saveHandler = () => save(form).then(handleResponse)

	return (
		<>
			<ProductTable
				selectedProducts={form.productIDs}
				setSelectedProducts={(newProductIDs) => setForm({ ...form, productIDs: newProductIDs })}
				openAddition={openAddition}
			/>
			<div className='flex justify-between px-8 mt-auto flex-col md:flex-row gap-4'>
				<ImportOrdersButton />
				<div className='flex gap-3 self-end'>
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
