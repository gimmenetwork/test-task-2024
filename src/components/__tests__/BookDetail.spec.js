import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import BookDetail from '@/components/BookDetail.vue';
import axios from 'axios';

function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve));
}
vi.mock('axios', () => ({
    default: {
      get: vi.fn(() => Promise.resolve({ data: { id: '1', title: 'Test Book', genre: 'Fiction', pageCount: 100, pagesRead: 50 } })),
    },
    get: vi.fn(() => Promise.resolve({ data: { id: '1', title: 'Test Book', genre: 'Fiction', pageCount: 100, pagesRead: 50 } })),
  }));


vi.mock('@/stores/books', () => ({
  useBooksStore: vi.fn(() => ({
    getBookById: vi.fn(() => Promise.resolve({ id: '1', title: 'Test Book', genre: 'Fiction', pageCount: 100, pagesRead: 50 })),
    updateBookProgress: vi.fn(),
    addReview: vi.fn()
  }))
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/book/:id', name: 'bookDetail' }],
});

describe('BookDetail', () => {
  it('fetches and displays book details correctly', async () => {
    setActivePinia(createPinia());
    const wrapper = mount(BookDetail, {
      global: {
        plugins: [router],
        // Use Pinia and potentially other global plugins or components here
      },
      props: {
        bookId: '1',
      },
    });
    router.push({ name: 'bookDetail', params: { id: '1' } });
    await router.isReady();
    // Since fetching book details is asynchronous, wait for the next tick
    await nextTick();

    // Assertions to check if the book details are rendered
    expect(wrapper.text()).toContain('Test Book');
    expect(wrapper.text()).toContain('Fiction');
    expect(wrapper.text()).toContain('100');
    expect(wrapper.text()).toContain('50');
  });
});
