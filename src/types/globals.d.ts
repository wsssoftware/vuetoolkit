import { AxiosInstance } from 'axios';
import { ConfirmationServiceMethods, DialogServiceMethods } from 'primevue';
import { route as routeFn, RouteParams, Router } from 'ziggy-js';

declare global {
    function route(): Router;
    function route(name: string, params?: RouteParams<typeof name> | undefined, absolute?: boolean): string;

    interface Window {
        axios: AxiosInstance;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        route: typeof routeFn;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        route: typeof routeFn;
        $toast: ToastServiceMethods;
        $confirm: ConfirmationServiceMethods;
        $dialog: DialogServiceMethods;
    }
}

