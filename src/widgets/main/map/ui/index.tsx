import cx from 'classnames'
import mapImageSrc from '../assets/map.png'

interface Props {
	className?: string
}

export const Map = ({ className }: Props) => {
	return (
		<section id='map' className={cx(className, 'h-full')}>
			<img src={mapImageSrc} className='w-full h-full object-cover' />
		</section>
	)
}
