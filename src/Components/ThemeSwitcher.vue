<template>
    <slot
        :faIcon="faIcon"
        :label="label"
        :next="next"
        :state="state"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import Cookies from 'universal-cookie';
import { usePreferredDark } from '@vueuse/core';

const cookieName = 'vuetoolkit-color-scheme';

export default defineComponent({
    name: 'ThemeSwitcher',
    props: {
        domain: String,
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
            if (this.state === 'auto') {
                icon = 'tv';
            } else if (this.state === 'light') {
                icon = 'sun-bright';
            } else if (this.state === 'dark') {
                icon = 'moon';
            }
            return `${this.fontAwesomeStyle} fa-fw fa-${icon}`;
        },
        label(): string {
            return this.labels[this.state as 'auto' | 'light' | 'dark'];
        }
    },
    setup(props) {
        let domain = props.domain;
        if (domain) {
            domain = domain.startsWith('.') ? domain : '.' + domain;
        }
        let date = new Date();
        date.setFullYear(date.getFullYear() + 5);
        let options = {
            domain: domain,
            expires: date,
            path: '/'
        };
        let cookies = new Cookies(null, options);
        let value = cookies.get(cookieName);
        if (!['auto', 'light', 'dark'].includes(value)) {
            cookies.set(cookieName, 'auto');
            value = 'auto';
        }
        const state = ref(value);
        return {
            state: state,
            cookies
        };
    },
    created(): any {
        this.setTheme();
    },
    methods: {
        next(): void {
            if (this.state === 'auto') {
                this.state = 'light';
            } else if (this.state === 'light') {
                this.state = 'dark';
            } else if (this.state === 'dark') {
                this.state = 'auto';
            }
            this.cookies.set(cookieName, this.state);
            this.setTheme();
        },
        setTheme(): void {
            if (this.state === 'dark') {
                this.setDark();
            } else if (this.state === 'light') {
                this.setLight();
            } else {
                usePreferredDark().value
                    ? this.setDark()
                    : this.setLight();
            }
        },
        setLight(): void {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        },
        setDark(): void {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        }
    }
});
</script>

<style scoped>

</style>