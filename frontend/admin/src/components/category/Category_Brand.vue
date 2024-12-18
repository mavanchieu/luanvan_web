<template>
    <div class="">
        <p v-for="brand in brands">
            {{ brand.name }}
        </p>
    </div>
</template>

<script>

import brandService from '@/services/brand.service';
export default {
    components: {
        Category,
    },
    data() {
        return {
            selected: '1',
            brands: [],
            index: 0,
            brand_id: '',
            isVisibleModal: false,
        };
    },
    methods: {
        selectedCateGender() {
            this.selected = '1';
        },
        selectedCateBrand() {
            this.selected = '2';
        },
        selectedCateSize() {
            this.selected = '3';
        },
        selectedCateType() {
            this.selected = '4';
        },

        async fetchAllBrands() {
            this.brands = await brandService.getAll();
        },

        openModalDelete(id) {
            this.isVisibleModal = true;
            this.brand_id = id;
        },

        closeModal() {
            this.isVisibleModal = false;
            this.brand_id = null;
        },

        async deleteOneBrand() {
            if (this.brand_id) {
                try {
                    const message = await brandService.delete(this.brand_id);
                    this.closeModal();
                    showSuccessToast(message.message);
                    await this.fetchAllBrands();
                    this.closeModal();
                    window.history.go('/category/brand')
                } catch {
                    console.error("Lỗi không xóa brand được");
                }
            }
        }
    },
    mounted() {
        this.fetchAllBrands();
    }
}
</script>


<style>
.category {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.cate {
    display: flex;
    gap: 40px;
}

.cate-divider {
    border: 0.5px solid rgb(119, 119, 119);
}

.table {
    padding: 20px;
    padding-right: 20px;
}

.thead {
    background-color: black;
    color: white;
}

.table tbody tr:hover {
    background-color: #dfdfdf;
}

.cate-delete,
.cate-update {
    background-color: white;
    color: black;
    border: 0.5px solid black;
    border-radius: 5px;
}

.cate-delete:hover {
    color: rgb(255, 0, 0);
    font-weight: bold;
}

.cate-update:hover {
    color: rgb(0, 135, 38);
    font-weight: bold;
}

.cate-delete-no {
    background-color: white;
    color: black;
    border: 1px solid black;
}

.cate-delete-yes {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    border: 1px solid black;
}

.cate-delete-yes:hover {
    background-color: rgb(137, 137, 137);
    color: rgb(255, 255, 255);
    border: 1px solid black;
}
</style>
