export class ApiSucceedResponse {
    public statusCode: number
    public message: string;
    public params: [];

    constructor(message: string, params: any) {
        this.statusCode = 200;
        this.message = message;
        this.params = params;
    }
}