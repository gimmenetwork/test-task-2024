// // Import necessary utilities and the component to test

// import { describe, it, expect, vi } from 'vitest';
// import { mount } from '@vue/test-utils';
// import { nextTick, ref } from 'vue';
// import { createPinia, setActivePinia } from 'pinia';
// import AddBook from '@/components/AddBook.vue'
// import axios from 'axios';


// // Mock axios
// vi.mock('axios', () => ({
//   // Mock the default export to be an object with the post method
//   default: {
//     post: vi.fn(() => Promise.resolve({ data: {} }))
//   },
//   // If you're also using named exports from axios, you can mock them here
//   post: vi.fn(() => Promise.resolve({ data: {} }))
// }));

// describe('AddBook', () => {
//   it('opens modal and adds a new book', async () => {
//     setActivePinia(createPinia());
//     const wrapper = mount(AddBook, {
//       global: {
//         plugins: [createPinia()], // Use Pinia
//         stubs: {
//           Modal: {
//             template: '<div v-if="isOpen"><slot></slot></div>', // Simulate modal's template
//             setup(props, { expose }) {
//               const isOpen = ref(false);
              
//               function openModal() {
//                 isOpen.value = true;
//               }
    
//               function closeModal() {
//                 isOpen.value = false;
//               }
    
//               // Expose these methods so they can be called on the component wrapper
//               expose({ openModal, closeModal });
    
//               return { isOpen };
//             }
//           }
//         }
//       }
//     });


//     await wrapper.find('button').trigger('click'); // Assuming the first button is to open the modal

    
//     // Simulate filling out the form
//     const titleInput = wrapper.find('input[name="title"]'); // Adjust based on your actual markup
//     const genreInput = wrapper.find('input[name="genre"]');
//     const pageCountInput = wrapper.find('input[name="pagecount"]');

//     if (titleInput.exists() && genreInput.exists() && pageCountInput.exists()) {
//       await titleInput.setValue('My New Book');
//       await genreInput.setValue('Fiction');
//       await pageCountInput.setValue('100');
//     } else {
//       // If any input does not exist, this may indicate a problem with the test setup
//       console.error("One or more inputs not found");
//     }
//     await nextTick();
//     // Mock the function to check if it's called
//     const addNewBookMock = vi.spyOn(wrapper.vm, 'addNewBook');
//     await nextTick();
//    // expect(axios.post).toHaveBeenCalled();  
//     await wrapper.find('form').trigger('submit.prevent');
//     console.log('form---',wrapper.find('form').html);
//     // Now, check if axios.post was called
//     await nextTick();
//     console.log('html---',wrapper.html());
//     expect(addNewBookMock).toHaveBeenCalled();
//     // Ensure axios.post was called if necessary, showing the form data is submitted
//     expect(axios.post).toHaveBeenCalled();

//     // Clean up mocks
//     addNewBookMock.mockRestore();
//   });
// });

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
      expect(wrapper.emitted()).toHaveProperty('bookAdded');
      expect(wrapper.find('.text-red-500').exists()).toBe(false); // Error message should not be displayed
    });
  });

