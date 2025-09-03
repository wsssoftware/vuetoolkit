<script lang="ts">
import { InertiaForm } from '@inertiajs/vue3';
import { defineComponent, PropType } from 'vue';
import { objectGet, objectSet } from '../Composables';

export default defineComponent({
    inheritAttrs: false,
    props: {
        disabled: Boolean,
        fieldName: { type: String, required: true },
        form: { type: Object as PropType<InertiaForm<any>>, required: true },
        label: {
            type: String,
            default: (props: { fieldName: string }) => props.fieldName,
        },
        parentAttrs: { type: Object, default: () => ({}) },
        parentClass: String,
        readonly: Boolean,
        required: Boolean,
    },
    computed: {
        model: {
            get() {
                return objectGet(this.form, this.fieldName);
            },
            set(value: any) {
                objectSet(this.form, this.fieldName, value);
            },
        },
    },
});
</script>
