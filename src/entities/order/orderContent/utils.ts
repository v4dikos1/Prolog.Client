export const formatPrice = (price: number) => {
	const formatter = new Intl.NumberFormat('ru', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0,
	})
	return formatter.format(price)
}

export const getTime = (date: Date) => {
	const hours = date.getHours()
	const minutes = String(date.getMinutes()).padStart(2, '0')
	return `${hours}:${minutes}`
}
