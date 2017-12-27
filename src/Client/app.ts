import Vue from 'vue';
import Component from './Component.vue';

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
  const app = new Vue({
    // the root instance simply renders the App component.
    render: (h) => h(Component), // + "<div>Hello World 123456789</div>"
  });

  return { app };
}
