export const CONTROLLER_TOKEN = Symbol('instant:next:controllers');

/**
 * Registers a new controller for the server. Method routes still have to contain path.
 * @param baseUrl base url for the controller to act on.
 * @returns Controller class
 */
export function Controller(baseUrl: string = "/"): ClassDecorator {
	return (target: object): void => {
		Reflect.defineMetadata(CONTROLLER_TOKEN, baseUrl, target);
	}
}
