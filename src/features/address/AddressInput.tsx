import { MouseEventHandler, useEffect, useState } from 'react'
import cx from 'classnames'
import { useDebounce } from '@uidotdev/usehooks'
import { useLazyGetAddressesQuery } from '@/entities/address/slice'
import { Input } from '@/shared/ui/Input'

interface Props {
	value: string
	setValue: (value: string) => void
	placeholder: string
}

export const AddressInput = ({ placeholder, value, setValue }: Props) => {
	const debouncedValue = useDebounce(value, 300)
	const [trigger, { data: addresses }] = useLazyGetAddressesQuery()
	const [listOpened, setListOpened] = useState(false)

	const onAddressItemClick = (addressName: string) => {
		setValue(addressName)
		setListOpened(false)
	}

	const inputClickHandler = () => {
		setListOpened(true)
	}

	useEffect(() => {
		const windowMouseDown = (event: MouseEvent) => {
			if (
				event.target &&
				'closest' in event.target &&
				typeof event.target.closest === 'function' &&
				!event.target.closest('.addressInput')
			) {
				setListOpened(false)
			}
		}
		if (listOpened) {
			window.addEventListener('mousedown', windowMouseDown)
		}

		return () => {
			window.removeEventListener('mousedown', windowMouseDown)
		}
	}, [listOpened])

	useEffect(() => {
		if (debouncedValue === '') return
		trigger(debouncedValue)
	}, [trigger, debouncedValue])

	return (
		<div className='w-full relative addressInput'>
			<Input
				changeHandler={(event) => setValue(event.target.value)}
				focusHandler={() => setListOpened(true)}
				clickHandler={inputClickHandler}
				value={value}
				className='w-full'
				placeholder={placeholder}
				name='address'
				required
				autocomplete='off'
			/>
			{value && addresses && addresses.length > 0 && (
				<ul
					className={cx(
						'w-full mt-2 absolute z-10 bg-white border border-gray-200 rounded-lg shadow-xl overflow-auto transition-opacity scrollable max-h-56',
						{
							'opacity-0 pointer-events-none': !listOpened,
							'opacity-1': listOpened,
						},
					)}>
					{addresses.map((address) => (
						<li key={address.addressFullName}>
							<AddressItem
								clickHandler={() => onAddressItemClick(address.addressFullName)}
								address={address.addressFullName}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

interface AddressItemProps {
	clickHandler: MouseEventHandler<HTMLButtonElement>
	address: string
}

export const AddressItem = ({ address, clickHandler }: AddressItemProps) => {
	return (
		<button
			onClick={clickHandler}
			type='button'
			className='w-full p-3 border-b border-gray-200 text-sm text-left group-last:border-none hover:bg-indigo-50'>
			{address}
		</button>
	)
}
