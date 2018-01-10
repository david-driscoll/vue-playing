import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

export default Vue.extend({
    props: {
        abc: {
            type: String,
            default: '',
        },
    },
});
