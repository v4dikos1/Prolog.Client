import { useState } from 'react'
import { ModalTemplate, ModalTitleButton } from '@/shared/ui/ModalTemplate/'
import { Main } from './Main'
import { Addition } from './Addition'
import { Changing } from './Changing'

interface Props {
	opened: boolean
	close: () => void
}

export const ClientsModal = ({ opened, close }: Props) => {
	const [modalState, setModalState] = useState<'main' | 'addition' | 'changing'>('main')
	const [changingClientID, setChangingClientID] = useState<null | string>(null)

	const openMain = () => setModalState('main')
	const openAddition = () => setModalState('addition')
	const openChanging = (id: string) => {
		setChangingClientID(id)
		setModalState('changing')
	}

	const titleContent = {
		main: 'Клиенты',
		addition: <ModalTitleButton back={openMain} text='Добавить клиента' />,
		changing: <ModalTitleButton back={openMain} text='Изменить данные клиента' />,
	}

	const content = {
		main: <Main openAddition={openAddition} openChanging={openChanging} />,
		addition: <Addition back={openMain} />,
		changing: <Changing back={openMain} ID={changingClientID} />,
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
