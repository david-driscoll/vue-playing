import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({})
export class MyComponent extends Vue {
    @Prop() public prop: string;
}
