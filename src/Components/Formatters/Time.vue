<template>
    <template v-if="asTemplate">
        {{ $formatters.datetime.time(finalValue) }}
    </template>
    <time v-else :datetime="finalValue">
        {{ $formatters.datetime.time(finalValue) }}
    </time>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'Time',
    props: {
        asTemplate: Boolean,
        locale: String,
        options: Object as PropType<Intl.DateTimeFormatOptions>,
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
