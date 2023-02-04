import { useState, type ChangeEvent } from "react";

const useForm = <T extends { [key: string]: any }>(params: { fields: T }) => {
	const { fields: initialFields } = params;

	const [fields, setFields] = useState(initialFields);

	const editField = (data: Partial<T>) => setFields(
		currentFields => ({ ...currentFields, ...data })
	);

	return {
		fields,
		register: (id: keyof T) => {
			return {
				id,
				name: id,
				value: fields[id],
				onChange: (event: ChangeEvent<HTMLInputElement>) => editField(
					{ [id]: event.target.value } as Partial<T>
				)
			}
		}
	}
}

export default useForm;
