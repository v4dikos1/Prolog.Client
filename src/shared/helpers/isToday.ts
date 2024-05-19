export const isToday = (date: Date) => {
	const formatter = new Intl.DateTimeFormat()
	return formatter.format(date) === formatter.format(new Date())
}
