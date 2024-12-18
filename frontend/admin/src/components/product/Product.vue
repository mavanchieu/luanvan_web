<template>
    <div class="product">
        <p class="product-space">
            <span class="font-weight-bold product-count">TỔNG SỐ CÁC MẶT HÀNG KHÁC NHAU: <span style="color: red;">{{
                products.length }}</span></span>
            <span class="p-add-product">
                <span>
                    <router-link to="/product/add"><button class="btn btn-add-product">Thêm sản
                            phẩm</button></router-link>
                </span>
            </span>
        </p>
        <div class="divider-product">
        </div>
    </div>


    <div class="product">
        <div class="product-table ">
            <div class="search">
                <input type="text" placeholder="Tìm kiếm sản phẩm" @input="onSearchInput" v-model="searchName">
                <i class="fas fa-search"></i>
            </div>
            <div class="text-right mt-2">
                <Filter @submitFilter="submitFilter" />
            </div>
            <div v-if="searchResults.length > 0">
                <ul class="list-group">
                    <li class="list-group-item" v-for="product in searchResults" :key="product._id">
                        <img width="100px"
                            :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem.productId === product._id)?.images[0]"
                            alt="">
                        <router-link style="all: unset; cursor: pointer;"
                            :to="{ name: 'product_detail', params: { id: product._id } }">
                            <label :for="'product-' + product._id">{{ product.name }}</label>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div v-if="searchName != '' && searchResults.length == 0" class="text-center">
                <span class="text-danger">Không có sản phẩm nào</span>
            </div>

            <h5>Tất cả sản phẩm</h5>
            <table class="table">
                <thead class="thead thead-product">
                    <tr>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Chi tiết loại</th>
                        <th scope="col">Nhãn hiệu</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Xem chi tiết</th>
                    </tr>
                </thead>
                <tbody class="tbody-product" v-for="pro in products">
                    <tr>
                        <td class="text-center font-weight-bold">{{ pro.name }}</td>
                        <!-- <td><img style="width: 200px;" src="/src/assets/image/homepage/nike.png" alt=""></td> -->
                        <template v-if="colorItems.some(colorItem => colorItem.productId === pro._id)">
                            <img style="width: 150px; height: 120px; object-fit: contain;"
                                :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem.productId === pro._id)?.images[0]"
                                alt="">
                        </template>
                        <template v-for="type in types" :key="type._id">
                            <template v-if="type._id === pro.typeId">
                                <!-- <td>{{ type.name }}</td> -->
                            </template>
                        </template>
                        <template v-for="typeDetail in typeDetails" :key="typeDetail._id">
                            <template v-if="typeDetail._id === pro.typeDetailsId">
                                <td>{{ typeDetail.name }}</td>
                            </template>
                        </template>
                        <template v-for="brand in brands" :key="brand._id">
                            <template v-if="brand._id === pro.brandId">
                                <td>{{ brand.name }}</td>
                            </template>
                        </template>
                        <td v-if="pro.hidden == false"><button class=" btn btn-primary" disabled>Hiện</button></td>
                        <td v-else><button class=" btn btn-danger" disabled>Ẩn</button></td>
                        <td> <router-link :to="{ name: 'product_detail', params: { id: pro._id } }">
                                <i class="fa-solid fa-eye" style="color: #00a2ad;"></i>
                            </router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import typeService from '@/services/type.service';
import Filter from './Filter.vue';
import type_detailService from '@/services/type_detail.service';
import brandService from '@/services/brand.service';
import genderService from '@/services/gender.service';
import productService from '@/services/product.service';
import colorItemService from '@/services/colorItem.service';
import { debounce } from "lodash";
export default {
    components: {
        Filter,
    },

    data() {
        return {
            types: [],
            typeDetails: [],
            brands: [],
            genders: [],
            products: [],
            colorItems: [],
            searchResults: [],
            searchName: [],
        };
    },

    methods: {
        // tìm kiếm sản phẩm  
        async onSearchInput() {
            await this.debouncedSearch();
        },

        debouncedSearch: debounce(async function () {
            const searchQuery = this.searchName.trim();
            if (searchQuery) {
                this.searchResults = await this.filterData(searchQuery);
            } else {
                this.searchResults = [];
            }
        }, 300),

        async filterData(query) {
            await this.fetchProducts();
            return this.products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
        },

        async fetchTypes() {
            try {
                this.types = await typeService.getAll();
            } catch (error) {
                console.error("Lỗi", error);
            }
        },

        async fetchTypeDetails() {
            try {
                this.typeDetails = await type_detailService.getAll();
            } catch (error) {
                console.error("Lỗi", error);
            }
        },

        async fetchBrands() {
            try {
                this.brands = await brandService.getAll();
            } catch (error) {
                console.error("Lỗi", error);
            }
        },

        async fetchGenders() {
            try {
                this.genders = await genderService.getAll();
            } catch (error) {
                console.error("Lỗi", error);
            }
        },

        async fetchProducts() {
            try {
                this.products = await productService.getAll();
            } catch (error) {
                console.error("Lỗi", error);
            }
        },

        async fetchColorItems() {
            try {
                this.colorItems = await colorItemService.getAll();
            } catch (error) {
                console.error("Lỗi", error);
            }
        },

        submitFilter(data) {
            console.log(data);
            this.products = [...data];
        }
    },

    async mounted() {
        await this.fetchTypes();
        await this.fetchTypeDetails();
        await this.fetchBrands();
        await this.fetchGenders();
        await this.fetchProducts();
        await this.fetchColorItems();
    }
}
</script>


<style>
.product {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.product-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-count {
    font-size: 20px;
}

.p-add-product {
    display: flex;
    justify-content: end;
}

.btn-add-product {
    background-color: rgb(0, 198, 109);
    color: white;
}

.btn-add-product:hover {
    background-color: rgb(0, 129, 71);
    color: white;
}

.divider-product {
    border: 1px solid black;
}

.table .thead-product tr th {
    text-align: center;
}

.table .tbody-product tr td {
    text-align: center;
}

.thead {
    background-color: black;
    color: white;
}

.table tbody tr:hover {
    background-color: #dfdfdf;
}

.see-details {
    text-decoration: none;
    color: black;
}

.see-details:hover {
    text-decoration: none;
    color: blue;
}

.search {
    position: relative;
    display: flex;
    justify-content: end;
}

.search input {
    width: 30%;
    padding: 10px 40px 10px 10px;
    border: 1px solid #000000;
    border-radius: 4px;
    height: 40px;
}

.search .fa-search {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
}
</style>