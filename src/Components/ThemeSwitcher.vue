<template>
    <slot
        :faIcon="faIcon"
        :label="label"
        :next="next"
        :state="store"
    />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useColorMode } from '@vueuse/core';

export default defineComponent({
    name: 'ThemeSwitcher',
    props: {
        fontAwesomeStyle: {
            type: String,
            default: 'far'
        },
        labels: {
            type: Object as PropType<{ auto: string, light: string, dark: string }>,
            default: () => ({
                auto: 'Tema do sistema',
                light: 'Tema claro',
                dark: 'Tema escuro'
            })
        }
    },
    computed: {
        faIcon(): string {
            let icon;
            if (this.store === 'auto') {
                icon = 'tv';
            } else if (this.store === 'light') {
                icon = 'sun-bright';
            } else if (this.store === 'dark') {
                icon = 'moon';
            }
            return `${this.fontAwesomeStyle} fa-fw fa-${icon}`;
        },
        label(): string {
            return this.labels[this.store];
        }
    },
    setup() {
        const { store } = useColorMode();
        return {
            store
        };
    },
    methods: {
        next(): void {
            if (this.store === 'auto') {
                this.store = 'light';
            } else if (this.store === 'light') {
                this.store = 'dark';
            } else if (this.store === 'dark') {
                this.store = 'auto';
            }
        }
    }
});
</script>

<style scoped>

</style>