import { useState } from 'react'
import cx from 'classnames'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

export const SignInPage = () => {
	const [loading, setLoading] = useState(false)
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const username = formData.get('username') as string
		const password = formData.get('password') as string
		e.currentTarget.reset()
		setLoading(true)
		console.log(username, password)
	}

	return (
		<section id='sign-in' className='flex justify-center items-center h-screen bg-gray-800'>
			<div className='bg-white flex flex-col items-center py-8 px-10 rounded-lg w-full max-w-[448px] shadow-lg'>
				<h1 className='text-gray-900 text-2xl font-semibold uppercase'>Prolog</h1>
				<form className='w-full mt-6 flex flex-col gap-4' method='POST' onSubmit={submitHandler}>
					<Input name='username' placeholder='Логин' />
					<Input autocomplete='off' name='password' type='password' placeholder='Пароль' />
					<Button className={cx({ 'bg-slate-300': loading })} loading={loading} type='submit'>
						Войти
					</Button>
				</form>
			</div>
		</section>
	)
}
