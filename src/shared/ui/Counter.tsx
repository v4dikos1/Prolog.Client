import { MinusIcon } from '@/shared/ui/icons/MinusIcon'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'

interface Props {
	value: string
	setValue: (value: string) => void
}

export const Counter = ({ value, setValue }: Props) => {
	const decrement = () => {
		if (value === '0') return

		const newValue = String(Number(value) - 1)
		setValue(newValue)
	}
	const increment = () => {
		if (value === '999') return

		const newValue = String(Number(value) + 1)
		setValue(newValue)
	}

	return (
		<div className='flex gap-2 items-center'>
			<button className='bg-gray-100 rounded-sm p-1 transition-colors hover:bg-gray-200' onClick={decrement}>
				<MinusIcon />
			</button>
			<input
				// min={1}
				// max={999}
				value={value}
				placeholder='Кол-во'
				className='h-full w-10 text-center outline-none placeholder:text-gray-400 placeholder:underline'
				// type='number'
				onChange={(event) => setValue(event.target.value)}
			/>
			<button className='bg-gray-100 rounded-sm p-1 transition-colors hover:bg-gray-200' onClick={increment}>
				<PlusIcon />
			</button>
		</div>
	)
}
