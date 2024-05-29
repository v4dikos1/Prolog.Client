import { useState } from 'react'
import cx from 'classnames'

import { Addition } from '@/widgets/product'
import { ModalTemplate, ModalTitleButton } from '@/shared/ui/ModalTemplate/'
import { Step } from '@/shared/ui/Step'
import { StepOne } from './StepOne'
import { StepTwo } from './StepTwo'
import { Form, defaultFromState } from '../types'

interface Props {
	opened: boolean
	close: () => void
}

export const CreateOrderModal = ({ opened, close }: Props) => {
	const [form, setForm] = useState<Form>(defaultFromState)
	const [datepickerOpened, setDatepickerOpened] = useState(false)
	const [currentStep, setCurrentStep] = useState<'details' | 'products' | 'addition'>('details')
	const openDetails = () => setCurrentStep('details')
	const openProducts = () => setCurrentStep('products')
	const openAddition = () => setCurrentStep('addition')

	const title = {
		details: 'Создать заявку',
		products: 'Создать заявку',
		addition: <ModalTitleButton back={openProducts} text='Добавить товар' />,
	}

	const closeAndReset = () => {
		setTimeout(() => {
			setForm(defaultFromState)
			openDetails()
		}, 500)
		close()
	}

	const content = {
		details: <StepOne setDatepickerOpened={setDatepickerOpened} form={form} setForm={setForm} next={openProducts} />,
		products: (
			<StepTwo close={closeAndReset} openAddition={openAddition} form={form} setForm={setForm} prev={openDetails} />
		),
		addition: <Addition back={openProducts} />,
	}

	return (
		<ModalTemplate
			excludeBackdropClosing={datepickerOpened}
			className={cx('max-h-none', {
				'md:overflow-hidden md:!max-h-[90%] flex flex-col md:h-[90%]': currentStep === 'products',
				'lg:!max-[90%]': currentStep === 'details',
			})}
			mainClassName={cx({ 'overflow-hidden ': currentStep === 'products' })}
			titleContent={title[currentStep]}
			headerContent={
				currentStep !== 'addition' && (
					<div className='flex gap-8 w-full mt-3'>
						<Step className='w-full' active={currentStep === 'details'} stepNumber={1} stepName='Сведения о заявке' />
						<Step className='w-full' active={currentStep === 'products'} stepNumber={2} stepName='Товары' />
					</div>
				)
			}
			content={content[currentStep]}
			opened={opened}
			close={closeAndReset}
		/>
	)
}
