<template>
    <div v-if="asDiv">
        <slot :disabled="disabled" :error="error" :id="finalId" :invalid="invalid" :readonly="readonly"
              :required="required" />
    </div>
    <template v-else>
        <slot :disabled="disabled" :error="error" :id="finalId" :invalid="invalid" :readonly="readonly"
              :required="required" />
    </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { v4 as UUIDv4 } from 'uuid';
import { InertiaForm } from '@inertiajs/vue3';

export default defineComponent({
    name: 'InputAdapter',
    props: {
        asDiv: { type: Boolean, default: true },
        disabled: Boolean,
        fieldName: { type: String, required: true },
        form: { type: Object as PropType<InertiaForm<{ [key: string]: any }>>, required: true },
        id: String,
        readonly: Boolean,
        required: Boolean
    },
    computed: {
        error(): undefined | string {
            return this.form.errors[this.fieldName as keyof typeof this.form.errors];
        },
        finalId(): string {
            return this.id || 'input-' + UUIDv4();
        },
        invalid(): boolean {
            return !!this.form.errors[this.fieldName as keyof typeof this.form.errors];
        }
    }
});
</script>

<style scoped>

</style>