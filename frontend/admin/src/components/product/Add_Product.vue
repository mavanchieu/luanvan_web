<template>
    <div class="add_pro">
        <h5 class="text-center font-weight-bold text-primary">THÊM SẢN PHẨM</h5>
        <div class="mt-4 add_pro_form">
            <form action="" @submit.prevent="addProduct" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-5">
                        <div class="form-group mt-4">
                            <span class="add_pro_space">
                                <span> Chọn Giới Tính</span>
                                <select name="gender" id="gender" v-model="product.genderId" @change="onChangeGender">
                                    <option value="">Chọn</option>
                                    <option v-for="gender in genders" :value=gender._id :key="gender._id">{{ gender.name
                                        }}</option>
                                </select>
                            </span>
                        </div>

                        <div class="form-group mt-4">
                            <span class="add_pro_space">
                                <span>Chọn Chi Tiết Loại</span>
                                <select name="typeDetail" id="typeDetail" @change="onTypeDetailsChange"
                                    v-model="selectedTypeDetails">
                                    <option value="">Chọn</option>
                                    <option v-for="typeDetail in typeDetails"
                                        :value="{ typeId: typeDetail.typeId, typeDetailId: typeDetail._id }"
                                        :key="typeDetail._id">{{ typeDetail.name }}</option>
                                </select>
                            </span>
                        </div>

                        <div class="form-group mt-4">
                            <span class="add_pro_space">
                                <span> Chọn Nhãn Hiệu</span>
                                <select name="brand" id="brands" v-model="product.brandId">
                                    <option v-for="brand in brands" :value=brand._id :key="brand._id">{{ brand.name }}
                                    </option>
                                </select>
                            </span>
                        </div>
                    </div>

                    <div class="col-5">
                        <div class="form-group">
                            <label for="name" class="add_pro_name">Tên sản phẩm</label>
                            <input class="form-control" type="text" placeholder="Vui lòng nhập tên" name="name"
                                v-model="product.name">
                        </div>
                        <div class="form-group">
                            <label for="description" class="font-weight-bold">Mô tả</label>
                            <textarea rows="3" name="description" id="description" class="form-control"
                                placeholder="Mô tả cho sản phẩm" v-model="product.description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="" class="font-weight-bold">Chất liệu</label>
                            <textarea rows="3" name="" id="" class="form-control" placeholder="Mô tả chất liệu sản phẩm"
                                v-model="product.material"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="discount" class="font-weight-bold">Phần trăm giảm giá</label>
                            <input type="number" name="discount" id="discount" class="form-control"
                                placeholder="Ví dụ: 10 (đơn vị %)" v-model="product.discount" />
                        </div>
                    </div>
                    <div class="col-1"></div>
                </div>
                <div class="mt-4">
                    <div class="row">
                        <div class="col-4 ml-2">
                            <div class="form-group">
                                <label for="name" class="add_pro_name">Tên màu sản phẩm</label>
                                <input class="form-control" type="text" placeholder="Vui lòng nhập tên"
                                    v-model="colorItem.name">
                            </div>
                            <div class="form-group mt-4">
                                <span class="add_pro_space">
                                    <span>Chọn màu</span>
                                    <span><input type="color" v-model="colorItem.color"></span>
                                </span>
                            </div>
                            <div class="form-group mt-4">
                                <span class="add_pro_space">
                                    <span>Giá</span>
                                    <span><input type="number" class="form-control" v-model="colorItem.price"></span>
                                </span>
                            </div>
                            <div class="form-group mt-4">
                                <span class="size-quantity">Size và Số lượng</span>
                                <div v-if="filteredSizes.length > 0" class="mb-2 mt-2"
                                    v-for="(size, index) in filteredSizes" :key="size._id">
                                    <span class="add_pro_space">
                                        <span>{{ size.name }}</span>
                                        <span>
                                            <input class="form-control" type="number"
                                                v-model="colorItem.sizes[index].quantity">
                                        </span>
                                    </span>
                                </div>
                                <div v-else>
                                    <h6 class="text-danger font-weight-bold text-center mt-4">Vui lòng chọn chi tiết
                                        loại</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col-5 mt-2">
                            <div class="card1">
                                <div class="top">
                                    <p>Thêm ảnh</p>
                                </div>
                                <div class="container1">
                                    <div v-if="colorItem.images.length < 1 || colorItem.images.length > 4">
                                        <h6 class="text-danger">Mỗi màu ít nhất 1 ảnh tối đa 4 ảnh</h6>
                                    </div>
                                    <div class="image" v-for="(image, imgIndex) in colorItem.images" :key="imgIndex">
                                        <span class="delete" @click="deleteImage(colorItem, imgIndex)">&times;</span>
                                        <img style="width: 100px; height: 100px;" :src="image.url" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mt-4">
                                <label for="image"><span class="font-weight-bold" style="font-size: 18px;">Chọn
                                        ảnh</span></label>
                                <br>
                                <input name="image" type="file" multiple @change="handleFileUpload" />
                            </div>
                            <div class="text-right">
                                <button type="submit" class="btn btn-primary">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <div class="row">
            <div class="col-4">
            </div>
            <div class="col-4">
            </div>
            <div class="col-4">
            </div>
        </div>
    </div>
</template>

<script>
import brandService from '@/services/brand.service';
import genderService from '@/services/gender.service';
import sizeService from '@/services/size.service';
import typeService from '@/services/type.service';
import type_detailService from '@/services/type_detail.service';
import { event } from 'jquery';
import { error } from 'jquery';
import Profile from '../profile/Profile.vue';
import productService from '@/services/product.service';
import { Form, Field, ErrorMessage } from "vee-validate";
import colorItemService from '@/services/colorItem.service';
import { showErrorToast, showSuccessToast } from '../shared/Toast_Notification.vue';

export default {
    data() {
        return {
            types: [],
            typeDetails: [],
            brands: [],
            genders: [],
            color: "#000",
            images: [],
            isDragging: false,
            sizes: [],

            // lọc theo id typedetails để hiển thị sizes
            filteredSizes: [],


            listProducts: [],

            product: {
                name: "",
                description: "",
                material: "",
                typeId: "",
                typeDetailsId: "",
                brandId: "",
                genderId: "",
                discount: 0,
            },

            productId: "",

            selectedTypeDetails: {
                typeId: "",
                typeDetailId: "",
            },

            colorItem: {
                name: "",
                images: [],
                price: 0,
                color: "",
                sizes: [
                    {
                        name: "",
                        quantity: "",
                    }
                ],
            }
        };
    },

    methods: {

        handleFileUpload(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                // Đọc file và lưu URL dưới dạng base64 để hiển thị ảnh
                reader.onload = (e) => {
                    this.colorItem.images.push({
                        name: file.name,   // Tên file gốc
                        url: e.target.result, // URL base64 để hiển thị ảnh
                        file: file         // File dùng để upload lên server
                    });
                };
                reader.readAsDataURL(file); // Đọc file dưới dạng Data URL
            }
        },


        addColorItem() {
            this.product.colorItems.push({
                images: [],
                colorName: "",
            });
        },

        async addProduct() {
            await this.fetchAllProducts();
            const notEmpty = this.listProducts.find(pro => pro.name === this.product.name && pro.genderId == this.product.genderId);
            const formData = new FormData();
            formData.append("name", this.colorItem.name);

            this.colorItem.images.forEach((image) => {
                formData.append("images", image.file);
            });

            formData.append("sizes", JSON.stringify(this.colorItem.sizes));
            formData.append("color", this.colorItem.color);
            formData.append("price", this.colorItem.price);

            // đã tồn tại
            if (notEmpty) {
                formData.append("productId", notEmpty._id);

                try {
                    const message = await colorItemService.create(formData);
                    if (message) {
                        showSuccessToast("Sản phẩm đã tồn tại, màu mới được thêm vào!");
                    }

                } catch (error) {
                    console.error("Lỗi khi tải lên hình ảnh:", error.response ? error.response.data : error);
                }
            }
            // thêm mới sản phẩm khi chưa tồn tại
            else {
                try {
                    const productId = await productService.create(this.product);
                    if (productId) {
                        formData.append("productId", productId.insertedId);
                        console.log(formData);
                        const message = await colorItemService.create(formData);
                        if (message) {
                            showSuccessToast("Sản phẩm đã được thêm vào!");
                        }
                    }
                } catch {
                    console.error("Lỗi khi tải lên hình ảnh:", error.response ? error.response.data : error);
                }
            }
        },

        async fetchTypes() {
            try {
                this.types = await typeService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async fetchTypeDetails() {
            try {
                this.typeDetails = await type_detailService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async fetchGenders() {
            try {
                this.genders = await genderService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async fetchSizes() {
            try {
                this.sizes = await sizeService.getAll();
            } catch {
                console.log(error);
            }
        },

        async fetchBrands() {
            try {
                this.brands = await brandService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async fetchAllProducts() {
            try {
                this.listProducts = await productService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async onChangeGender(event) {
            const selectedGenderId = event.target.value;

            await this.fetchTypeDetails();
            const fetchTypeDetails = this.typeDetails.filter(typeDetail => typeDetail.genderId === selectedGenderId);
            this.typeDetails = fetchTypeDetails;
        },


        async onTypeDetailsChange(event) {
            // const selectedTypeDetailsId = event.target.value;
            this.product.typeId = this.selectedTypeDetails.typeId;
            this.product.typeDetailsId = this.selectedTypeDetails.typeDetailId;
            console.log(this.product.typeId);
            console.log(this.product.typeDetailId);

            await this.fetchSizes();
            this.filteredSizes = this.sizes.flatMap(typeDetail =>
                typeDetail.sizeDetails
                    .filter(size => size.typeDetailId === this.product.typeDetailsId)
                    .map(size => ({
                        _id: size._id,
                        name: size.name,
                        quantity: 0
                    }))
            );
            this.colorItem.sizes = this.filteredSizes.map(size => ({
                name: size.name,
                quantity: 0,
            }));

            if (this.filteredSizes.length === 0) {
                console.log('Không tìm thấy kích thước cho typeDetailId đã chọn');
            }
        },


        // addColorItem() {
        //         this.colorItems.push({ name: '', color: '#000000', price: 0, images: [], sizes: [] });
        //     },

        deleteColorItem(index) {
            if (this.colorItems.length <= 1) {
                showErrorToast("Bạn không thể xóa, mỗi sản phẩm cần có màu sắc");
                return;
            }
            this.colorItems.splice(index, 1);
        },

        selectFiles(colorItem, index) {
            this.$refs['fileInput' + index][0].click();
        },
        onFileSelect(colorItem, event) {
            const files = event.target.files;
            if (files.length === 0) return;

            const newImages = [];
            for (let i = 0; i < files.length; i++) {
                if (files[i].type.split("/")[0] !== "image") continue;

                if (!colorItem.images.some((e) => e.name === files[i].name)) {
                    newImages.push({
                        name: files[i].name,
                        url: URL.createObjectURL(files[i])
                    });
                }
            }
            colorItem.images = [...colorItem.images, ...newImages];
        },

        deleteImage(colorItem, index) {
            colorItem.images.splice(index, 1);
        },
    },

    async mounted() {
        await this.fetchTypes();
        await this.fetchSizes();
        await this.fetchGenders();
        await this.fetchBrands();
        await this.fetchAllProducts();
    }
}
</script>

<style scoped>
.add_pro {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.add_pro_space {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.add_pro_space span {
    font-size: 18px;
    font-weight: bold;
}

.add_pro_description {
    display: flex;
    flex-direction: column;
    text-align: end;
    color: grey;
    font-size: 17px;
    margin-left: 10px;
    margin-top: 10px;
}

.add_pro_name {
    font-size: 18px;
    font-weight: bold;
}

.add_pro_btn_add_color {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(0, 94, 39);
    border: none;
    color: white;
}

.add_pro_btn_add_color:hover {
    border-radius: 20px;
}

.add_pro_btn_delete_color {
    margin-left: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 255, 255);
    border: 0.5px solid black;
    color: rgb(255, 0, 0);
}

.add_pro_btn_delete_color:hover {
    border-radius: 20px;

}


.add_pro_add_color {
    display: flex;

}

.size-quantity {
    font-weight: bold;
    font-size: 18px;
}

/* Card */
.card1 {
    width: 100%;
    padding: 10px;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    overflow: hidden;
}

.card1 .top {
    text-align: center;
}

.card1 p {
    font-weight: bold;
    font-size: 18px;
    color: rgb(0, 0, 0);
}

.card1 button {
    outline: 0;
    border: 0;
    color: white;
    border-radius: 5px;
    font-weight: 400;
    padding: 8px 13px;
    width: 100%;
    background-color: red;
}

.card1 .drag-area {
    height: 150px;
    border-radius: 5px;
    border: 2px solid black;
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: center;
    margin-top: 10px;
    -webkit-user-select: none;
}

.card1 .select {
    color: blue;
    margin-left: 5px;
    cursor: pointer;
    transition: 0.4s;
}

.card1 .select:hover {
    opacity: 0.6;
}

.card1 .container1 {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 8px;
    max-height: 250px;
}

.card1 .container1 .image {
    position: relative;
    margin: 5px;
}

.card1 .container1 .image img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    display: block;
}

.card1 .container1 .image .delete {
    position: absolute;
    top: 1px;
    right: 1px;
    font-size: 22px;
    cursor: pointer;
    color: rgb(255, 0, 0);
    border-radius: 40%;
}

.card1 input,
.card1 .drag-area .on-drop,
.card1 .drag-area.dragover .visible {
    display: none;
}

.delete {
    z-index: 999;
    color: red;
}

.add-pro-divider {
    border: 1px solid rgb(146, 141, 141);
}
</style>
