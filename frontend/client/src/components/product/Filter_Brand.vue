<template>
    <div class="filter">
        <div class="row filter-title">
            <p class="product-space">
                <span class="product-category-name">{{ name }}</span>
                <span>
                    <button class="btn-filter" @click="openModalFilter">
                        Lọc Sản Phẩm
                    </button>
                </span>
            </p>
        </div>
    </div>
    <div v-if="isModalVisible" class="modal modal-filter" @click.self="closeModal">
        <div class="modal-filter-content">
            <span class="close header-modal-close" @click="closeModal">&times;</span>
            <p class="modal-filter-title">Lọc Sản Phẩm</p>
            <div class="modal-divider">

            </div>
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn font-weight-bold btn-block text-left" type="button"
                                data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
                                aria-controls="collapseOne">
                                NHÃN HIỆU
                            </button>
                        </h2>
                    </div>
                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <!-- {{ checkBoxBrands }} -->
                            <p class="ml-4" v-for="brand in brands" :key="brand._id">
                            <p class="modal-checkbox-flex ">
                                <span>
                                    <input type="checkbox" v-model="checkBoxBrands" :value="brand._id">
                                </span>
                                <span class="ml-4"> {{ brand.name }}</span>
                            </p>
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <span class="filter-space">
                        <button class="modal-btn-filter modal-filter-flex" @click="applyFilter">ÁP DỤNG<i
                                class="fa-solid fa-arrow-right fa-xs"></i></button>
                    </span>


                </div>
            </div>
        </div>
    </div>
</template>
<script>
import brandService from '@/services/brand.service';
import { type } from 'jquery';
import { ref } from 'vue';
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        products: { type: Array, required: true },

    },
    emits: ['filteredProducts'],
    computed: {
        getAssignProducts() {
            return [...this.products];
        },
    },
    data() {
        return {
            isModalVisible: false,
            brands: [],
            radioPrice: ref(),
            checkBoxBrands: ref([]),
            filteredProducts: [],

            assignProducts: [...this.$props.products],
        };
    },
    methods: {
        openModalFilter() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },

        async fetchAllbrands() {
            try {
                this.brands = await brandService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        applyFilter() {

            this.filteredProducts = this.assignProducts.filter(pro => this.checkBoxBrands.some(brand => brand === pro.brandId));
            console.log(this.checkBoxBrands);
            console.log(this.assignProducts);
            console.log(this.filteredProducts);
            this.$emit("filteredProducts", this.filteredProducts);
        },
    },
    async mounted() {
        await this.fetchAllbrands();
        this.assignProducts = this.getAssignProducts;
    }
}
</script>
<style>
.filter {
    position: fixed;
    z-index: 99;
    max-width: 100%;
    width: 100%;
}

.filter-title {
    display: flex;
    align-items: center;
    background-color: rgb(246, 246, 246);
    height: 50px;
    line-height: 30px;
    font-size: 10;
    font-family: 'Times New Roman', Times, serif;
}

.filter-space {
    display: flex;
    justify-content: space-between;
}

.btn-filter {
    background-color: white;
    border: 0.5px solid black;
}

.btn-filter:hover {
    background-color: black;
    color: white;
}

/* modal */
.modal-filter {
    display: flex;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    right: -100px;
    width: 50%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: transform 0.6s ease-in-out;
    transform: translateX(100%);
    font-family: 'Courier New', Courier, monospace;
}

.modal-fliter.show {
    transform: translateX(0);
}

.modal-filter-content {
    background-color: #fff;
    padding: 20px;
    width: 100%;
    max-width: 400px;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    position: relative;
}

.modal-filter-title {
    font-weight: bold;
    text-align: start;
    font-size: 20px;
}

.close {
    position: absolute;
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    top: 10px;
    right: 20px;
    bottom: 10px;

}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
}



.header-modal-close {
    text-align: end;
    color: black;
}

.modal-divider {
    width: 100%;
    border: 1px solid rgb(179, 179, 179);
    margin-bottom: 10px;
}

.modal-btn-filter {
    margin-top: 40px;
    color: white;
    background-color: black;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
}

.modal-filter-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.modal-checkbox-flex {
    display: flex;
    gap: 20xp;
    align-items: center;
}
</style>