export const getTime = (str: string) => {
	const date = new Date(str)
	const hours = date.getHours()
	const minutes = String(date.getMinutes()).padStart(2, '0')
	return `${hours}:${minutes}`
}
