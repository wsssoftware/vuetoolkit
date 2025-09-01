<template>
  <template v-if="asTemplate">
    {{ fFinalValue }}
  </template>
  <span v-else>
    {{ fFinalValue }}
  </span>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "BrazilianDocument",
  props: {
    asTemplate: Boolean,
    value: String,
  },
  computed: {
    finalValue(): string {
      let fallback: string = '';
      if (typeof this.$slots.default === 'function' && this.$slots.default()[0] !== undefined) {
        fallback = this.$slots?.default()[0].children as string;
      }
      return (this.value ?? fallback).replace(/[^a-zA-Z0-9]/g, '');
    },
    fFinalValue(): string {
      let v = this.finalValue;
      if (v.length === 11) {
        return `${v.substring(0, 3)}.${v.substring(3, 6)}.${v.substring(6, 9)}-${v.substring(9, 11)}`
      } else if (v.length === 14) {
        return `${v.substring(0, 2)}.${v.substring(2, 5)}.${v.substring(5, 8)}/${v.substring(8, 12)}-${v.substring(12, 15)}`
      }
      return this.finalValue
    }
  },
});
</script>

<style scoped>

</style>
