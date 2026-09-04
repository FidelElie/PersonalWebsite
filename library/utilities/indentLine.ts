export const indentLine = (text: string, numberOfTabs = 0) => {
	return `${(new Array(numberOfTabs).fill("\t")).join("")}${text}`;
}
