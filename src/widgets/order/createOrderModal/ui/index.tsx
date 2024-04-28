import { useState } from 'react'
import { ModalTemplate } from '@/shared/ui/ModalTemplate/'
import { Step } from '@/shared/ui/Step'
import { StepOne } from './StepOne'
import { StepTwo } from './StepTwo'

interface Props {
	opened: boolean
	close: () => void
}

export const CreateOrderModal = ({ opened, close }: Props) => {
	const [currentStep, setCurrentStep] = useState<1 | 2>(1)
	const openFirst = () => setCurrentStep(1)
	const openSecond = () => setCurrentStep(2)

	const content = currentStep === 1 ? <StepOne next={openSecond} /> : <StepTwo prev={openFirst} />

	const closeAndReset = () => {
		setTimeout(() => {
			setCurrentStep(1)
		}, 500)
		close()
	}

	return (
		<ModalTemplate
			titleContent='Создать заявку'
			headerContent={
				<div className='flex gap-8 w-full mt-3'>
					<Step className='w-full' active={currentStep === 1} stepNumber={1} stepName='Сведения о заявке' />
					<Step className='w-full' active={currentStep === 2} stepNumber={2} stepName='Товары' />
				</div>
			}
			content={content}
			opened={opened}
			close={closeAndReset}
		/>
	)
}
