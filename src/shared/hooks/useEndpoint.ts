import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { ApiEndpointQuery, BaseQueryFn, EndpointDefinitions, QueryDefinition } from '@reduxjs/toolkit/query'

type Props<QueryArg, ResultType> = {
	endpoint: ApiEndpointQuery<QueryDefinition<QueryArg, BaseQueryFn, never, ResultType, 'api'>, EndpointDefinitions>
	arg: QueryArg
}

type Return<Data> = {
	data: Data | undefined
	isLoading: boolean
}

export const useEndpoint = <QueryArg, ResultType>(props: Props<QueryArg, ResultType>): Return<ResultType> => {
	const { endpoint, arg } = props
	const dispatch = useAppDispatch()
	const selectedData = endpoint.select(arg)

	const { data, isUninitialized, isLoading } = useAppSelector(selectedData)

	useEffect(() => {
		if (isUninitialized) {
			dispatch(endpoint.initiate(arg))
		}
	}, [dispatch, isUninitialized, arg, endpoint])

	return { data, isLoading }
}
