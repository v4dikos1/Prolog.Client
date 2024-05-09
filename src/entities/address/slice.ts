import { apiSlice } from '@/shared/store'
import { Address } from './model'

const ROUTES = {
	addresses: 'addresses/fullname',
}

const addressApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAddresses: builder.query<Address[], string>({
			query: (query) => ({
				url: ROUTES.addresses + '?Query=' + query,
			}),
		}),
	}),
})

export const { useGetAddressesQuery, useLazyGetAddressesQuery } = addressApi
