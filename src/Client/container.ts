import {
    all,
    autoinject,
    Container,
    factory,
    inject,
    invoker,
    lazy,
    newInstance,
    optional,
    parent,
    registration,
    singleton,
    transient,
} from 'aurelia-dependency-injection';
import { VueConstructor } from 'vue';
import { MyComponent } from './MyComponent';

export function install(Vue: VueConstructor, options: any) {
    const container = Vue.container = new Container();
    container.makeGlobal();
}

declare module 'vue/types/vue' {
    interface VueConstructor {
        container: Container;
    }
}
