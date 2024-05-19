import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { getUser } from '@/shared/helpers/getUser'

const BASE_URL = 'https://krsk-prolog.ru/api/admin/'

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'

type QueryType<B> = {
	url: string
	method?: Method
	body?: B
}

const handleGetAndPost = async (response: Response) => {
	const data = await response.json()
	if (response.status !== 200) throw new Error(data.Message)

	return {
		data,
	}
}

const handlePutDeleteAndPatch = async (response: Response) => {
	if (response.status !== 200) {
		const data = await response.json()
		throw new Error(data.Message)
	}

	return {
		data: 'Success',
	}
}

const responseHandlers = {
	PUT: handlePutDeleteAndPatch,
	DELETE: handlePutDeleteAndPatch,
	GET: handleGetAndPost,
	POST: handleGetAndPost,
	PATCH: handlePutDeleteAndPatch,
}

export const apiBaseQuery = <B>(): BaseQueryFn<QueryType<B>, unknown, unknown> => {
	return async <B>({ url, method = 'GET', body }: QueryType<B>) => {
		const user = getUser()
		const token = user?.access_token

		try {
			if (user === null) throw new Error('Пользователь не авторизован')

			const response = await fetch(BASE_URL + url, {
				method,
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})

			const result = await responseHandlers[method](response)
			return result
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
