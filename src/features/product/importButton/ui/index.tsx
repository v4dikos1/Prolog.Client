import { Button } from '@/shared/ui/Button'

export const ImportProductsButton = () => {
	const importProducts = () => {
		console.log('Import products from XLSX/CSV...')
	}

	return (
		<Button category='secondary' clickHandler={importProducts}>
			Импорт товаров из XLSX/CSV
		</Button>
	)
}
