<template>
    <template v-if="asTemplate">
        {{ fFinalValue }}
    </template>
    <time v-else :datetime="finalValue.substring(0, 10)">
        {{ fFinalValue }}
    </time>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'Date',
    props: {
        asTemplate: Boolean,
        locale: String,
        options: Object as PropType<Intl.DateTimeFormatOptions>,
        value: String
    },
    computed: {
        finalValue(): string {
            let fallback: string = '';
            if (typeof this.$slots.default === 'function' && this.$slots.default()[0] !== undefined) {
                fallback = this.$slots?.default()[0].children as string;
            }
            return this.value ?? fallback;
        },
        fFinalValue(): string {
            return new Date(this.finalValue)
                .toLocaleDateString(this.locale ?? this.$vuetoolkit.locale, this.options ?? {});
        }
    }
});
</script>

<style scoped>

</style>
