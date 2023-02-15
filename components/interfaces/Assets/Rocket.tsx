// TODO Courtesy of https://www.iconpacks.net

export const Rocket = (props: RocketProps) => {
	const { className } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			version="1.1"
			width="1em"
			height="1em"
			viewBox="0 0 256 256"
			xmlSpace="preserve"
			className={className}
		>
			<g transform="translate(1.4065934065934016 131.28255862356806) rotate(-45) scale(1.99 1.99)">
				<path
					d="M 31.613 66.367 C 31.91 78.753 16.394 77.154 4.352 85.646 c 8.467 -12.006 6.905 -27.463 19.171 -27.261 C 25.819 61.446 28.512 64.111 31.613 66.367 z"
					transform=" matrix(1 0 0 1 0 0)"
					fill="currentColor"
					className="text-secondary"
				/>
				<path
					d="M 37.216 27.753 l -20.307 -0.514 c -2.636 -0.067 -5.184 0.951 -7.048 2.815 l -9.071 9.071 c -1.464 1.464 -0.798 3.964 1.2 4.506 l 14.43 3.913"
					transform=" matrix(1 0 0 1 0 0)"
					fill="currentColor"
					className="text-primary"
					strokeLinecap="round"
				/>
				<path
					d="M 62.247 52.784 l 0.514 20.307 c 0.067 2.636 -0.951 5.184 -2.815 7.048 l -9.071 9.071 c -1.464 1.464 -3.964 0.798 -4.506 -1.2 l -3.913 -14.43"
					transform=" matrix(1 0 0 1 0 0)"
					fill="currentColor"
					className="text-primary"
					strokeLinecap="round"
				/>
				<path
					d="M 61.353 9.128 C 47.737 16.867 32.294 29.543 14.88 47.543 c 5.211 13.173 14.403 22.365 27.577 27.577 c 18 -17.414 30.677 -32.857 38.416 -46.473 C 77.178 19.329 70.671 12.822 61.353 9.128 z"
					transform=" matrix(1 0 0 1 0 0)"
					fill="currentColor"
					className="text-white"
					strokeLinecap="round"
				/>
				<circle
					cx="54.783"
					cy="35.763"
					r="9.263"
					transform="  matrix(1 0 0 1 0 0)"
					fill="currentColor"
					className="text-gray"
				/>
				<path
					d="M 61.355 9.131 c 9.49 -5.393 18.094 -8.393 25.857 -9.12 c 1.59 -0.149 2.926 1.187 2.777 2.777 c -0.727 7.763 -3.726 16.367 -9.12 25.857 C 72.371 24.134 65.866 17.629 61.355 9.131 z"
					transform=" matrix(1 0 0 1 0 0)"
					fill="currentColor"
					className="text-primary"
					strokeLinecap="round"
				/>
			</g>
		</svg>
	)
}

export interface RocketProps {
	className?: string,
}
