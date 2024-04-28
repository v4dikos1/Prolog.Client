export const formatDate = (date?: Date) => {
	if (!date) return ''
	return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(date)
}

export const clickOutside = (event: MouseEvent, id: string) => {
	return (
		event.target &&
		'closest' in event.target &&
		typeof event.target.closest === 'function' &&
		event.target.closest('#' + id) === null
	)
}

export const todayBtnClick = (event: MouseEvent, id: string) => {
	return (
		event.target &&
		'textContent' in event.target &&
		event.target.textContent === 'Сегодня' &&
		'closest' in event.target &&
		typeof event.target.closest === 'function' &&
		event.target.closest('#' + id)
	)
}
