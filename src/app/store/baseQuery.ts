import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { getUser } from '@/shared/utils/getUser'

const BASE_URL = 'https://krsk-prolog.ru/api/admin/'

export const apiBaseQuery = (): BaseQueryFn<{ url: string }, unknown, unknown> => {
	return async ({ url }) => {
		const user = getUser()
		const token = user?.access_token

		try {
			const response = await fetch(BASE_URL + url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			const data = await response.json()

			return {
				data,
			}
		} catch (e) {
			return {
				error: {
					reason: e,
				},
			}
		}
	}
}
