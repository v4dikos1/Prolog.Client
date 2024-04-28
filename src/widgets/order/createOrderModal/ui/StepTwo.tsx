import { ProductTable } from '@/widgets/product'
import { ImportOrdersButton } from '@/features/order'
import { Button } from '@/shared/ui/Button'

interface Props {
	prev: () => void
}

export const StepTwo = ({ prev }: Props) => {
	return (
		<>
			<ProductTable />
			<div className='flex justify-between px-8 mt-4'>
				<ImportOrdersButton />
				<div className='flex gap-3'>
					<Button category='secondary' clickHandler={() => prev()}>
						Назад
					</Button>
					<Button>Сохранить</Button>
				</div>
			</div>
		</>
	)
}
