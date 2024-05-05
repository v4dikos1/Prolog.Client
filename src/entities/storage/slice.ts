import { createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '@/shared/store'
import { StoragesFromAPI } from './apiModel'
import { Storage } from './model'
import { transformStoragesFromAPI } from './helpers'

const ROUTES = {
	storages: 'storages',
}

const storagesApi = apiSlice.enhanceEndpoints({ addTagTypes: ['Storages'] }).injectEndpoints({
	endpoints: (builder) => ({
		getStorages: builder.query<Storage[], void>({
			query: () => ({
				url: ROUTES.storages,
			}),
			providesTags: (result) =>
				result
					? [...result.map(({ ID }) => ({ type: 'Storages', ID } as const)), { type: 'Storages', id: 'LIST' }]
					: [{ type: 'Storages', id: 'LIST' }],
			transformResponse: (response: StoragesFromAPI) => {
				return transformStoragesFromAPI(response)
			},
		}),
		addStorage: builder.mutation<void, Omit<Storage, 'ID'>>({
			query: ({ name, address }) => ({
				url: ROUTES.storages,
				method: 'POST',
				body: {
					name,
					address,
				},
			}),
			invalidatesTags: [{ type: 'Storages', id: 'LIST' }],
		}),
		changeStorage: builder.mutation<void, Storage>({
			query: (storage) => ({
				url: `${ROUTES.storages}/${storage.ID}`,
				method: 'PUT',
				body: {
					name: storage.name,
					address: storage.address,
				},
			}),
			invalidatesTags: (_, __, arg) => [
				{ type: 'Storages', id: arg.ID },
				{ type: 'Storages', id: 'LIST' },
			],
		}),
		deleteStorages: builder.mutation<void, string[]>({
			query: (ids) => {
				const queryParams = ids.map((id) => 'StorageIds=' + id).join('&')
				return {
					url: `${ROUTES.storages}?${queryParams}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: [{ type: 'Storages', id: 'LIST' }],
		}),
	}),
})

export const { useGetStoragesQuery } = storagesApi
export const { useAddStorageMutation, useChangeStorageMutation, useDeleteStoragesMutation } = storagesApi

const selectStorages = storagesApi.endpoints.getStorages.select

export const getStorageByID = createSelector([selectStorages(), (_, ID) => ID], (storages, ID) => {
	if (!storages.data) return null
	return storages.data.find((storage) => storage.ID === ID)
})

export const getStoragesAsSelectOptions = createSelector(selectStorages(), (storages) =>
	storages.data?.map((storage) => ({ value: storage.ID, title: storage.name })),
)
