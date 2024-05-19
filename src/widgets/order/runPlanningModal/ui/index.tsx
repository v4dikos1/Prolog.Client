import { useState } from 'react'
import { ModalTemplate } from '@/shared/ui/ModalTemplate/'
import { Step } from '@/shared/ui/Step'
import { StepOne } from './StepOne'
import { StepTwo } from './StepTwo'
import { Form, defaultFromState } from '../types'

interface Props {
	opened: boolean
	close: () => void
}

export const RunPlanningModal = ({ opened, close }: Props) => {
	const [form, setForm] = useState<Form>(defaultFromState)

	const [currentStep, setCurrentStep] = useState<1 | 2>(1)
	const openFirst = () => setCurrentStep(1)
	const openSecond = () => setCurrentStep(2)

	const content =
		currentStep === 1 ? (
			<StepOne form={form} setForm={setForm} next={openSecond} />
		) : (
			<StepTwo close={close} form={form} setForm={setForm} prev={openFirst} />
		)

	const closeAndReset = () => {
		setTimeout(() => {
			setCurrentStep(1)
			setForm(defaultFromState)
		}, 500)

		close()
	}

	return (
		<ModalTemplate
			excludeBackdropClosing={true}
			titleContent='Запуск планирования'
			headerContent={
				<div className='flex gap-8 w-full mt-3'>
					<Step className='w-full' active={currentStep === 1} stepNumber={1} stepName='Параметры' />
					<Step className='w-full' active={currentStep === 2} stepNumber={2} stepName='Водители и транспорт' />
				</div>
			}
			content={<div className='px-8 flex flex-col gap-4'>{content}</div>}
			opened={opened}
			close={closeAndReset}
		/>
	)
}
