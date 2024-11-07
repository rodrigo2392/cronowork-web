export interface LoginResponse {
    token: string;
    refresh_token: string;
    user: {
        name: string;
        email: string;
    }
}