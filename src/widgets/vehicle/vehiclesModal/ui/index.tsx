import { useState } from 'react'
import { ModalTemplate, ModalTitleButton } from '@/shared/ui/ModalTemplate/'
import { Main } from './Main'
import { Addition } from './Addition'
import { Changing } from './Changing'

interface Props {
	opened: boolean
	close: () => void
}

export const VehiclesModal = ({ opened, close }: Props) => {
	const [modalState, setModalState] = useState<'main' | 'addition' | 'changing'>('main')
	const [changingVehicleID, setChangingVehicleID] = useState<null | string>(null)

	const openMain = () => setModalState('main')
	const openAddition = () => setModalState('addition')
	const openChanging = (id: string) => {
		setChangingVehicleID(id)
		setModalState('changing')
	}

	const titleContent = {
		main: 'Транспортные средства',
		addition: <ModalTitleButton back={openMain} text='Добавить транспортное средство' />,
		changing: <ModalTitleButton back={openMain} text='Изменить данные транспортного средства' />,
	}

	const content = {
		main: <Main openAddition={openAddition} openChanging={openChanging} />,
		addition: <Addition back={openMain} />,
		changing: <Changing back={openMain} ID={changingVehicleID} />,
	}

	const closeAndReset = () => {
		close()
	}

	return (
		<ModalTemplate
			titleContent={titleContent[modalState]}
			content={content[modalState]}
			opened={opened}
			close={closeAndReset}
		/>
	)
}
