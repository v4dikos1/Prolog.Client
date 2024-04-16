import { useCallback, useEffect } from 'react'
import { useSearchParams as useReactRouterSearchParams } from 'react-router-dom'

export function useUpdateSearchParams(
	key: string,
	defaultValue: string,
): [URLSearchParams, (key: string, value: string) => void] {
	const [searchParams, setSearchParams] = useReactRouterSearchParams()

	const update = useCallback(
		(key: string, value: string) => {
			searchParams.set(key, value)
			setSearchParams(searchParams)
		},
		[searchParams, setSearchParams],
	)

	useEffect(() => {
		update(key, searchParams.get(key) || defaultValue)
	}, [key, defaultValue, update, searchParams])

	return [searchParams, update]
}
