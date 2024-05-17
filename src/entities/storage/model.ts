type StorageBase = {
	ID: string
	name: string
}

export type Storage = StorageBase & {
	address: string
}

export type StorageInOrder = StorageBase & {
	coordinates: string
}
