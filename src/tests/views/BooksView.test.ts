import { createPinia, setActivePinia } from 'pinia';
import BooksView from '@/views/books/BooksView.vue';

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { setupTestRouter } from '@/tests/utils/setupRouter';

describe('Testing Books view', () => {
    const router = setupTestRouter();

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('should display the list of books correctly', async () => {
        vi.mock('@/store/books', () => ({
            useBooksStore: vi.fn(() => ({
                isLoadingBooks: false,
                books: [
                    {
                        id: '1',
                        title: 'Book 1',
                        genre: 'Fiction',
                        pageCount: 300,
                        progress: 50,
                    },
                    {
                        id: '2',
                        title: 'Book 2',
                        genre: 'Non-Fiction',
                        pageCount: 200,
                        progress: 20,
                    },
                ],
                fetchUserBooks: vi.fn(),
            })),
        }));

        const wrapper = mount(BooksView, {
            global: {
                plugins: [router],
            },
        });

        const books = wrapper.findAll('li');
        expect(books.length).toBe(2);

        expect(books[0].text()).toContain('Book 1');
        expect(books[0].text()).toContain('Fiction');

        expect(books[1].text()).toContain('Book 2');
        expect(books[1].text()).toContain('Non-Fiction');
    });
});
