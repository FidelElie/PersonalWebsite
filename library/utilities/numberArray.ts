export const numberArray = (startFrom: number, maxNumber: number) =>
	Array.from({ length: maxNumber }, (_, i) => i + startFrom);
