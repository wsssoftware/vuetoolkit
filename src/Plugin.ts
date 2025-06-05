import { App, toValue } from 'vue';
import Gate from './Gate';
import { useNavigatorLanguage } from '@vueuse/core';

export interface Options {
    locale?: string;
}

export default {
    install: (app: App, options: Options = {}) => {
        const { language } = useNavigatorLanguage();
        options.locale = options.locale ?? language.value;
        app.config.globalProperties.$vuetoolkit = toValue(options);
        app.config.globalProperties.$gate = new Gate();
    }
};

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $vuetoolkit: Options;
        $gate: Gate;
    }
}