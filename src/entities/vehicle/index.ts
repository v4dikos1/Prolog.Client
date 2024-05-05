export type { Vehicle } from './model'
export type { VehiclesFromAPI } from './apiModel'
export { transformVehiclesFromAPI } from './helpers'
export {
	useGetVehiclesQuery,
	useAddVehicleMutation,
	useChangeVehicleMutation,
	useDeleteVehiclesMutation,
	getVehicleByID,
	getVehiclesAsSelectOptions,
} from './slice'
