import { useState, type ChangeEvent } from "react";

const useForm = <T extends { [key: string]: any }>(fields: T, options: UseFormOptions = {}) => {
	const [formFields, setFormFields] = useState(fields);

	const editField = (data: Partial<T>) => setFormFields(
		currentFields => ({ ...currentFields, ...data })
	);

	return {
		fields: formFields,
		register: (id: keyof T) => {
			return {
				id,
				name: id,
				value: formFields[id],
				onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
					const { target: { type } } = event;

					switch (type) {
						case "checkbox":
							return editField({ [id]: (event.target as HTMLInputElement).checked } as Partial<T>);
						default:
							return editField({ [id]: event.target.value } as Partial<T>);
					}
				}
			}
		}
	}
}

type UseFormOptions = {
}

export default useForm;
