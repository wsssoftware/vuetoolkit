import { router } from '@inertiajs/vue3';
import axios, { AxiosResponse } from 'axios';
import { debounce } from 'lodash-es';
import { ToastServiceMethods } from 'primevue';
import { onBeforeUnmount, onMounted } from 'vue';

let alreadyFlashed: string[] = [];

let toastService: ToastServiceMethods;

export default function (toast: ToastServiceMethods): void {
    let finishEvent: () => void;
    toastService = toast;
    let interceptorId: any;
    onMounted(() => {
        interceptorId = axios.interceptors.response.use((response: AxiosResponse) => {
            const isInertia = response.headers['x-inertia'];
            const isGetFlash = response.request.responseURL === route('lt.flash.get_messages');
            if (!isInertia && !isGetFlash) {
                getFlashMessages();
            }
            return response;
        });
        finishEvent = router.on('finish', (e) => {
            if (e.detail.visit.only.length === 0) {
                getFlashMessages();
            }
        });
        getFlashMessages();
    });
    onBeforeUnmount(() => {
        if (interceptorId) {
            axios.interceptors.response.eject(interceptorId);
        }
        if (finishEvent) {
            finishEvent();
        }
    });
}

const getFlashMessages = debounce(() => {
    setTimeout(() => {
        axios.get(route('lt.flash.get_messages')).then((response: AxiosResponse<Message[]>) => {
            response.data.forEach((message: Message) => {
                if (alreadyFlashed.filter((id: string) => id === message.id).length > 0) {
                    return;
                }
                toastService.add(message);
                alreadyFlashed.push(message.id);
            });
        });
    }, 1000);
});

export type Message = {
    id: string;
    severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
    summary?: string | undefined;
    detail?: any | undefined;
    closable?: boolean | undefined;
    life?: number | undefined;
    group?: string | undefined;
};
