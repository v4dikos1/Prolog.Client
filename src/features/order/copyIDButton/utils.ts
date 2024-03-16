export const copyIDtoClipboard = (id: string) => {
	navigator.clipboard.writeText(id)
}
