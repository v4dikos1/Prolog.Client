import { Button } from '@/shared/ui/Button'

export const ImportOrdersButton = () => {
	const importOrders = () => {
		console.log('Import orders from XLSX/CSV...')
	}

	return (
		<Button category='secondary' clickHandler={importOrders}>
			Импорт заявок из XLSX/CSV
		</Button>
	)
}
