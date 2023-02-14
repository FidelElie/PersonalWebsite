export type Union<A, B> = A & B;

export type Never<T extends {[key: string]: any}> = {[key in keyof T]: never }
