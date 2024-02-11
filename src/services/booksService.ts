import axios from 'axios';
import { Book } from '@/types';

const API_URL = 'http://localhost:3001';

export const BookService = {
    async fetchAndPatchUserBooks(
        updateFn: (books: Book[]) => Book[]
    ): Promise<Book[]> {
        const username = localStorage.getItem('username');
        if (!username) throw new Error('User not authenticated');

        const { data: users } = await axios.get(
            `${API_URL}/users?username=${username}`
        );
        if (users.length === 0) throw new Error('User not found');

        const user = users[0];

        const updatedBooks = updateFn(user.books);

        const originalBooksJson = JSON.stringify(user.books);
        const updatedBooksJson = JSON.stringify(updatedBooks);
        const changesWereMade = originalBooksJson !== updatedBooksJson;

        if (changesWereMade) {
            await axios.patch(`${API_URL}/users/${user.id}`, {
                books: updatedBooks,
            });
        }

        return updatedBooks;
    },
};
