import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PageNotFound from '@/views/general/PageNotFound.vue';

import { setupTestRouter } from '@/tests/utils/setupRouter';

describe('Testing PageNotFound view', () => {
    const router = setupTestRouter();

    it('should display the error message and provides a link to the homepage', () => {
        const wrapper = mount(PageNotFound, {
            global: {
                plugins: [router],
            },
        });

        expect(wrapper.find('h1').text()).toContain('Page not found 🧭🚶');
        expect(wrapper.text()).toContain(
            'Opps! You navigated to a non-existent page...'
        );

        const homeLink = wrapper.findComponent({
            name: 'RouterLink',
            props: { to: '/' },
        });
        expect(homeLink.exists()).toBe(true);
        expect(homeLink.text()).toContain('click here');
    });
});
