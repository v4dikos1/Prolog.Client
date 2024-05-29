import { useState } from 'react'
import cx from 'classnames'
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

	const [currentStep, setCurrentStep] = useState<1 | 2 | 'success'>(1)
	const openFirst = () => setCurrentStep(1)
	const openSecond = () => setCurrentStep(2)
	const onSuccess = () => setCurrentStep('success')

	const content = {
		1: <StepOne form={form} setForm={setForm} next={openSecond} />,
		2: <StepTwo onSuccess={onSuccess} form={form} setForm={setForm} prev={openFirst} />,
		success: null,
	}

	const title = {
		1: 'Запуск планирования',
		2: 'Запуск планирования',
		success: 'Планирование запущено',
	}

	const closeAndReset = () => {
		setTimeout(() => {
			setCurrentStep(1)
			setForm(defaultFromState)
		}, 500)

		close()
	}

	return (
		<ModalTemplate
			className={cx('max-h-none', {
				'overflow-hidden flex flex-col': currentStep === 2,
				'overflow-hidden rounded-lg': currentStep === 'success',
			})}
			mainClassName={currentStep === 2 ? 'overflow-auto scrollable' : ''}
			titleContent={title[currentStep]}
			headerContent={
				currentStep === 'success' ? (
					<p className='mt-1 text-gray-500 text-sm mb-2'>
						Ожидайте уведомление, когда заявки перейдут в статус «Активные»
					</p>
				) : (
					<div className='flex gap-8 w-full mt-3'>
						<Step className='w-full' active={currentStep === 1} stepNumber={1} stepName='Параметры' />
						<Step className='w-full' active={currentStep === 2} stepNumber={2} stepName='Водители и транспорт' />
					</div>
				)
			}
			content={content[currentStep] && <div className='px-8 flex flex-col gap-4'>{content[currentStep]}</div>}
			opened={opened}
			close={closeAndReset}
		/>
	)
}
