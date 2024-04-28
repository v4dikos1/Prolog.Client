import { useCallback, useState } from 'react'
import { Tooltip } from './Tooltip'
import { Button } from './Button'

interface Props {
	className?: string
}

export const Settings = ({ className }: Props) => {
	const [tooltipOpened, setTooltipOpened] = useState(false)

	const closeTooltip = useCallback(() => setTooltipOpened(false), [])
	const toogleTooltip = useCallback(() => setTooltipOpened((tooltipOpened) => !tooltipOpened), [])

	return (
		<div className={className}>
			<Button clickHandler={toogleTooltip} />
			<Tooltip
				className='-bottom-10 relative right-0'
				open={tooltipOpened}
				id='settings-tooltip'
				close={closeTooltip}
			/>
		</div>
	)
}
