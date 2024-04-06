export const formatPrice = (price: number) => {
	const formatter = new Intl.NumberFormat('ru', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0,
	})
	return formatter.format(price)
}
