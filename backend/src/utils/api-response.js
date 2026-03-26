export class ApiResponse {

    constructor(
        statusCode,
        data,
        message = "Success",
        success = true
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = success;
    }
}