export const auth = async (username: string, password: string) => {
	console.log(username, password)
	const response = await fetch('https://identity.krsk-prolog.ru/realms/prolog/protocol/openid-connect/auth')
	console.log(response)
}
