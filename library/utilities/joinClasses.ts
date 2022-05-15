const joinClasses = (...classes: any) => {
	const classesArray = classes.map((x: any) => {
		if (typeof x == "string" || x instanceof String) {
			return x
		} else if (x instanceof Array) {
			return joinClasses(...x);
		} else if (x instanceof Object) {
			return Object.entries(x).map(x => x[1] ? x[0] : null).filter(x => x).join(" ");
		} else {
			throw "Invalid Class Type Provided, Expected: String, Array Or Object";
		}
	})
	return classesArray.join(" ");
}

export default joinClasses;
