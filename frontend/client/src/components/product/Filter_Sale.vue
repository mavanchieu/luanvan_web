<template>
    <div class="filter-sale">
        <div class="row filter-sale-title">
            <span class="btn-filter-sale">
                <button @click="openModalFilter" data-toggle="modal" data-target="#modalSearch">
                    Lọc Sản Phẩm
                </button>
            </span>
        </div>
    </div>
    <div v-if="isModalVisible" class="modal modal-filter-sale" @click.self="closeModal" id="modalSearch">
        <div class="modal-filter-sale-content">
            <span class="close header-modal-close" data-dismiss="modal">&times;</span>
            <p class="modal-filter-sale-title">Lọc Sản Phẩm</p>
            <div class="modal-divider">

            </div>
            <div class="accordion" id="accordionExample">
                <form action="" @submit.prevent="applyFilter">
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
                    <div class="card">
                        <div class="card-header" id="headingTwo">
                            <h2 class="mb-0">
                                <button class="btn font-weight-bold btn-block text-left" type="button"
                                    data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"
                                    aria-controls="collapseTwo">
                                    GIỚI TÍNH
                                </button>
                            </h2>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                            data-parent="#accordionExample">
                            <div class="card-body">

                                <p class="ml-4" v-for="gender in genders" :key="gender._id">
                                <p class="modal-checkbox-flex ">
                                    <span>
                                        <input type="checkbox" v-model="checkBoxGenders" :value="gender._id">
                                    </span>
                                    <span class="ml-4"> {{ gender.name }}</span>
                                </p>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="heading11">
                            <h2 class="mb-0">
                                <button class="btn font-weight-bold btn-block text-left" type="button"
                                    data-toggle="collapse" data-target="#collapse11" aria-expanded="true"
                                    aria-controls="collapse11">
                                    LOẠI SẢN PHẨM
                                </button>
                            </h2>
                        </div>
                        <div id="collapse11" class="collapse" aria-labelledby="heading11"
                            data-parent="#accordionExample">
                            <div class="card-body">
                                <p class="ml-4" v-for="type in types" :key="type._id">
                                <p class="modal-checkbox-flex ">
                                    <span>
                                        <input type="checkbox" v-model="checkBoxTypes" :value="type._id">
                                    </span>
                                    <span class="ml-4"> {{ type.name }}</span>
                                </p>
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card">
            <div class="card-header" id="heading10">
            <h2 class="mb-0">
                <button class="btn font-weight-bold  btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse10" aria-expanded="false" aria-controls="collapse10">
                    GIÁ
                </button>
            </h2>
            </div>
            <div id="collapse10" class="collapse" aria-labelledby="heading10" data-parent="#accordionExample">
                <div class="card-body">
                    <p class="text-left ml-4"> <input v-model="radioPrice" value="hahaha" type="radio" name="" id="1" style="margin-top: 2px;"> <span>< 1.000.000</span></p>
                    <p class="text-left ml-4"><input v-model="radioPrice" value="huhuhu" type="radio" name="" id="2"> <span>> 1.000.000 < 2.000.000</span></p>
                    <p class="text-left ml-4"><input v-model="radioPrice" value="hhuhuh" type="radio" name="" id="3"> <span>> 2.000.000</span></p>
                </div>
            </div>
        </div> -->
                    <div>
                        <span class="">
                            <button class="modal-btn-filter-sale modal-filter-sale-flex" type="submit">ÁP DỤNG<i
                                    class="fa-solid fa-arrow-right fa-xs"></i></button>
                        </span>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>
<script>
import brandService from '@/services/brand.service';
import genderService from '@/services/gender.service';
import typeService from '@/services/type.service';
import $ from 'jquery';
import { ref } from 'vue';
export default {
    props: {
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
            checkBoxBrands: ref([]),
            checkBoxTypes: ref([]),

            filteredProducts: [],

            genders: [],
            checkBoxGenders: ref([]),

            radioPrice: ref(),

            assignProducts: [...this.$props.products],

            types: [],
        };
    },
    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        openModalFilter() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },

        async fetchAllbrands() {
            try {
                this.brands = await brandService.getAll();
                this.brands.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                console.log(this.brands);
            } catch (error) {
                console.log(error);
            }
        },

        async fetchGenders() {
            try {
                this.genders = await genderService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async fetchTypes() {
            try {
                this.types = await typeService.getAll();
                this.types.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                console.log(this.types);
            } catch (error) {
                console.error(error);
            }
        },

        applyFilter() {

            if (this.checkBoxBrands.length === 0 && this.checkBoxGenders.length === 0 && this.checkBoxTypes.length === 0) {
                this.filteredProducts = this.assignProducts;
            } else {
                this.filteredProducts = this.assignProducts;

                if (this.checkBoxBrands.length !== 0) {
                    this.filteredProducts = this.filteredProducts.filter(pro =>
                        this.checkBoxBrands.includes(pro.brandId)
                    );
                }

                if (this.checkBoxGenders.length !== 0) {
                    this.filteredProducts = this.filteredProducts.filter(pro =>
                        this.checkBoxGenders.includes(pro.genderId)
                    );
                }

                if (this.checkBoxTypes.length !== 0) {
                    this.filteredProducts = this.filteredProducts.filter(pro =>
                        this.checkBoxTypes.includes(pro.typeId)
                    );
                }
            }

            $('#modalSearch').modal('hide');
            // console.log("sau khi lọc" ,this.filteredProducts);
            this.$emit("filteredProducts", this.filteredProducts);
        },
    },
    async mounted() {
        await this.fetchGenders();
        await this.fetchAllbrands();
        await this.fetchTypes();
        this.assignProducts = this.getAssignProducts;
    }
}
</script>
<style>
.filter-sale {
    position: fixed;
    z-index: 99;
    max-width: 100%;
    width: 100%;
}

.btn-filter-sale {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-left: 90%;
}

.filter-sale-title {
    display: flex;
    align-items: center;
    background-color: rgb(246, 246, 246);
    height: 50px;
    line-height: 30px;
    font-size: 10;
    font-family: 'Times New Roman', Times, serif;
}

.filter-sale-space {
    display: flex;
    justify-content: end;
}


.modal-filter-sale {
    display: flex;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    width: 74%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: transform 0.6s ease-in-out;
    transform: translateX(100%);
    font-family: 'Courier New', Courier, monospace;
}

.modal-fliter-sale.show {
    transform: translateX(0);
}

.modal-filter-sale-content {
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

.modal-filter-sale-title {
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

.modal-btn-filter-sale {
    margin-top: 40px;
    color: white;
    background-color: black;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
}

.modal-filter-sale-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

/* .modal-btn-filter-sale{

} */

.modal-checkbox-flex {
    display: flex;
    gap: 20xp;
    align-items: center;
}
</style>