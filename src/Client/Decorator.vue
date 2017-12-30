<template>

</template>

<script lang="ts">
import Vue from 'vue';
import {
    Component,
    Emit,
    Inject,
    Model,
    Prop,
    Provide,
    Watch,
} from 'vue-property-decorator';

@Component
export default class DecoratorComponent extends Vue {
    @Prop() public a: string = '';

    method() {
    }
}

const a = DecoratorComponent;

</script>

<style>

</style>
