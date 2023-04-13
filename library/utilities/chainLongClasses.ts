export const clc = (...classes: any) => {
	const parsedClasses =  classes.map((_class: any) => {
		// If a string just return as default with not conditional
		if (typeof _class === "string" || typeof _class === "number") {
			return _class;
		} else if (_class instanceof Array) {
			// If an array of classes run recursively.
			return clc(..._class);
		} else if (_class instanceof Object) {
			// add classes to the class string if their conditional is true.
			return Object.entries(_class)
				.map(_class => _class[1] ? _class[0] : null)
				.filter(_class => _class).join(" ");
		} else if (!_class) {
			return "";
		} else {
			throw new Error("Invalid class type provided, Expected: String, Array or Object.");
		}
	});

	return parsedClasses.join(" ").trim();
}
