export const getRandomColor = () => {
	const config = {
		h: [0, 360],
		s: [60, 90],
		l: [25, 45],
	}

	const h = config.h[0] + Math.floor(Math.random() * (config.h[1] - config.h[0] + 1))
	const s = config.s[0] + Math.floor(Math.random() * (config.s[1] - config.s[0] + 1))
	const l = config.l[0] + Math.floor(Math.random() * (config.l[1] - config.l[0] + 1))

	return `hsl(${h}, ${s}%, ${l}%)`
}
