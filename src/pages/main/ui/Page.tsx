import { Map, Sidebar } from '@/widgets/main/'

export const MainPage = () => {
	return (
		<section id='main' className='flex h-screen'>
			<section className='basis-[30%] w-[447px] shadow-xl z-10'>
				<Sidebar />
			</section>
			<Map className='grow' />
		</section>
	)
}
