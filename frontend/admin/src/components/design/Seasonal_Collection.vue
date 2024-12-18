<template>
    <div class="seasonal-coll">
        <span class="seasonal-coll-header">
            <span>
                <h5 class="font-weight-bold">CÁC BỘ SƯU TẬP THEO MÙA</h5>
            </span>
            <span><button class="btn" data-toggle="modal" data-target="#modalAddSeasonalColl">Thêm bộ sưu
                    tập</button></span>
        </span>

        <table class="table mt-4" v-if="seasonCollections.length > 0">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Tên bộ sưu tập</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col" class="text-center">Ảnh</th>
                    <th scope="col" class="text-center">Xem chi tiết</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(coll, index) in seasonCollections" :key="coll._id">
                    <th scope="row">{{ coll.collectionName }} </th>
                    <td>{{ coll.description }}</td>
                    <td class="text-center">
                        <template v-for="image in coll.images">
                            <img style="width: 100px;gap: 10px;" :src="'http://localhost:3005/' + image" alt="">
                        </template>
                    </td>
                    <td class="text-center">
                        <router-link :to="{ name: 'seasonal_collection_details', params: { 'id': coll._id } }"><i
                                style="cursor: pointer;" class="fa-solid fa-eye"></i></router-link>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- Modal thêm collection -->
        <div class="modal custom-modal" tabindex="-1" id="modalAddSeasonalColl">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-primary">THÊM BỘ SƯU TẬP MỚI</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form action="" @submit.prevent="createCollection">
                        <div class="modal-body">
                            <label for="collectionName" class="font-weight-bold">Nhập tên bộ sưu tập</label>
                            <input type="text" name="collectionName" id="collectionName" class="form-control"
                                placeholder="Nhập tên bộ sưu tập" v-model="collectionName">
                            <div class="coll-description mt-4">
                                <label for="description" class="font-weight-bold">Mô tả bộ sưu tập</label>
                                <textarea name="description" id="description" class="form-control"
                                    v-model="description"></textarea>
                            </div>
                            <div>
                                <div class="mt-4">
                                    <div class="top">
                                        <p class="font-weight-bold">Thêm ảnh</p>
                                    </div>
                                    <div class="container1">
                                        <div v-if="images.length < 1 || images.length > 4">
                                            <h6 class="text-danger">Mỗi bộ sưu tập ít nhất 1 ảnh, tối đa 3 ảnh</h6>
                                        </div>
                                        <div class="coll-image" v-for="(image, imgIndex) in images" :key="imgIndex">
                                            <span class="delete" @click="deleteImage(images, imgIndex)"
                                                style="font-size: 30px; color: red; cursor: pointer;">&times;</span>
                                            <img style="width: 100px; height: 100px;" :src="image.url" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div class=" mt-4">
                                    <label for="image"><span class="font-weight-bold" style="font-size: 18px;">
                                            Chọn
                                            ảnh</span></label>
                                    <br>
                                    <input id="image" style="all: unset;" type="file" multiple
                                        @change="handleFileUpload" />
                                </div>
                                <button type="button" class="btn mt-4 btn-dark" data-toggle="modal"
                                    data-target="#modalAddSeasonalColl2">Thêm
                                    sản phẩm vào bộ sưu tập</button>
                                <div v-if="selectedProductIds.length > 0" class="mt-4">
                                    <h6>Danh sách các sản đã được thêm</h6>
                                    <div v-for="select in selectedProductIds" class="ml-2">
                                        {{ products.find(pro => pro._id == select).name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            <button type="submit" class="btn btn-primary">Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="modalAddSeasonalColl2">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-primary">Thêm sản phẩm vào bộ sưu tập</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="text" placeholder="Tìm kiếm sản phẩm" class="form-control" @input="onSearchInput"
                            v-model="searchName">
                    </div>
                    <div v-if="searchResults.length > 0" style="display: flex; align-items: center;">
                        <ul class="list-group">
                            <li class="list-group-item" v-for="product in searchResults" :key="product._id">
                                <img width="100px"
                                    :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem.productId === product._id)?.images[0]"
                                    alt="">

                                <label :for="'product-' + product._id">{{ product.name }}</label>
                                <input class="ml-4" type="checkbox" :value="product._id" v-model="selectedProductIds"
                                    :id="'product-' + product._id" />
                            </li>
                        </ul>
                    </div>
                    <div v-else class="text-center">
                        <span class="text-danger ">Không có sản phẩm nào</span>
                    </div>
                    <div style="display: flex;  justify-content: end; margin-right: 20px;"
                        v-if="searchResults.length > 0">
                        <button class="btn btn-dark" @click="saveSelectedProducts">Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import collectionService from '@/services/collection.service';
import { showSuccessToast } from '../shared/Toast_Notification.vue';
import $ from 'jquery';
import productService from '@/services/product.service';
import { debounce } from "lodash";
import colorItemService from '@/services/colorItem.service';
export default {
    data() {
        return {
            images: [],
            description: "",
            seasonCollections: [],
            selectedProductIds: [],
            collectionName: "",
            products: [],
            colorItems: [],
            searchResults: [],
            searchName: "",
            productIds: [],
        }
    },

    methods: {
        async fetchProducts() {
            try {
                this.products = await productService.getAll();
                this.colorItems = await colorItemService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async onSearchInput() {
            console.log('1');
            await this.debouncedSearch();
            console.log(this.searchResults);
        },

        debouncedSearch: debounce(async function () {
            const searchQuery = this.searchName.trim();
            if (searchQuery) {
                this.searchResults = await this.filterData(searchQuery);
                console.log(this.searchResults.length);
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

        async fetchSeasonalCollections() {
            try {
                this.seasonCollections = await collectionService.getAllSeasonalCollection();
                console.log(this.seasonCollections);
            } catch (error) {
                console.log(error);
            }
        },

        handleFileUpload(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.images.push({
                        name: file.name,
                        url: e.target.result,
                        file: file
                    });
                };
                reader.readAsDataURL(file);
            }
        },

        deleteImage(images, index) {
            images.splice(index, 1);
        },

        saveSelectedProducts() {
            this.searchName = '';
            this.searchResults = {};
            this.productIds = [...this.selectedProductIds];
            console.log("Selected Product IDs:", this.productIds);
        },

        async createCollection() {
            try {
                const formData = new FormData();
                this.images.forEach((image) => {
                    formData.append("images", image.file);
                });

                formData.append("description", this.description);
                formData.append("collectionName", this.collectionName);
                formData.append("productIds", JSON.stringify(this.productIds));

                const message = await collectionService.createSeasonalCollection(formData);
                if (message) {
                    $('#modalAddSeasonalColl').modal('hide');
                    showSuccessToast("Đã thêm bộ sưu tập thành công");
                    this.fetchSeasonalCollections();
                }
            } catch (error) {
                console.log(error);
            }
        },


    },

    async mounted() {
        await this.fetchSeasonalCollections();
        await this.fetchProducts();
    }
}
</script>

<style>
.seasonal-coll {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.seasonal-coll-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.seasonal-coll-header button {
    background-color: green;
    color: white;
}

.seasonal-coll-header button:hover {
    background-color: rgb(119, 119, 119);
    color: white;
}

.container1 {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.custom-modal {
    overflow-y: auto;
}

.list-group {
    overflow-y: auto;
}
</style>