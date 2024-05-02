import { useState } from 'react'
import { ModalTemplate, ModalTitleButton } from '@/shared/ui/ModalTemplate/'
import { Main } from './Main'
import { Addition } from './Addition'
import { Changing } from './Changing'

interface Props {
	opened: boolean
	close: () => void
}

export const ProductsModal = ({ opened, close }: Props) => {
	const [modalState, setModalState] = useState<'main' | 'addition' | 'changing'>('main')
	const [changingProductID, setChangingProductID] = useState<null | string>(null)

	const openMain = () => setModalState('main')
	const openAddition = () => setModalState('addition')
	const openChanging = (id: string) => {
		setChangingProductID(id)
		setModalState('changing')
	}

	const titleContent = {
		main: 'Товары',
		addition: <ModalTitleButton back={openMain} text='Добавить товар' />,
		changing: <ModalTitleButton back={openMain} text='Изменить товар' />,
	}

	const content = {
		main: <Main openAddition={openAddition} openChanging={openChanging} />,
		addition: <Addition back={openMain} />,
		changing: <Changing back={openMain} ID={changingProductID} />,
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
