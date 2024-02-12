import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MyLibrary from '@/components/MyLibrary.vue';

// Mock the useBooksStore hook
vi.mock('@/stores/books', () => ({
  useBooksStore: vi.fn(() => ({
    fetchBooks: vi.fn(async () => {
      // Simulate fetching books and updating the books array to an empty array initially
      wrapper.vm.books = [];
    }),
    books: [] // Mock the books getter or state property
  }))
}));

describe('MyLibrary', () => {
  it('renders the component with correct title text and no book cards', async () => {
    // Mount the MyLibrary component
    const wrapper = mount(MyLibrary);

    // Wait for the next tick to allow the component to fetch books
    await wrapper.vm.$nextTick();

    // Assert that the title text is correct
    const titleElement = wrapper.find('h3');
    expect(titleElement.text()).toBe('My Library:');

    // Assert that no book cards are rendered initially
    const bookCards = wrapper.findAll('.book-card');
    expect(bookCards.length).toBe(0);
  });
});
