export default class ControllerError extends Error {
    error?: any

    constructor(message: string, error?: any) {
        super(message);

        this.error = error;
    }
}