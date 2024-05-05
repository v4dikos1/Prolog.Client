import { createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '@/shared/store'
import { DriversFromAPI } from './apiModel'
import { Driver } from './model'
import { transformDriversFromAPI } from './helpers'

const ROUTES = {
	drivers: 'drivers',
}

const driverApi = apiSlice.enhanceEndpoints({ addTagTypes: ['Drivers'] }).injectEndpoints({
	endpoints: (builder) => ({
		getDrivers: builder.query<Driver[], void>({
			query: () => ({
				url: ROUTES.drivers,
			}),
			providesTags: (result) =>
				result
					? [...result.map(({ ID }) => ({ type: 'Drivers', ID } as const)), { type: 'Drivers', id: 'LIST' }]
					: [{ type: 'Drivers', id: 'LIST' }],
			transformResponse: (response: DriversFromAPI) => {
				return transformDriversFromAPI(response)
			},
		}),
		addDriver: builder.mutation<void, Omit<Driver, 'ID'>>({
			query: (driver) => ({
				url: ROUTES.drivers,
				method: 'POST',
				body: {
					name: driver.name,
					surname: driver.surname,
					patronymic: driver.patronymic,
					phoneNumber: driver.phone,
					telegram: driver.telegram,
					salary: driver.salary,
				},
			}),
			invalidatesTags: [{ type: 'Drivers', id: 'LIST' }],
		}),
		changeDriver: builder.mutation<void, Driver>({
			query: (driver) => ({
				url: `${ROUTES.drivers}/${driver.ID}`,
				method: 'PUT',
				body: {
					name: driver.name,
					surname: driver.surname,
					patronymic: driver.patronymic,
					phoneNumber: driver.phone,
					telegram: driver.telegram,
					salary: driver.salary,
				},
			}),
			invalidatesTags: (_, __, arg) => [
				{ type: 'Drivers', id: arg.ID },
				{ type: 'Drivers', id: 'LIST' },
			],
		}),
		deleteDrivers: builder.mutation<void, string[]>({
			query: (ids) => {
				const queryParams = ids.map((id) => 'DriverIds=' + id).join('&')
				return {
					url: `${ROUTES.drivers}?${queryParams}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: [{ type: 'Drivers', id: 'LIST' }],
		}),
	}),
})

export const { useGetDriversQuery, useAddDriverMutation, useChangeDriverMutation, useDeleteDriversMutation } = driverApi

const selectDrivers = driverApi.endpoints.getDrivers.select

export const getDriverByID = createSelector([selectDrivers(), (_, ID) => ID], (drivers, ID) => {
	if (!drivers.data) return null
	return drivers.data.find((driver) => driver.ID === ID)
})

export const getDriversAsSelectOptions = createSelector(selectDrivers(), (drivers) =>
	drivers.data?.map((driver) => ({ value: driver.ID, title: `${driver.surname} ${driver.name} ${driver.patronymic}` })),
)
