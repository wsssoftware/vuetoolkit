<script lang="ts">
import { defineComponent } from 'vue';
import { objectGet, objectSet } from '../Composables';

export default defineComponent({
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
