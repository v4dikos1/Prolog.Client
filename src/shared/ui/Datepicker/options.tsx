import { IOptions } from 'tailwind-datepicker-react/types/Options'
import { ChevronDownIcon } from '@/shared/ui/icons/ChevronDownIcon'

export const options: IOptions = {
	autoHide: true,
	todayBtn: true,
	todayBtnText: 'Сегодня',
	clearBtn: false,
	theme: {
		background: '!bg-white',
		todayBtn: 'transition-colors !bg-indigo-600 hover:!bg-indigo-700 !outline-none !border-none focus:!ring-0',
		clearBtn:
			'transition-colors !bg-gray-200 !text-gray-700 border-none !outline-none hover:!bg-gray-300 focus:!ring-0',
		icons: '!bg-white !text-gray-900 border-none hover:!bg-gray-100 focus:!ring-0 focus:!bg-gray-100',
		text: '!text-gray-900 hover:!bg-gray-100',
		input: '',
		inputIcon: '',
		disabledText: '!text-gray-300 hover:!bg-gray-100',
		selected: '!bg-indigo-600 !text-white hover:!bg-indigo-600',
	},
	icons: {
		prev: () => <ChevronDownIcon className='rotate-90' pathClassName='stroke-gray-400' />,
		next: () => <ChevronDownIcon className='-rotate-90' pathClassName='stroke-gray-400' />,
	},
	datepickerClassNames: '-top-20 -translate-y-1/2',
	defaultDate: new Date(),
	language: 'ru',
	disabledDates: [],
	weekDays: ['Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
}
