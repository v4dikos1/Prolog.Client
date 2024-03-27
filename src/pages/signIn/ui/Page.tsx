import { useState } from 'react'
import cx from 'classnames'
import { Button } from '@/shared/ui/Button'
import { auth } from '../api'

export const SignInPage = () => {
	const [loading, setLoading] = useState(false)
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		auth()
	}

	return (
		<section id='sign-in' className='flex justify-center items-center h-screen bg-gray-800'>
			<div className='bg-white flex flex-col items-center py-8 px-10 rounded-lg w-full max-w-[448px] shadow-lg'>
				<h1 className='text-gray-900 text-2xl font-semibold uppercase'>Prolog</h1>
				<form className='w-full mt-6 flex flex-col gap-4' method='POST' onSubmit={submitHandler}>
					<Button className={cx({ 'bg-slate-300': loading })} loading={loading} type='submit'>
						Войти
					</Button>
				</form>
			</div>
		</section>
	)
}
