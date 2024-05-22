import { Sidebar, Settings } from '@/widgets/main'
import { Map } from '@/widgets/map'

export const MainPage = () => {
	return (
		<section id='main' className='flex h-screen flex-col md:flex-row'>
			<section className='grow h-full relative md:order-1'>
				<Map />
				<Settings className='absolute top-4 left-4 z-20' />
			</section>
			<section className='h-3/5 w-full min-w-[410px] shrink-0 shadow-xl md:basis-[30%] md:w-[447px] md:h-screen'>
				<Sidebar className='w-full h-full' />
			</section>
		</section>
	)
}
