<template>
    <label :for="id" :class="[invalid ? 'text-red-500 dark:text-red-400' : '', disabled ? 'opacity-80' : '']">
        <slot />
        <span v-if="required" class="text-red-500 dark:text-red-400">﹡</span>
    </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'InputLabel',
    props: {
        disabled: Boolean,
        id: { type: String, required: true },
        invalid: Boolean,
        required: Boolean
    }
});
</script>

<style scoped>

</style>