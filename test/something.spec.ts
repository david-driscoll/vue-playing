import { shallow, mount } from 'vue-test-utils';
import { createApp } from '../client/app';

import Component from '../client/Component.vue';

describe('List.vue', () => {
    it('renders li for each item in props.items', () => {
        const instance = mount(Component);
        instance.setData({});
        instance.text() /*?*/;
        instance.hasClass('el-container'); /* ? */
    });
    it('createapp', () => {
        createApp();
    });
});
