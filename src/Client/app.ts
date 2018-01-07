import axios from './axios-rx';
import Component from './Component.vue';
import { Vue } from './vue';
import './element-variables.scss';


// export const app = new Vue({
//     el: '#app',
//     template: '<A/><div>Hello World 123456789</div>',
//     components: {
//         A
//     }
// });

// export a factory function for creating fresh app, router and store
// instances
export function createApp() {
    Vue.extend({});
    const app = new Vue({
        // the root instance simply renders the App component.
        render: h => h(Component), // + "<div>Hello World 123456789</div>"
        registerServices(container) {
            container.registerInstance('axios', axios);
        },
    });

    return { app };
}
