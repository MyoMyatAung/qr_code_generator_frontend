export class HTTPResponseError extends Error {
    constructor(public message: string, public status: number) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    static fromResponse(errorResponse: any): HTTPResponseError {
        const message = errorResponse?.data?.error?.message || "An unknown error occurred";
        const status = errorResponse?.status || 500;
        return new HTTPResponseError(message, status);
    }
}