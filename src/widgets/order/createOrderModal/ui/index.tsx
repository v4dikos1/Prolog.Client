import { useState } from 'react'
import { ModalTemplate, ModalTitleButton } from '@/shared/ui/ModalTemplate/'
import { Step } from '@/shared/ui/Step'
import { StepOne } from './StepOne'
import { StepTwo } from './StepTwo'
import { Addition } from '@/widgets/product'

interface Props {
	opened: boolean
	close: () => void
}

export interface Form {
	storageID: string
	address: string
	date?: Date
	pickUpStart: string
	pickUpEnd: string
	deliveryStart: string
	deliveryEnd: string
	clientID: string
	price: string
	productIDs: Set<string>
}

const defaultFromState: Form = {
	storageID: '',
	address: '',
	pickUpStart: '',
	pickUpEnd: '',
	deliveryStart: '',
	deliveryEnd: '',
	clientID: '',
	price: '',
	productIDs: new Set(),
}

export const CreateOrderModal = ({ opened, close }: Props) => {
	const [form, setForm] = useState<Form>(defaultFromState)

	const [currentStep, setCurrentStep] = useState<1 | 2 | 'addition'>(1)
	const openFirst = () => setCurrentStep(1)
	const openSecond = () => setCurrentStep(2)
	const openAddition = () => setCurrentStep('addition')

	const content = {
		1: <StepOne form={form} setForm={setForm} next={openSecond} />,
		2: <StepTwo openAddition={openAddition} form={form} setForm={setForm} prev={openFirst} />,
		addition: <Addition back={openSecond} />,
	}

	const title = {
		1: 'Создать заявку',
		2: 'Создать заявку',
		addition: <ModalTitleButton back={openSecond} text='Добавить товар' />,
	}

	const closeAndReset = () => {
		setTimeout(() => {
			setForm(defaultFromState)
			setCurrentStep(1)
		}, 500)
		close()
	}

	return (
		<ModalTemplate
			titleContent={title[currentStep]}
			headerContent={
				currentStep === 'addition' ? null : (
					<div className='flex gap-8 w-full mt-3'>
						<Step className='w-full' active={currentStep === 1} stepNumber={1} stepName='Сведения о заявке' />
						<Step className='w-full' active={currentStep === 2} stepNumber={2} stepName='Товары' />
					</div>
				)
			}
			content={content[currentStep]}
			opened={opened}
			close={closeAndReset}
		/>
	)
}
