import { createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '@/shared/store'
import { ClientsFromAPI } from './apiModel'
import { Client } from './model'
import { transformClientsFromAPI } from './helpers'

const ROUTES = {
	clients: 'customers',
}

const clientsApi = apiSlice.enhanceEndpoints({ addTagTypes: ['Clients'] }).injectEndpoints({
	endpoints: (builder) => ({
		getClients: builder.query<Client[], void>({
			query: () => ({
				url: ROUTES.clients,
			}),
			providesTags: (result) =>
				result
					? [...result.map(({ ID }) => ({ type: 'Clients', ID } as const)), { type: 'Clients', id: 'LIST' }]
					: [{ type: 'Clients', id: 'LIST' }],
			transformResponse: (response: ClientsFromAPI) => {
				return transformClientsFromAPI(response)
			},
		}),
		addClient: builder.mutation<void, Omit<Client, 'ID'>>({
			query: ({ name, phone }) => ({
				url: ROUTES.clients,
				method: 'POST',
				body: {
					name: name,
					phoneNumber: phone,
				},
			}),
			invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
		}),
		changeClient: builder.mutation<void, Client>({
			query: ({ ID, name, phone }) => ({
				url: `${ROUTES.clients}/${ID}`,
				method: 'PUT',
				body: {
					name,
					phoneNumber: phone,
				},
			}),
			invalidatesTags: (_, __, arg) => [
				{ type: 'Clients', id: arg.ID },
				{ type: 'Clients', id: 'LIST' },
			],
		}),
		deleteClients: builder.mutation<void, string[]>({
			query: (ids) => {
				const queryParams = ids.map((id) => 'CustomerIds=' + id).join('&')
				return {
					url: `${ROUTES.clients}?${queryParams}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
		}),
	}),
})

export const { useGetClientsQuery } = clientsApi
export const { useAddClientMutation, useChangeClientMutation, useDeleteClientsMutation } = clientsApi

const selectClients = clientsApi.endpoints.getClients.select

export const getClientByID = createSelector([selectClients(), (_, ID) => ID], (clients, ID) => {
	if (!clients.data) return null
	return clients.data.find((client) => client.ID === ID)
})

export const getClientsAsSelectOptions = createSelector(selectClients(), (clients) =>
	clients.data?.map((client) => ({ value: client.ID, title: client.name })),
)
