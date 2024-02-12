import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue'
import Profile from '@/components/Profile.vue';

// Mock the useUserStore hook
// Mock the useUserStore hook
vi.mock('@/stores/user', () => ({
    useUserStore: vi.fn(() => ({
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      }
    }))
  }));
  
  // Mock the useBooksStore hook
  vi.mock('@/stores/books', () => ({
    useBooksStore: vi.fn(() => ({
      getBookByUserId: vi.fn(async () => [
        {
          id: 1,
          title: 'Book 1',
          finished: true,
          pageCount: 200,
          pagesRead: 200,
          progressUpdates: [
            { pagesRead: 50, date: '2023-02-09T00:00:00Z' },
            { pagesRead: 100, date: '2023-02-10T00:00:00Z' }
          ]
        },
        {
          id: 2,
          title: 'Book 2',
          finished: false,
          progressUpdates: [
            { pagesRead: 20, date: '2023-02-09T00:00:00Z' },
            { pagesRead: 40, date: '2023-02-10T00:00:00Z' }
          ]
        }
      ])
    }))
  }));

describe('Profile', () => {
  it('renders the component with correct user information', async () => {
    // Mount the Profile component
    const wrapper = mount(Profile);

    // Wait for the component to fetch data
    await nextTick();

    // Assert that the component displays the user's name and email
    expect(wrapper.find('.font-bold').text()).toBe('Hi John Doe');
    expect(wrapper.find('.text-gray-700').text()).toContain('Name: John Doe');
  
  });
});
