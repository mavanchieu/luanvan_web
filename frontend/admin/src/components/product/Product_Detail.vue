<template>
    <div class="product-detail">
        <h5 class="font-weight-bold">THÔNG TIN CHI TIẾT SẢN PHẨM</h5>
        <!-- <div class="row">
            <div class="col-4 ml-2">
                <p class="pd-name mt-2"><span>Tên sản phẩm</span><span class="font-weight-bold">{{ product.name }}</span></p>
                <template v-for="gender  in genders " :key="gender._id">
                    <template v-if="gender._id == product.genderId">
                        <p class="pd-name"><span>Giới tính </span><span class="font-weight-bold"> {{ gender.name }}</span></p>
                    </template>
</template>

<template v-for="type  in types " :key="type._id">
                    <template v-if="type._id == product.typeId">
                        <p class="pd-name"><span>Thuộc loại</span><span class="font-weight-bold">{{ type.name }}</span></p>
                    </template>
</template>

<template v-for="typeDetail  in typeDetails " :key="typeDetail._id">
                    <template v-if="typeDetail._id == product.typeDetailsId">
                        <p class="pd-name"><span>Thuộc chi tiết loại</span><span class="font-weight-bold">{{ typeDetail.name }}</span></p>
                    </template>
</template>

<template v-for="brand  in brands " :key="brand._id">
                    <template v-if="brand._id == product.brandId">
                        <p class="pd-name"><span>Nhãn hiệu</span><span class="font-weight-bold"> {{ brand.name }}</span></p>
                    </template>
</template>
<p class="pd-name" v-if="product.discount != 0"><span>Sale</span><span class="font-weight-bold text-danger"> {{
        product.discount }}%</span></p>

</div>
<div class="col-3 mt-2 ml-2">
    <p><span>Mô tả</span></p>
    <textarea rows="4" cols="30" placeholder="Sản phẩm đẹp, chất lượng"></textarea>
    <p><span>Chất liệu</span></p>
    <textarea rows="4" cols="30" v-model="product.material" disabled></textarea>
</div>
<div class="col-2">
    <p class="pd-btn">
        <span v-if="product.hidden == false"><Button @click="hiddenProduct" class="btn pd-btn-edit"
                data-toggle="tooltip" data-placement="top" title="Ẩn"><i class="fa-regular fa-eye"></i></Button></span>
        <span v-if="product.hidden == true"><Button @click="hiddenProduct" class="btn pd-btn-edit" data-toggle="tooltip"
                data-placement="top" title="Hiện"><i class="fa-regular fa-eye-slash"></i></Button></span>
        <span><Button class="btn pd-btn-close" data-toggle="tooltip" data-placement="top" title="Xóa"><i
                    class="fa-solid fa-xmark"></i></Button></span>
    </p>
</div>
</div> -->
        <div class="row">
            <div class="col-4 ml-2">
                <span class="pd-name mt-2">Tên sản phẩm</span>
                <span class="font-weight-bold ml-4">{{ product.name }}</span>
                <template v-for="gender in genders" :key="gender._id">
                    <template v-if="gender._id == product.genderId">
                        <span class="pd-name mt-2">Giới tính</span>
                        <span class="font-weight-bold ml-4">{{ gender.name }}</span>
                    </template>
                </template>

                <template v-for="type in types" :key="type._id">
                    <template v-if="type._id == product.typeId">
                        <span class="pd-name mt-2">Thuộc loại</span>
                        <span class="font-weight-bold ml-4">{{ type.name }}</span>
                    </template>
                </template>

                <template v-for="typeDetail in typeDetails" :key="typeDetail._id">
                    <template v-if="typeDetail._id == product.typeDetailsId">
                        <span class="pd-name mt-2">Thuộc chi tiết loại</span>
                        <span class="font-weight-bold ml-4">{{ typeDetail.name }}</span>
                    </template>
                </template>

                <template v-for="brand in brands" :key="brand._id">
                    <template v-if="brand._id == product.brandId">
                        <span class="pd-name mt-2">Nhãn hiệu</span>
                        <span class="font-weight-bold ml-4">{{ brand.name }}</span>
                    </template>
                </template>

                <template v-if="product.discount != 0">
                    <span class="pd-name mt-2">Sale</span>
                    <span class="font-weight-bold text-danger ml-4">{{ product.discount }}%</span>
                </template>
            </div>

            <!-- Middle Column for Description and Material -->
            <div class="col-3 mt-2 ml-2">
                <p class="font-weight-bold" style="color: grey;"><span>Mô tả</span></p>
                <textarea rows="4" cols="30" placeholder="Sản phẩm đẹp, chất lượng"></textarea>
                <p><span class="font-weight-bold" style="color: grey;">Chất liệu</span></p>
                <textarea rows="4" cols="30" v-model="product.material" disabled></textarea>
            </div>

            <!-- Right Column for Action Buttons -->
            <div class="col-2">
                <p class="pd-btn">
                    <span v-if="product.hidden == false">
                        <button @click="hiddenProduct" class="btn pd-btn-edit" data-toggle="tooltip"
                            data-placement="top" title="Ẩn">
                            <i class="fa-regular fa-eye"></i>
                        </button>
                    </span>
                    <span v-if="product.hidden == true">
                        <button @click="hiddenProduct" class="btn pd-btn-edit" data-toggle="tooltip"
                            data-placement="top" title="Hiện">
                            <i class="fa-regular fa-eye-slash"></i>
                        </button>
                    </span>
                    <span>
                        <button class="btn pd-btn-close" data-toggle="modal" data-target="#modal-deleteOneProduct"
                            data-placement="top" title="Xóa">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </span>
                </p>
            </div>
        </div>

        <div class="pd-divider">

        </div>
        <div v-for="colorItem in colorItems" :key="colorItem._id">
            <template v-if="colorItem.productId === product._id">
                <div class="row mt-2 mb-4 pd-color">
                    <div class="col-6">
                        <span style="font-size: 18px; color: grey" class="font-weight-bold">
                            Màu
                        </span>
                        <span class="pd-space">
                            <span class="color ml-2 font-weight-bold ">
                                {{ colorItem.name }}
                            </span>
                            <input type="color" v-model="colorItem.color" disabled>
                        </span>
                        <span class="pd-space mt-4">
                            <span class="font-weight-bold" style="font-size: 18px; color: grey">Giá</span>
                            <span class="font-weight-bold" style="font-size: 17x;"> {{ colorItem.price }} vnd</span>
                        </span>
                        <br>
                        <span style="font-size: 18px; margin-top: 15px; color: grey" class="font-weight-bold">
                            Ảnh sản phẩm
                        </span>
                        <br>
                        <template v-for="image in colorItem.images">
                            <img style="width: 190px; height: 200px; object-fit: contain; margin:3px;"
                                :src="'http://localhost:3005/' + image" alt="">
                        </template>
                    </div>
                    <div class="col-3">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Size</th>
                                    <th scope="col" class="text-center">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="size in colorItem.sizes">
                                    <tr>
                                        <td> {{ size.name }}</td>
                                        <td class="text-center"> {{ size.quantity }}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-3">
                        <span style="display: flex;justify-content: end;">
                            <span class="pd-btn">
                                <span><Button class="btn pd-btn-edit" data-toggle="tooltip" data-placement="top"
                                        title="Sửa" @click="updateColorItem(colorItem._id)"><i
                                            class="fa-regular fa-pen-to-square"></i></Button></span>
                                <Update_ColorItem :colorItem="colorItem" />
                            </span>
                            <span class="pd-btn">
                                <span><Button class="btn pd-btn-close" data-toggle="modal"
                                        data-target="#modal-deleteOneColorItem" data-placement="top" title="Xóa"
                                        @click="openModalDeleteOneColorItem(colorItem._id)"><i
                                            class="fa-solid fa-xmark"></i></Button></span>
                            </span>
                        </span>
                    </div>
                </div>
            </template>
        </div>
        <div class="modal" tabindex="-1" id="modal-deleteOneProduct">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>Bạn có chắc chắn xóa sản phẩm?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                        <button type="submit" @click="deleteOneProduct" class="btn btn-primary">Đồng ý</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="modal-deleteOneColorItem">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>Bạn có chắc chắn xóa màu này?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                        <button type="submit" @click="deleteOneColorItem" class="btn btn-primary">Đồng ý</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import typeService from '@/services/type.service';
import type_detailService from '@/services/type_detail.service';
import brandService from '@/services/brand.service';
import genderService from '@/services/gender.service';
import productService from '@/services/product.service';
import colorItemService from '@/services/colorItem.service';
import Update_ColorItem from './Update_ColorItem.vue';
import $ from 'jquery';
import { showErrorToast, showSuccessToast } from '../shared/Toast_Notification.vue';


export default {
    props: ['id'],

    components: {
    },

    data() {
        return {
            products: [],
            genders: [],
            types: [],
            typeDetails: [],
            brands: [],
            product: typeof (Object),
            colorItems: [],
            cartItem: {},
            selectedTab: 0,
            colorItemId: "",
        };
    },

    methods: {
        async fetchTypes() {
            try {
                this.types = await typeService.getAll();
            } catch (error) {
                console.error("Lỗi", error);
            }
        },
        selectTab(index) {
            this.selectedTab = index;
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
                this.product = this.products.find(pro => pro._id === this.id);
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

        async hiddenProduct() {
            try {
                const message = await productService.hiddenProduct(this.product._id);
                showSuccessToast(message.message);
                await this.fetchProducts();
            } catch (error) {
                console.log(error);
            }
        },

        updateColorItem(id) {
            this.$router.push({ name: "product_update_colorItem", params: { colorItemId: id } });
        },


        async deleteOneColorItem() {
            try {
                const result = await colorItemService.deleteOne(this.colorItemId);
                showSuccessToast("Bạn xóa màu sản phẩm thành công");
                $('#modal-deleteOneColorItem').modal('hide');
                window.location.reload();
            } catch (error) {
                showErrorToast(error.response.data.message);
                $('#modal-deleteOneColorItem').modal('hide');
            }
        },

        async deleteOneProduct() {
            try {
                const result = await productService.deleteOne(this.product._id);
                showSuccessToast("Bạn xóa sản phẩm thành công");
                $('#modal-deleteOneProduct').modal('hide');
                window.history.back();
            } catch (error) {
                showErrorToast(error.response.data.message);
                $('#modal-deleteOneProduct').modal('hide');
            }
        },

        openModalDeleteOneColorItem(id) {
            this.colorItemId = id;
        },

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

<style scoped>
.product-detail {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.pd-color {
    box-shadow: rgba(7, 120, 218, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    padding: 20px;
}

.pd-name,
.pd-size {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    color: grey;
}

.pd-btn {
    display: flex;
    justify-content: end;
    gap: 10px;
    padding-right: 40px;
}

.pd-space {
    display: flex;
    justify-content: space-between;
    margin-right: 175px;
}

.row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
}

/* Hover effect for text items */
.pd-name span:hover {
    color: #007bff;
    transition: color 0.3s ease-in-out;
}

/* Buttons Styling */
.pd-btn button {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pd-btn button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Button for editing (eye icon) */
.pd-btn-edit {
    background-color: #f8f9fa;
    color: #007bff;
}

.pd-btn-edit:hover {
    background-color: #007bff;
    color: #fff;
}

/* Button for closing (X icon) */
.pd-btn-close {
    background-color: #f8d7da;
    color: #721c24;
}

.pd-btn-close:hover {
    background-color: #721c24;
    color: #fff;
}

/* Textarea styling */
textarea {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    transition: border-color 0.3s ease;
}

textarea:focus {
    border-color: #007bff;
    outline: none;
}
</style>