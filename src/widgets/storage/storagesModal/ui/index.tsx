import { useState } from 'react'
import { ModalTemplate, ModalTitleButton } from '@/shared/ui/ModalTemplate/'
import { Main } from './Main'
import { Addition } from './Addition'
import { Changing } from './Changing'

interface Props {
	opened: boolean
	close: () => void
}

export const StoragesModal = ({ opened, close }: Props) => {
	const [modalState, setModalState] = useState<'main' | 'addition' | 'changing'>('main')
	const [changingStorageID, setChangingStorageID] = useState<null | string>(null)

	const openMain = () => setModalState('main')
	const openAddition = () => setModalState('addition')
	const openChanging = (id: string) => {
		setChangingStorageID(id)
		setModalState('changing')
	}

	const titleContent = {
		main: 'Склады',
		addition: <ModalTitleButton back={openMain} text='Добавить склад' />,
		changing: <ModalTitleButton back={openMain} text='Изменить данные склада' />,
	}

	const content = {
		main: <Main openAddition={openAddition} openChanging={openChanging} />,
		addition: <Addition back={openMain} />,
		changing: <Changing back={openMain} ID={changingStorageID} />,
	}

	const closeAndReset = () => {
		setTimeout(() => {
			setModalState('main')
		}, 500)
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
