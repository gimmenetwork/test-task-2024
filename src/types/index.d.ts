export interface User {
    username: string;
    password: string;
    id?: string;
}

export interface AuthState {
    user: string | null;
    token: string | null;
}

export interface AuthResponse {
    token: string;
    user: User;
}
