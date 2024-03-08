import { Map, Sidebar } from '@/widgets/main/'

export const MainPage = () => {
	return (
		<section id='main' className='flex h-screen'>
			<Sidebar className='basis-[30%] w-[447px]' />
			<Map className='grow' />
		</section>
	)
}
