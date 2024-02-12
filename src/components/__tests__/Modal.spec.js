import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';

describe('Modal', () => {
  it('renders modal content when opened', async () => {
    // Mount the Modal component
    const wrapper = mount(Modal, {
      slots: {
        default: '<div id="modal-content">Modal Content</div>'
      }
    });

    // Open the modal
    await wrapper.vm.openModal();

    // Check if the modal content is rendered
    expect(wrapper.find('#modal-content').exists()).toBe(true);
  });

  it('closes the modal when close button is clicked', async () => {
    // Mount the Modal component
    const wrapper = mount(Modal);

    // Open the modal
    await wrapper.vm.openModal();

    // Find and click the close button
    await wrapper.find('.fa-xmark').trigger('click');

    // Check if the modal is closed
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('opens the modal when openModal is called', async () => {
    // Mount the Modal component
    const wrapper = mount(Modal);

    // Call the openModal method
    await wrapper.vm.openModal();

    // Check if the modal is open
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it('closes the modal when closeModal is called', async () => {
    // Mount the Modal component
    const wrapper = mount(Modal);

    // Open the modal
    await wrapper.vm.openModal();

    // Call the closeModal method
    await wrapper.vm.closeModal();

    // Check if the modal is closed
    expect(wrapper.vm.isOpen).toBe(false);
  });
});
