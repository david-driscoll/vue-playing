<script lang="ts">
import Vue, { ComponentOptions, VueConstructor } from 'vue';
import 'vue-rx';

export default Vue.extend({
  methods: {
    abc() {
      return '123414';
    },
    def(): string {
      return 'ghi';
    }
  },
  data() {
    return {
      value: 'abcd',
      value2: 'abcd',
    };
  },
});
</script>

<style lang="scss" scoped>

</style>

<template>
    <div>Hello World does work... hello bill {{abc()}} {{value}}</div>
</template>
