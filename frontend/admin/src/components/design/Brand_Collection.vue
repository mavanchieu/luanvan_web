<template>
    <div class="coll">
        <span class="coll-header">
            <span>
                <h5 class="font-weight-bold">CÁC BỘ SƯU TẬP CỦA CỬA HÀNG</h5>
            </span>
            <span><button class="btn" data-toggle="modal" data-target="#modalAddColl">Thêm bộ sưu tập</button></span>
        </span>

        <table class="table mt-4" v-if="collections.length > 0">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Tên bộ sưu tập</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col" class="text-center">Ảnh</th>
                    <th scope="col" class="text-center">Chỉnh</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(coll, index) in collections" :key="coll._id">
                    <th scope="row"> {{ brands.find(brand => brand._id == coll.brandId)?.name }}</th>
                    <td>{{ coll.description }}</td>
                    <td class="text-center">
                        <template v-for="image in coll.images">
                            <img style="width: 100px;gap: 10px;" :src="'http://localhost:3005/' + image" alt="">
                        </template>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-danger" data-toggle="modal" data-target="#modalDeleteOneBrandCollection"
                            @click="openModalDeleteOneBrandCollection(coll._id)">Xóa</button>
                        <button class="btn btn-primary ml-2">Cập nhật</button>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- Modal thêm collection -->
        <div class="modal" tabindex="-1" id="modalAddColl">
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
                            <label for="brand" class="font-weight-bold">Chọn nhãn hiệu</label>
                            <select name="brand" id="brand" v-model="brandId" style="width: 50%;" class="form-control">
                                <option value="">Chọn</option>
                                <option v-for="brand in brands" :value="brand._id" :key="brand._id">{{
                                    brand.name }}</option>
                            </select>
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
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            <button type="submit" class="btn btn-success">Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="modalDeleteOneBrandCollection">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>Bạn có chắc chắn xóa bộ sưu tập này không?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-dark" @click="deleteOneBrandCollection">Đồng ý</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import brandService from '@/services/brand.service';
import collectionService from '@/services/collection.service';
import { showSuccessToast } from '../shared/Toast_Notification.vue';
import $ from 'jquery';

export default {
    data() {
        return {
            brands: [],
            images: [],
            brandId: "",
            description: "",
            collections: [],
            collectionId: "",
        }
    },

    methods: {
        async fetchBrands() {
            try {
                this.brands = await brandService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async fetchCollections() {
            try {
                this.collections = await collectionService.getAll();
                console.log(this.collections.length);
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

        async createCollection() {
            try {
                const formData = new FormData();
                this.images.forEach((image) => {
                    formData.append("images", image.file);
                });

                formData.append("description", this.description);
                formData.append("brandId", this.brandId);

                const message = await collectionService.create(formData);
                if (message) {
                    $('#modalAddColl').modal('hide');
                    showSuccessToast("Đã thêm bộ sưu tập thành công");
                    this.fetchCollections();
                }
            } catch (error) {
                console.log(error);
            }
        },
        openModalDeleteOneBrandCollection(id) {
            this.collectionId = id;
        },

        async deleteOneBrandCollection() {
            try {
                const message = await collectionService.deleteOneBrandCollection(this.collectionId);
                if (message) {
                    $('#modalDeleteOneBrandCollection').modal('hide');
                    showSuccessToast("Xóa bộ sưu tập thành công");
                    this.fetchCollections();
                }
            } catch (error) {
                console.log(error);
            }
        }


    },

    async mounted() {
        await this.fetchBrands();
        await this.fetchCollections();
    }
}
</script>

<style>
.coll {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.coll-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.coll-header button {
    background-color: green;
    color: white;
}

.coll-header button:hover {
    background-color: rgb(119, 119, 119);
    color: white;
}

.container1 {
    display: flex;
    gap: 10px;
    justify-content: center;
}
</style>