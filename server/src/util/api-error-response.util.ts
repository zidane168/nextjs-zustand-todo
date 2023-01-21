export class ApiErrorResponse {
    public statusCode: number;
    public message: string;
    public params: [];

    constructor(message: string, params: any) {
        this.statusCode = 999;
        this.message = message;
        this.params = params;
    }
}