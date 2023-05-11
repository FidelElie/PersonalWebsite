const DEFAULT_OPTIONS: Required<NumberArrayOptions> = { step: 1, exclusive: false };

export const numberArray = (
	startFrom: number,
	maxNumber: number,
	options: NumberArrayOptions = {}
) => {
	const { step, exclusive } = { ...DEFAULT_OPTIONS, ...options };

	const max = exclusive ? maxNumber + 1 : maxNumber;

	const arrayLength = Math.floor(Math.abs(max - startFrom) / step);

	const numberedArray = new Array(arrayLength).fill(null).map(
		(_, index) => startFrom + index * step
	);

	return numberedArray;
}

export type NumberArrayOptions = { step?: number; exclusive?: boolean; }
