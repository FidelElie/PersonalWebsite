const joinClasses = (...classes: Arguments): string => {
	const parsedClasses = classes.map(_class => {
		if (!_class) {
			return null;
		} else if (typeof _class === "string") {
			return _class;
		} else if (typeof _class === "number") {
			return !_class ? null : _class.toString();
		} else if (typeof _class === "object" && !Array.isArray(_class)) {
			return Object.entries(_class).map(([key, value]) => {
				return !!value ? key : null
			}).filter(_class => !!_class).join(" ");
		} else if (typeof _class === "object" && Array.isArray(_class)) {
			return joinClasses(..._class);
		} else {
			return null;
		}
	});

	return parsedClasses.filter(_class => !!_class).join(" ");
}

type AllowedPrimitives = string | number | null | boolean | undefined;
type AllowedObject = { [key: string]: any }
type AllowedArray = (AllowedPrimitives | AllowedObject | (AllowedPrimitives | AllowedObject)[])[]
type Arguments = (AllowedPrimitives | AllowedObject | AllowedArray)[]

export default joinClasses;
