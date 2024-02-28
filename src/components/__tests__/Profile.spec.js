import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import Profile from '@/components/Profile.vue';

// Mock the stores and their methods
vi.mock('@/stores/user', () => ({
  useUserStore: vi.fn(() => ({
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    },
    logout: vi.fn().mockResolvedValue(true)
  }))
}));

vi.mock('@/stores/books', () => ({
  useBooksStore: vi.fn(() => ({
    getBookByUserId: vi.fn(async () => [
      {
        id: 1,
        title: 'Finished Book',
        userId: 1,
        pageCount: 120,
        pagesRead: 120,
        finished: true,
        review: "good book",
        rating: 3.5
      },
      {
        id: 2,
        userId: 1,
        title: 'Unfinished Book',
        finished: false,
        progressUpdates: [
          {
            "date": "2024-02-27T13:31:36.419Z",
            "pagesRead": "200"
          }
        ],
        genre: "fiction",
        pageCount: 300,
        pagesRead: 200,
        finished: false,
      }
    ])
  }))
}));

// Directly mock useRouter and useRoute composables from Vue Router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn()
  })),
  useRoute: vi.fn(() => ({
    path: '/mock-path', // Mock any relevant route properties
    // Add more mocked properties as needed for your tests
  })),
  RouterLink: vi.fn(() => 'RouterLink'),
}));

describe('Profile', () => {
  // No need to setup router mocks in beforeEach as we're mocking directly

  it('renders user information and books', async () => {
    const wrapper = mount(Profile);
    await flushPromises(); // Wait for all promises to resolve

    expect(wrapper.text()).toContain('John Doe');
    expect(wrapper.text()).toContain('john@example.com');
    expect(wrapper.text()).toContain('Finished Book');
    expect(wrapper.text()).toContain('Unfinished Book');
    expect(wrapper.text()).toContain('200 pages of Unfinished Book');
  });
});
