import { createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '@/shared/store'
import { VehiclesFromAPI } from './apiModel'
import { Vehicle } from './model'
import { transformVehiclesFromAPI } from './helpers'

const ROUTES = {
	vehicles: 'transports',
}

const vehiclesApi = apiSlice.enhanceEndpoints({ addTagTypes: ['Vehicles'] }).injectEndpoints({
	endpoints: (builder) => ({
		getVehicles: builder.query<Vehicle[], void>({
			query: () => ({
				url: ROUTES.vehicles,
			}),
			providesTags: (result) =>
				result
					? [...result.map(({ ID }) => ({ type: 'Vehicles', ID } as const)), { type: 'Vehicles', id: 'LIST' }]
					: [{ type: 'Vehicles', id: 'LIST' }],
			transformResponse: (response: VehiclesFromAPI) => {
				return transformVehiclesFromAPI(response)
			},
		}),
		addVehicle: builder.mutation<void, Omit<Vehicle, 'ID'>>({
			query: (vehicle) => ({
				url: ROUTES.vehicles,
				method: 'POST',
				body: {
					brand: vehicle.brand,
					volume: vehicle.volume,
					capacity: vehicle.capacity,
					fuelConsumption: vehicle.fuelConsumption,
					licencePlate: vehicle.licensePlate,
				},
			}),
			invalidatesTags: [{ type: 'Vehicles', id: 'LIST' }],
		}),
		changeVehicle: builder.mutation<void, Vehicle>({
			query: (vehicle) => ({
				url: `${ROUTES.vehicles}/${vehicle.ID}`,
				method: 'PUT',
				body: {
					brand: vehicle.brand,
					volume: vehicle.volume,
					capacity: vehicle.capacity,
					fuelConsumption: vehicle.fuelConsumption,
					licencePlate: vehicle.licensePlate,
				},
			}),
			invalidatesTags: (_, __, arg) => [
				{ type: 'Vehicles', id: arg.ID },
				{ type: 'Vehicles', id: 'LIST' },
			],
		}),
		deleteVehicles: builder.mutation<void, string[]>({
			query: (ids) => {
				const queryParams = ids.map((id) => 'TransportIds=' + id).join('&')
				return {
					url: `${ROUTES.vehicles}?${queryParams}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: [{ type: 'Vehicles', id: 'LIST' }],
		}),
	}),
})

export const { useGetVehiclesQuery, useAddVehicleMutation, useChangeVehicleMutation, useDeleteVehiclesMutation } =
	vehiclesApi

const selectVehicles = vehiclesApi.endpoints.getVehicles.select

export const getVehicleByID = createSelector([selectVehicles(), (_, ID) => ID], (vehicles, ID) => {
	if (!vehicles.data) return null
	return vehicles.data.find((vehicle) => vehicle.ID === ID)
})

export const getVehiclesAsSelectOptions = createSelector(selectVehicles(), (vehicles) =>
	vehicles.data?.map((vehicle) => ({ value: vehicle.ID, title: vehicle.brand })),
)
