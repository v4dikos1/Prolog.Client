import { SpinnerIcon } from './icons/SpinnerIcon'

export const Authorization = () => {
	return (
		<div className='w-full h-screen mx-auto flex flex-col justify-center items-center'>
			<h1 className='text-3xl font-bold'>Авторизация</h1>
			<p className='mt-4 text-lg text-center'>Происходит авторизация пользователя</p>
			<SpinnerIcon className='mt-7' pathClassName='fill-indigo-600' />
		</div>
	)
}
