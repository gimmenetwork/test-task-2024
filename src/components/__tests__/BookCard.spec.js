import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BookCard from '@/components/BookCard.vue'; // Update the import path to your component
import { createRouter, createWebHistory } from 'vue-router';

// Mocking Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/book/:id', name: 'bookDetail' }], // Match your app's routes
});

describe('BookCard.vue', () => {
  it('renders book details correctly', async () => {
    // Define a mock book object
    const book = {
      id: '1',
      title: 'Test Book',
      genre: 'Fiction',
      pageCount: 300,
      pagesRead: 150,
    };

    // Mount the component with the book prop and router
    const wrapper = mount(BookCard, {
      global: {
        plugins: [router],
      },
      props: {
        book,
      },
    });

    // Assertions to verify the rendering based on the book prop
    expect(wrapper.text()).toContain(book.title);
    expect(wrapper.text()).toContain(`Genre: ${book.genre}`);
    expect(wrapper.text()).toContain(`Pages: ${book.pageCount}`);
    expect(wrapper.text()).toContain(`Pages Read: ${book.pagesRead}`);

    // Verify the "Read more" link's `to` prop
    const readMoreLink = wrapper.findComponent({ name: 'RouterLink' });
    expect(readMoreLink.props('to')).toEqual({ name: 'bookDetail', params: { id: book.id } });
  });
});
