export type { StoragesFromAPI } from './apiModel'
export type { Storage, StorageInOrder } from './model'
export { transformStoragesFromAPI } from './helpers'
export {
	useGetStoragesQuery,
	useAddStorageMutation,
	useChangeStorageMutation,
	useDeleteStoragesMutation,
	getStorageByID,
	getStoragesAsSelectOptions,
} from './slice'
