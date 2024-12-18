<template>
    <div class="row">
        <div class="col-8">
        </div>
        <div class="col-4">
            <button class="btn btn-dark" @click="openModalFilter">Lọc</button>
        </div>
    </div>

    <div v-if="isModalVisible" class="modal modal-filter" @click.self="closeModalFilter">
        <div class="modal-filter-content">
            <span style="display: flex;
            justify-content: space-between;">
                <p class="modal-filter-title">Lọc Sản Phẩm</p>
                <span class="close header-modal-close" @click="closeModalFilter" style="cursor: pointer;">&times;</span>
            </span>
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="heading7">
                        <h2 class="mb-0">
                            <button class="btn font-weight-bold btn-block text-left" type="button"
                                data-toggle="collapse" data-target="#collapse7" aria-expanded="true"
                                aria-controls="collapse7">
                                GIỚI TÍNH
                            </button>
                        </h2>
                    </div>
                    <div id="collapse7" class="collapse show" aria-labelledby="heading7"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <p class="ml-4" v-for="gender in genders" :key="gender._id">
                            <p class="modal-checkbox-flex "><span><input type="checkbox" v-model="checkBoxGenders"
                                        :value="gender._id"></span><span class="ml-4"> {{ gender.name }}</span></p>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="heading8">
                        <h2 class="mb-0">
                            <button class="btn font-weight-bold    btn-block text-left collapsed" type="button"
                                data-toggle="collapse" data-target="#collapse8" aria-expanded="false"
                                aria-controls="collapse8">
                                LOẠI SẢN PHẨM
                            </button>
                        </h2>
                    </div>
                    <div id="collapse8" class="collapse" aria-labelledby="heading8" data-parent="#accordionExample">
                        <div class="card-body">
                            <p class="ml-4" v-for="type in types" :key="type._id">
                            <p class="modal-checkbox-flex "><span><input type="checkbox" v-model="checkBoxTypes"
                                        :value="type._id"></span><span class="ml-4"> {{ type.name }}</span></p>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="heading9">
                        <h2 class="mb-0">
                            <button class="btn font-weight-bold  btn-block text-left collapsed" type="button"
                                data-toggle="collapse" data-target="#collapse9" aria-expanded="false"
                                aria-controls="collapse9">
                                NHÃN HIỆU
                            </button>
                        </h2>
                    </div>
                    <div id="collapse9" class="collapse" aria-labelledby="heading9" data-parent="#accordionExample">
                        <div class="card-body">
                            <p class="ml-4" v-for="brand in brands" :key="brand._id">
                            <p class="modal-checkbox-flex "><span><input type="checkbox" v-model="checkBoxBrands"
                                        :value="brand._id"></span><span class="ml-4"> {{
                                            brand.name }}</span></p>
                            </p>
                        </div>
                    </div>
                </div>
                <!-- <div class="card">
                    <div class="card-header" id="heading10">
                        <h2 class="mb-0">
                            <button class="btn font-weight-bold  btn-block text-left collapsed" type="button"
                                data-toggle="collapse" data-target="#collapse10" aria-expanded="false"
                                aria-controls="collapse10">
                                GIÁ
                            </button>
                        </h2>
                    </div>
                    <div id="collapse10" class="collapse" aria-labelledby="heading10" data-parent="#accordionExample">
                        <div class="card-body">
                            <p class="text-left ml-4"> <input type="radio" name="" id="" style="margin-top: 2px;">
                                <span>
                                    < 1.000.000</span>
                            </p>
                            <p class="text-left ml-4"><input type="radio" name="" id=""> <span>> 1.000.000 <
                                        2.000.000</span>
                            </p>
                            <p class="text-left ml-4"><input type="radio" name="" id=""> <span>> 2.000.000</span></p>
                        </div>
                    </div>
                </div> -->
                <div>
                    <button class="modal-btn-filter modal-filter-flex" type="submit" @click="submitFilter">ÁP DỤNG<i
                            class="fa-solid fa-arrow-right fa-xs"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import brandService from '@/services/brand.service';
import genderService from '@/services/gender.service';
import productService from '@/services/product.service';
import typeService from '@/services/type.service';
import type_detailService from '@/services/type_detail.service';
import { error } from 'jquery';
import { ref } from 'vue';

export default {

    computed: {

    },

    data() {
        return {
            isModalVisible: false,
            genders: [],
            brands: [],
            types: [],
            typeDetails: [],
            checkBoxGenders: ref([]),
            checkBoxTypes: ref([]),
            checkBoxBrands: ref([]),

            products: [],

            filterProducts: [],
        };
    },
    emits: ['submitFilter'],
    methods: {
        openModalFilter() {
            this.isModalVisible = true;
        },
        closeModalFilter() {
            this.isModalVisible = false;
        },

        async fetchProducts() {
            try {
                this.products = await productService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async fetchAllGenders() {
            try {
                this.genders = await genderService.getAll();
                // console.log(this.genders);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchAllBrands() {
            try {
                this.brands = await brandService.getAll();
                // console.log(this.brands);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchAllTypes() {
            try {
                this.types = await typeService.getAll();

            } catch (error) {
                console.log(error);
            }
        },

        async fetchAllTypeDetails() {
            try {
                this.typeDetails = await type_detailService.getAll();

            } catch {
                error(error)
            }
        },

        submitFilter() {
            if (this.checkBoxGenders.length != 0) {
                this.filterProducts = this.products.filter(pro => this.checkBoxGenders.some(genderId => genderId === pro.genderId));
            }
            if (this.checkBoxTypes.length != 0) {
                this.filterProducts = this.products.filter(pro => this.checkBoxTypes.some(typeId => typeId === pro.typeId));
            }
            if (this.checkBoxBrands.length != 0) {
                this.filterProducts = this.products.filter(pro => this.checkBoxBrands.some(brandId => brandId === pro.brandId));
            }
            this.$emit('submitFilter', this.filterProducts);
        }
    },
    async mounted() {
        await this.fetchProducts();
        await this.fetchAllGenders();
        await this.fetchAllBrands();
        await this.fetchAllTypes();
        await this.fetchAllTypeDetails();
        console.log("DL", this.$props.products);
    }
}
</script>


<style>
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

.modal-btn-filter {}

.modal-checkbox-flex {
    display: flex;
    gap: 20xp;
    align-items: center;
}

.filter {
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

.close {
    all: unset;
    font-size: 32px;
    width: 30px;
    height: 30px;
    display: inline-block;
    line-height: 30px;
}
</style>