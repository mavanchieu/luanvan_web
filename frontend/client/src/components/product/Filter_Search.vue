<template>
    <div class="filter-search">
        <div class="row filter-search-title">
            <span class="btn-filter-search">
                <button @click="openModalFilter" data-toggle="modal" data-target="#modalSearch">
                    Lọc Sản Phẩm
                </button>
            </span>
        </div>
    </div>
    <div v-if="isModalVisible" class="modal modal-filter-search" @click.self="closeModal" id="modalSearch">
        <div class="modal-filter-search-content">
            <span class="close header-modal-close" data-dismiss="modal">&times;</span>
            <p class="modal-filter-search-title">Lọc Sản Phẩm</p>
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
                        <div class="card-header" id="heading13">
                            <h2 class="mb-0">
                                <button class="btn font-weight-bold btn-block text-left" type="button"
                                    data-toggle="collapse" data-target="#collapse13" aria-expanded="true"
                                    aria-controls="collapse13">
                                    LOẠI SẢN PHẨM
                                </button>
                            </h2>
                        </div>
                        <div id="collapse13" class="collapse" aria-labelledby="heading13"
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
                    <div>
                        <span class="">
                            <button class="modal-btn-filter-search modal-filter-search-flex" type="submit">ÁP DỤNG<i
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
import { type } from 'jquery';
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

            filteredProducts: [],

            genders: [],
            checkBoxGenders: ref([]),
            checkBoxTypes: ref([]),

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
            } catch (error) {
                console.log(error);
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
        async fetchGenders() {
            try {
                this.genders = await genderService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        applyFilter() {
            // console.log(this.checkBoxBrands);
            // console.log(this.checkBoxGenders);
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

            console.log("sau khi lọc", this.filteredProducts);
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
.filter-search {
    position: fixed;
    z-index: 99;
    max-width: 100%;
    width: 100%;
}

.btn-filter-search {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-left: 90%;
}

.filter-search-title {
    display: flex;
    align-items: center;
    background-color: rgb(246, 246, 246);
    height: 50px;
    line-height: 30px;
    font-size: 10;
    font-family: 'Times New Roman', Times, serif;
}

.filter-search-space {
    display: flex;
    justify-content: end;
}


.modal-filter-search {
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

.modal-fliter-search.show {
    transform: translateX(0);
}

.modal-filter-search-content {
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

.modal-filter-search-title {
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

.modal-btn-filter-search {
    margin-top: 40px;
    color: white;
    background-color: black;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
}

.modal-filter-search-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

/* .modal-btn-filter-search{

} */

.modal-checkbox-flex {
    display: flex;
    gap: 20xp;
    align-items: center;
}
</style>