import { removeTokenParams } from '@/shared/helpers/removeTokenParams'

export const reload = () => {
	removeTokenParams()
	window.localStorage.clear()
	window.location.reload()
}
