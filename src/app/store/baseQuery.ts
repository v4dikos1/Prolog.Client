import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { getUser } from '@/shared/utils/getUser'

const BASE_URL = 'https://krsk-prolog.ru/api/admin/'

type QueryType<B> = {
	url: string
	method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
	body?: B
}

export const apiBaseQuery = <B>(): BaseQueryFn<QueryType<B>, unknown, unknown> => {
	return async <B>({ url, method = 'GET', body }: QueryType<B>) => {
		const user = getUser()
		const token = user?.access_token

		try {
			const response = await fetch(BASE_URL + url, {
				method: method,
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})

			if (method === 'PUT' || method === 'DELETE') return {}

			const data = await response.json()
			if (response.status !== 200) throw new Error(data.message)

			return {
				data,
			}
		} catch (e) {
			const reason = e && typeof e === 'object' && 'message' in e ? e.message : e
			return {
				error: {
					reason,
				},
			}
		}
	}
}
