export type { ClientsFromAPI } from './apiModel'
export type { Client, ClientInOrder } from './model'
export { transformClientsFromAPI } from './helpers'
export {
	useGetClientsQuery,
	useAddClientMutation,
	useChangeClientMutation,
	useDeleteClientsMutation,
	getClientByID,
	getClientsAsSelectOptions,
} from './slice'
