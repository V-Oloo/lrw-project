export interface User {
    user_id: number;
    email: string;
    password: string;
    access_token?: string;
    role?: string;
}
