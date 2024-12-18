<template>
    <div class="eva-details">
        <h5 class="font-weight-bold">CHI TIẾT CÁC ĐÁNH GIÁ CỦA KHÁCH HÀNG</h5>
        <div class="row mt-2">
            <div class="col-3">
                <span style="font-size: 18px; border-bottom: 1px solid black; margin-bottom: 5px;">Tổng quan sản
                    phẩm</span>
                <br>
                <template v-for="pro in products" :key="pro._id">
                    <template v-if="pro._id === this.$route.params.id">
                        <span class="mt-4"><b>Tên sản phẩm</b></span>
                        <br>
                        <span class="ml-4">{{ pro.name }}</span>
                        <br>
                        <span class="mt-4"><b>Ảnh đại diện</b></span>
                        <br>
                        <template v-if="colorItems.some(colorItem => colorItem.productId === pro._id)">
                            <img class="ml-4" style="width: 150px; height: 120px; object-fit: contain;"
                                :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem.productId === pro._id)?.images[0]"
                                alt="">
                        </template>
                    </template>
                </template>
            </div>
            <div class="col-3">
                <span style="font-size: 18px; border-bottom: 1px solid black; ">Tổng quan đánh giá</span>
                <br>
                <span><b>Lượt đánh giá</b></span>
                <br>
                <span class="eva-details-flex text-success">{{ evas.length }}</span>
                <span><b>Tỉ lệ đánh giá</b></span>
                <br>
                <span class="eva-details-flex text-danger">{{ toRate }}/5</span>
            </div>
            <div class="col-6">
                <span style="font-size: 18px; border-bottom: 1px solid black; margin-bottom: 5px;">Tất cả đánh
                    giá</span>
                <br>
                <template v-for="eva in evas" :key="eva._id">
                    <p class="eva-fullname">
                        <template v-for="u in allUsers" :key="_id">
                            <template v-if="u._id == eva.userId">
                                <span>
                                    <b>{{ u.username }}</b>
                                </span>
                            </template>
                        </template>
                        <button class="btn-delete-toRate" data-toggle="modal" data-target="#modal-delete-toRate"
                            @click="btnDeleteToRate(eva._id)">
                            <span>
                                Xóa
                            </span>
                        </button>
                    </p>
                    <span class="">
                        <span class="font-italic">{{ eva.date }}</span>
                        | Phân loại hàng: <b>{{ eva.colorItemName + ', ' + eva.sizeName }}</b>
                    </span>
                    <br>

                    <p class="mt-2">
                        <b>Nội dung</b>
                        <br>
                        <span style="margin-left: 20px;">{{ eva.content }}</span>
                    </p>

                    <b>Ảnh</b>
                    <div class="image-content mb-4">
                        <template v-for="img in eva.images">
                            <img :src="'http://localhost:3005/' + img" alt="">
                        </template>
                    </div>
                </template>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="modal-delete-toRate">

            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">XÓA ĐÁNH GIÁ</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form action="" @submit.prevent="deleteOneToRate">
                        <div class="modal-body">
                            <p class="font-weight-bold text-center">Bạn có chắc chắn xóa đánh giá này?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            <button type="submit" class="btn btn-dark">Đồng ý</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import colorItemService from '@/services/colorItem.service';
import evaluationsService from '@/services/evaluations.service';
import productService from '@/services/product.service';
import userService from '@/services/user.service';
import $ from 'jquery';
import { showSuccessToast } from '../shared/Toast_Notification.vue';

export default {
    data() {
        return {
            products: [],
            colorItems: [],
            evas: [],
            toRate: 0.0,
            evaId: "",
            allUsers: [],
        };
    },

    methods: {

        async fetchAllUsers() {
            try {
                this.allUsers = await userService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async fetchProducts() {
            try {
                this.products = await productService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async fetchColorItems() {
            try {
                this.colorItems = await colorItemService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async fetchEvas() {
            try {
                this.evas = await evaluationsService.findEvaByProId(this.$route.params.id);
                let totalEva = 0.0;
                for (const eva of this.evas) {
                    totalEva = totalEva + Number(eva.rate);
                }
                this.toRate = totalEva / this.evas.length;
            } catch (error) {
                console.error(error);
            }
        },

        btnDeleteToRate(id) {
            this.evaId = id;
        },

        async deleteOneToRate() {
            try {
                const message = evaluationsService.deleteOne(this.evaId);
                if (message) {
                    showSuccessToast("Bạn đã xóa đánh giá thành công");
                    $('#modal-delete-toRate').modal('hide');
                    await this.fetchEvas();
                    if (this.evas.length === 0) {
                        this.$router.replace({ name: "product_evaluation" });
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    },

    async mounted() {
        await this.fetchAllUsers();
        await this.fetchProducts();
        await this.fetchColorItems();
        await this.fetchEvas();
    }
}

</script>

<style scoped>
.eva-details {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.eva-details-flex {
    display: flex;
    justify-content: end;
    font-weight: bold;
}

.image-content {
    display: flex;
    gap: 10px;
    margin-left: 20px;
}

.image-content img {
    width: 100px;
    height: 120px;
    border: 0.5px solid black;
    object-fit: contain;
}

.eva-fullname {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 40px;
    font-size: 18px;
    font-weight: bold;
    color: rgb(111, 142, 8);
    padding-top: 10px;
}

.btn-delete-toRate {
    border: none;
    border: 1px solid black;
    background-color: rgb(245, 242, 187);
    color: #000000;
}

.btn-delete-toRate:hover {
    border: 1px solid white;
    border-radius: 5px;
    background-color: rgb(255, 0, 0);
    color: white;
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