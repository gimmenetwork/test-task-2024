import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils';
import StarRating from '@/components/StarRating.vue';

describe('StarRating', () => {
  it('renders the correct number of filled stars based on the rating', async () => {
    // Define the rating for the test
    const rating = 3.5;

    // Mount the StarRating component with the specified rating
    const wrapper = mount(StarRating, {
      props: {
        rating: rating
      }
    });

    // Wait for Vue to update the DOM
    await nextTick();

    // Calculate the expected width of the inner stars div based on the rating
    const expectedWidth = `${Math.round((rating / 5) * 100)}%`;

    // Assert that the width of the inner stars div matches the expected width
    expect(wrapper.find('.stars-inner').element.style.width).toBe(expectedWidth);

    // Assert that the number rating text matches the rating
    expect(wrapper.find('.number-rating').text()).toBe(rating.toString());
  });

  it('renders 100% width for 5-star rating', async () => {
    // Mount the StarRating component with a rating of 5
    const wrapper = mount(StarRating, {
      props: {
        rating: 5
      }
    });

    // Wait for Vue to update the DOM
    await wrapper.vm.$nextTick();

    // Assert that the width of the inner stars div is 100%
    expect(wrapper.find('.stars-inner').element.style.width).toBe('100%');

    // Assert that the number rating text is "5"
    expect(wrapper.find('.number-rating').text()).toBe('5');
  });

  it('renders 0% width for 0-star rating', async () => {
    // Mount the StarRating component with a rating of 0
    const wrapper = mount(StarRating, {
      props: {
        rating: 0
      }
    });

    // Wait for Vue to update the DOM
    await wrapper.vm.$nextTick();

    // Assert that the width of the inner stars div is 0%
    expect(wrapper.find('.stars-inner').element.style.width).toBe('0%');

    // Assert that the number rating text is "0"
    expect(wrapper.find('.number-rating').text()).toBe('0');
  });
});
