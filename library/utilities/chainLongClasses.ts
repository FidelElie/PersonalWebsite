import { twJoin } from 'tailwind-merge';

export const clc = (...classes: any) => {
	return twJoin(...classes);
}
