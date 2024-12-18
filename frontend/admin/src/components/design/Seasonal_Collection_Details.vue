<template>
    <div class="seasonal-coll-dt">
        <span style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 20px;" class="font-weight-bold">CHI TIẾT BỘ SƯU TẬP
                <span class="text-success">"
                    {{ collection.collectionName }}"
                </span>
            </span>
            <button class="btn btn-danger" data-toggle="modal" data-target="#modalDeleteOneSeasonalCollection">
                Xóa
            </button>
        </span>

        <div class="row mt-4">
            <div class="col-3">
                <span style="color: grey; font-weight: bold; font-size: 18px;">Mô tả</span>
                <br>
                <span class="ml-4">{{ collection.description }}</span>
            </div>
            <div class="col-4 text-center">
                <span style="color: grey; font-weight: bold; font-size: 18px;">Ảnh bộ sưu tập</span>
                <div v-for="image in collection.images"
                    style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                    <img style="width: 100px; object-fit: contain; margin-bottom: 10px;"
                        :src="'http://localhost:3005/' + image" alt="">
                </div>
            </div>

            <!-- Danh sách các sản phẩm thuộc collection -->
            <div class="col-5">
                <span style="color: grey; font-weight: bold; font-size: 18px;">Danh sách các sản phẩm thuộc bộ sưu
                    tập</span>
                <span style="display: flex; justify-content: end;">
                    <button class="btn btn-success" data-toggle="modal" data-target="#modalAddProduct">Thêm sản
                        phẩm</button>
                </span>
                <div class="seasonal-coll-dt-product" v-for="pro in collection.productIds" :key="pro"
                    style="display: flex; align-items: center;">
                    <img width="100px"
                        :src="'http://localhost:3005/' + colorItems.find(element => element.productId == pro)?.images[0]"
                        alt="">
                    {{ products.find(element => element._id == pro)?.name }}
                    <!-- xóa sản phẩm thuộc collection -->
                    <input class="ml-4" type="checkbox" :value="pro" v-model="selectedDeleteProductIds" />
                </div>
                <span style="display: flex; justify-content: end;"> <button v-if="selectedDeleteProductIds.length > 0"
                        class="btn btn-dark" @click="deleteSelectedProducts">Xóa</button></span>

            </div>
        </div>

        <div class="modal" tabindex="-1" id="modalDeleteOneSeasonalCollection">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.prevent="deleteOneSeasonalCollection">
                        <div class="modal-body text-center">
                            <p>Bạn có chắc chắn xóa bộ sưu tập này không?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            <button type="submit" class="btn btn-dark">Đồng ý</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="modalAddProduct">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.prevent="addProductToCollection">
                        <div class="modal-header">
                            <h5 class="modal-title">Thêm sản phẩm vào bộ sưu tập</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <input type="text" placeholder="Tìm kiếm sản phẩm" class="form-control"
                                    @input="onSearchInput" v-model="searchName">
                            </div>
                        </div>
                        <div v-if="searchResults.length > 0">
                            <ul class="list-group" style="display: flex; align-items: center;">
                                <li class="list-group-item" v-for="product in searchResults" :key="product._id">
                                    <img width="100px"
                                        :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem.productId === product._id)?.images[0]"
                                        alt="">
                                    <label :for="'product-' + product._id">{{ product.name }}</label>
                                    <input class="ml-4" type="checkbox" :value="product._id"
                                        v-model="selectedProductIds" :id="'product-' + product._id" />
                                </li>
                            </ul>
                        </div>
                        <div v-else class="text-center">
                            <span class="text-danger">Không có sản phẩm nào</span>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            <button type="submit" class="btn btn-dark" @click="updateSeasonalCollection">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import collectionService from '@/services/collection.service';
import colorItemService from '@/services/colorItem.service';
import productService from '@/services/product.service';
import $ from 'jquery';
import { showSuccessToast } from '../shared/Toast_Notification.vue';
import { debounce } from "lodash";

export default {
    data() {
        return {
            seasonalCollections: [],
            collection: {},
            colorItems: [],
            products: [],
            searchResults: [],
            searchName: "",
            selectedProductIds: [],
            selectedDeleteProductIds: [],
        };
    },

    methods: {
        async fetchSeasonalCollections() {
            try {
                this.seasonalCollections = await collectionService.getAllSeasonalCollection();
                this.collection = this.seasonalCollections.find(coll => coll._id == this.$route.params.id);
            } catch (error) {
                console.log(error);
            }
        },

        async fetchProducts() {
            try {
                this.products = await productService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async fetchColorItems() {
            try {
                this.colorItems = await colorItemService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async deleteOneSeasonalCollection() {
            try {
                const message = await collectionService.deleteOneSeasonalCollection(this.$route.params.id);
                if (message) {
                    $('#modalDeleteOneSeasonalCollection').modal('hide');
                    showSuccessToast("Xóa bộ sưu tập thành công");
                    this.$router.go(-1);
                }
            } catch (error) {
                console.log(error);
            }
        },

        async deleteSelectedProducts() {
            try {

                const message = await collectionService.updateSeasonalCollection(this.collection._id, {
                    productIds: this.collection.productIds.filter(id => !this.selectedDeleteProductIds.includes(id))
                });
                if (message) {
                    showSuccessToast("Xóa sản phẩm thành công");
                    this.fetchSeasonalCollections();
                    this.selectedDeleteProductIds = [];
                }
            } catch (error) {
                console.log(error);
            }
        },

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
                product.name.toLowerCase().includes(query.toLowerCase()) &&
                !this.collection.productIds.includes(product._id)
            );
        },

        async updateSeasonalCollection() {
            try {
                const message = await collectionService.updateSeasonalCollection(this.collection._id, {
                    productIds: [...this.collection.productIds, ...this.selectedProductIds]
                });
                if (message) {
                    $('#modalAddProduct').modal('hide');
                    showSuccessToast("Thêm sản phẩm thành công");
                    this.fetchSeasonalCollections();
                    this.searchName = "";
                    this.searchResults = [];
                    this.selectedProductIds = [];
                }
            } catch (error) {
                console.log(error);
            }
        }
    },

    async mounted() {
        await this.fetchSeasonalCollections();
        await this.fetchProducts();
        await this.fetchColorItems();
    }
};
</script>

<style>
.seasonal-coll-dt {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}
</style>
