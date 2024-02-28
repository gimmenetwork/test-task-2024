// Import necessary utilities and the component to test

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import AddBook from '@/components/AddBook.vue'
import axios from 'axios';

function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve));
}
// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { message: 'Book added successfully!' } }))
  },
  // Mock any other methods as necessary
  post: vi.fn(() => Promise.resolve({ data: { message: 'Book added successfully!' } }))
}));


// Mock Pinia store
vi.mock('@/stores/user', () => ({
  useUserStore: vi.fn(() => ({
    user: { id: 'test-user-id' }
  }))
}));


  describe('AddBook.vue', () => {
    it('submits the form successfully', async () => {
      setActivePinia(createPinia());
      const wrapper = mount(AddBook, {
        global: {
            plugins: [createPinia()], // Use Pinia
            stubs: {
              Modal: {
                template: '<div v-if="isOpen"><slot></slot></div>', // Simulate modal's template
                setup(props, { expose }) {
                  const isOpen = ref(false);
                  
                  function openModal() {
                    isOpen.value = true;
                  }
        
                  function closeModal() {
                    isOpen.value = false;
                  }
        
                  // Expose these methods so they can be called on the component wrapper
                  expose({ openModal, closeModal });
        
                  return { isOpen };
                }
              }
            }
          }
      });

      await wrapper.find('button').trigger('click');
  
      // Simulate filling the form
      await wrapper.find('input[name="title"]').setValue('Test Book');
      await wrapper.find('input[name="genre"]').setValue('Fiction');
      await wrapper.find('input[name="pagecount"]').setValue('123');
  
      // Submit the form
      await wrapper.find('form').trigger('submit.prevent');
      await flushPromises(); // Wait for all promises to resolve
  
      // Assertions
      expect(axios.post).toHaveBeenCalled();
      expect(wrapper.find('.text-red-500').exists()).toBe(false); // Error message should not be displayed
    });
  });

