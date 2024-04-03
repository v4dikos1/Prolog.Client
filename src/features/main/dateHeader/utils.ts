export const formatDate = (str: string) => {
	const date = new Date(str)
	const formatter = new Intl.DateTimeFormat('ru-RU', {
		weekday: 'short',
		day: 'numeric',
		month: 'long',
	})

	let formattedDate = formatter.format(date)
	if (isToday(date)) {
		formattedDate += ' (сегодня)'
	}

	return formattedDate
}

const isToday = (date: Date) => {
	const formatter = new Intl.DateTimeFormat()
	return formatter.format(date) === formatter.format(new Date())
}
