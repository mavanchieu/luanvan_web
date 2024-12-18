<template>
    <Update_ColorItem :colorItem="colorItem" @updateColorItem="handleUpdate" />
</template>

<script>
import Update_ColorItem from '@/components/product/Update_ColorItem.vue';
import { showSuccessToast } from '@/components/shared/Toast_Notification.vue';
import colorItemService from '@/services/colorItem.service';
export default {
    components: {
        Update_ColorItem,
    },

    data() {
        return {
            colorItems: [],
            colorItem: typeof (Object),
        }
    },

    methods: {
        async fetchColorItems() {
            try {
                this.colorItems = await colorItemService.getAll();
                this.colorItem = this.colorItems.find(item => item._id == this.$route.params.colorItemId);
            } catch (error) {
                console.error(error);
            }
        },

        async handleUpdate(id, data) {
            const message = await colorItemService.updateColorItem(id, data);
            if (message) {
                showSuccessToast("Cập nhật thành công");
                await this.fetchColorItems();
            }
        }
    },

    async mounted() {
        await this.fetchColorItems();
    }
}
</script>
