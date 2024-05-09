export type { ProductsFromAPI } from './apiModel'
export type { Product } from './model'
export { transformProductsFromAPI, filterProduct } from './helpers'
export {
	useGetProductsQuery,
	useAddProductMutation,
	useChangeProductMutation,
	useDeleteProductsMutation,
	getProductByID,
} from './slice'
