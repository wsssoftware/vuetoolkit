<template>
    <template v-if="asTemplate">
        {{ $formatters.brazilian.phone(finalValue) }}
    </template>
    <span v-else>
        {{ $formatters.brazilian.phone(finalValue) }}
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BrazilianPhone',
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
            return this.value ?? fallback;
        },
    },
});
</script>

<style scoped></style>
