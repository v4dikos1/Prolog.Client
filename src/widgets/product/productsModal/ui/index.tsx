import { useState } from 'react'
import cx from 'classnames'
import { ModalTemplate, ModalTitleButton } from '@/shared/ui/ModalTemplate/'
import { Main } from './Main'
import { Addition } from './Addition'
import { Changing } from './Changing'

interface Props {
	opened: boolean
	close: () => void
	state?: 'main' | 'addition' | 'changing'
}

export const ProductsModal = ({ opened, close, state = 'main' }: Props) => {
	const [search, setSearch] = useState('')
	const [modalState, setModalState] = useState<'main' | 'addition' | 'changing'>(state)
	const [changingProductID, setChangingProductID] = useState<null | string>(null)

	const openMain = () => setModalState('main')
	const openAddition = () => {
		setModalState('addition')
		setSearch('')
	}
	const openChanging = (id: string) => {
		setChangingProductID(id)
		setSearch('')
		setModalState('changing')
	}

	const titleContent = {
		main: 'Товары',
		addition: <ModalTitleButton back={openMain} text='Добавить товар' />,
		changing: <ModalTitleButton back={openMain} text='Изменить товар' />,
	}

	const content = {
		main: <Main search={search} setSearch={setSearch} openAddition={openAddition} openChanging={openChanging} />,
		addition: <Addition back={openMain} />,
		changing: <Changing back={openMain} ID={changingProductID} />,
	}

	const closeAndReset = () => {
		setTimeout(() => {
			setModalState('main')
			setSearch('')
		}, 500)
		close()
	}

	return (
		<ModalTemplate
			className={cx('overflow-hidden flex flex-col', { 'h-[90%]': modalState === 'main' })}
			mainClassName='overflow-hidden'
			titleContent={titleContent[modalState]}
			content={content[modalState]}
			opened={opened}
			close={closeAndReset}
		/>
	)
}
