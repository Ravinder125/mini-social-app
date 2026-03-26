export class ApiError extends Error {

    constructor(
        statusCode,
        message,
        errors,
        stack,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stackTrack = stack || new Error().stack;
    }
}