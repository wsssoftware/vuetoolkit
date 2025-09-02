import { useNavigatorLanguage } from '@vueuse/core';
import { App, toValue } from 'vue';
import { Formatters } from './Composables';
import Gate from './Gate';

export interface Options {
    locale?: string;
}

export default {
    install: (app: App, options: Options = {}) => {
        const { language } = useNavigatorLanguage();
        options.locale = options.locale ?? language.value;
        app.config.globalProperties.$vuetoolkit = toValue(options);
        app.config.globalProperties.$gate = new Gate();
        app.config.globalProperties.$formatters = new Formatters(options.locale);
    },
};
