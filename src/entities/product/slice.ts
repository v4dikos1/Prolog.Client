import { createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '@/shared/store'
import { ProductsFromAPI } from './apiModel'
import { Product } from './model'
import { transformProductsFromAPI } from './helpers'

const ROUTES = {
	products: 'products',
}

const productsApi = apiSlice.enhanceEndpoints({ addTagTypes: ['Products'] }).injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<Product[], void>({
			query: () => ({
				url: ROUTES.products,
			}),
			providesTags: (result) =>
				result
					? [...result.map(({ ID }) => ({ type: 'Products', ID } as const)), { type: 'Products', id: 'LIST' }]
					: [{ type: 'Products', id: 'LIST' }],
			transformResponse: (response: ProductsFromAPI) => {
				return transformProductsFromAPI(response)
			},
		}),
		addProduct: builder.mutation<void, Omit<Product, 'ID'>>({
			query: (product) => ({
				url: ROUTES.products,
				method: 'POST',
				body: {
					name: product.name,
					code: product.code,
					volume: product.volume,
					weight: product.weight,
					price: product.price,
				},
			}),
			invalidatesTags: [{ type: 'Products', id: 'LIST' }],
		}),
		changeProduct: builder.mutation<void, Product>({
			query: (product) => ({
				url: `${ROUTES.products}/${product.ID}`,
				method: 'PUT',
				body: {
					name: product.name,
					code: product.code,
					price: product.price,
					weight: product.weight,
					volume: product.volume,
				},
			}),
			invalidatesTags: (_, __, arg) => [
				{ type: 'Products', id: arg.ID },
				{ type: 'Products', id: 'LIST' },
			],
		}),
		deleteProducts: builder.mutation<void, string[]>({
			query: (ids) => {
				const queryParams = ids.map((id) => 'ProductIds=' + id).join('&')
				return {
					url: `${ROUTES.products}?${queryParams}`,
					method: 'DELETE',
				}
			},
			invalidatesTags: [{ type: 'Products', id: 'LIST' }],
		}),
	}),
})

export const { useGetProductsQuery } = productsApi
export const { useAddProductMutation, useChangeProductMutation, useDeleteProductsMutation } = productsApi

const selectProducts = productsApi.endpoints.getProducts.select

export const getProductByID = createSelector([selectProducts(), (_, ID) => ID], (products, ID) => {
	if (!products.data) return null
	return products.data.find((product) => product.ID === ID)
})
