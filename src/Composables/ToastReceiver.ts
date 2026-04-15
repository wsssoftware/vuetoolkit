import { router } from '@inertiajs/vue3';
import { ToastServiceMethods } from 'primevue';
import type { ToastMessageOptions } from 'primevue/toast';
import { onBeforeUnmount, onMounted } from 'vue';

let toastService: ToastServiceMethods;

export default function (toast: ToastServiceMethods): void {
    toastService = toast;
    let removeStartEventListener: () => void;
    onMounted(() => {
        removeStartEventListener = router.on('flash', (event) => {
            const flashes: Record<string, ToastMessageOptions> = (event?.detail?.flash as any) ?? {};
            Object.keys(flashes).forEach((key: string) => {
                const message = flashes[key];
                toastService.add(message);
            });
        });
    });
    onBeforeUnmount(() => {
        if (removeStartEventListener) {
            removeStartEventListener();
        }
    });
}
