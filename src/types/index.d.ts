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

export interface Book {
    id?: string;
    title: string;
    genre: string;
    pageCount: number;
    progress?: number;
    review?: Review;
}

export interface BooksState {
    books: Book[];
    isLoadingBooks: boolean;
}

export interface Review {
    score: number;
    text: string;
}
