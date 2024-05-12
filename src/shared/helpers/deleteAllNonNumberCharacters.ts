export const deleteAllNonNumberCharacters = (str: string) => {
	return str.replace(/[^0-9]/g, '')
}
