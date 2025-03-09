export interface Response {
    status: 200 | 400 | 401 | 404 | 409 | 403 | 500;
    message: string;
    error?: any;
    data?: any;
}

// export class Response {
//     status: number;
//     message: string;
//     error?: string;
//     data?: string;

//     constructor(status: number, message: string, error?: string, data?: any) {

//     }
// }