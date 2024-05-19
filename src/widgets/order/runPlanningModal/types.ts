export interface Form {
	date?: Date
	start: string
	end: string
	binds: {
		driverID: string
		vehicleID: string
		storageID: string
	}[]
}

export const defaultFromState: Form = {
	start: '',
	end: '',
	binds: [
		{
			driverID: '',
			vehicleID: '',
			storageID: '',
		},
	],
}
