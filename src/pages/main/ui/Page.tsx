import { Map, Sidebar, Settings } from '@/widgets/main'

export const MainPage = () => {
	return (
		<section id='main' className='flex h-screen'>
			<section className='relative basis-[30%] w-[447px] shadow-xl z-10'>
				<Settings className='absolute top-4 -right-4 z-20 translate-x-full' />
				<Sidebar />
			</section>
			<Map className='grow' />
		</section>
	)
}
