<template>
    <template v-if="asTemplate">
        {{ $formatters.brazilian.zip(finalValue) }}
    </template>
    <span v-else>
        {{ $formatters.brazilian.zip(finalValue) }}
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Zip',
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
