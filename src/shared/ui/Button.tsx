import * as React from 'react'

interface Props {
	children: React.ReactNode
	className?: string
}

export const Button = ({ children }: Props) => {
	return <button className=''>{children}</button>
}
