import { reload } from '@/shared/helpers/reload'
import { Button } from '@/shared/ui/Button'

export const NotAuthorized = () => {
	return (
		<div className='w-full h-screen mx-auto flex flex-col justify-center items-center'>
			<h1 className='text-3xl font-bold'>Не удалось авторизоваться</h1>
			<p className='mt-4 text-lg text-center'>
				Данные пользователя введены неверно
				<br />
				либо отсутствует подключение к интернету
			</p>
			<Button className='mt-7' clickHandler={reload}>
				Перезагрузить
			</Button>
		</div>
	)
}
