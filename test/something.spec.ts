import { shallow, mount } from 'vue-test-utils';
import { createApp } from '../client/app';
const Vue = require('vue');

import Component from '../client/Component.vue';

// Object.keys(Component.options.template) /*?*/

describe('List.vue', () => {
    it('renders li for each item in props.items', () => {
        const instance = mount(Component);
        instance.setData({});
        instance.text() /*?*/;
        instance.hasClass('el-container'); /* ?.text() */

    });
    it('createapp', () => {
        createApp();
    });
});
