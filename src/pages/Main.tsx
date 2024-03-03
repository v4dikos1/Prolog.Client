import { useState } from 'react'
import { Input } from '../shared/ui/Input'
import { Tab } from '@/shared/ui/Tab'
import { SearchInput } from '../shared/ui/SearchInput'

export const Main = () => {
	const [value, setValue] = useState('')

	return (
		<section id='main' className='p-5'>
			<h1 className='text-3xl mb-4 mt-2'>Главная</h1>
			<Tab active>Входящие (89)</Tab>
			<Tab>Активные (78)</Tab>
			<Tab>Выполненные (240)</Tab>
			<Input value={value} changeHandler={(event) => setValue(event.target.value)} placeholder='Склад' />
			<SearchInput />
		</section>
	)
}
