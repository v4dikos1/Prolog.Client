export type Client = {
	ID: string
	name: string
	phone: string
}

export type ClientInOrder = Client & {
	address: string
	coordinates: string
}
