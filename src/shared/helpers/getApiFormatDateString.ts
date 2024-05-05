export const getApiFormatDateString = (date: Date, time: string) => {
	const [hours, minutes] = time.split(':')

	date.setHours(Number(hours))
	date.setMinutes(Number(minutes))

	return date.toJSON()
}
