interface Props {
	className?: string
}

export const CheckIcon = ({ className }: Props) => {
	return (
		<svg className={className} width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M9.20692 0.792787C9.39439 0.980314 9.49971 1.23462 9.49971 1.49979C9.49971 1.76495 9.39439 2.01926 9.20692 2.20679L4.20692 7.20679C4.01939 7.39426 3.76508 7.49957 3.49992 7.49957C3.23475 7.49957 2.98045 7.39426 2.79292 7.20679L0.792919 5.20679C0.610761 5.01818 0.509966 4.76558 0.512245 4.50339C0.514523 4.24119 0.619692 3.99038 0.8051 3.80497C0.990508 3.61956 1.24132 3.51439 1.50352 3.51211C1.76571 3.50983 2.01832 3.61063 2.20692 3.79279L3.49992 5.08579L7.79292 0.792787C7.98045 0.605316 8.23475 0.5 8.49992 0.5C8.76508 0.5 9.01939 0.605316 9.20692 0.792787Z'
				fill='white'
			/>
		</svg>
	)
}
