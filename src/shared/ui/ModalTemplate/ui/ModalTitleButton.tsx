import { ArrowLeftIcon } from '@/shared/ui/icons/ArrowLeftIcon'

interface Props {
	back: () => void
	text: string
}

export const ModalTitleButton = ({ back, text }: Props) => {
	return (
		<button onClick={back} className='group flex gap-3 items-center text-xl font-semibold leading-8 text-gray-900'>
			<ArrowLeftIcon className='group-hover:animate-arrow-left' />
			{text}
		</button>
	)
}
