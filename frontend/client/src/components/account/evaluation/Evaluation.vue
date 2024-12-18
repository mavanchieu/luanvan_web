<template>
    <div class="evaluation">
        <template v-if="orders.length > 0">
            <template v-for="order in orders" :key="order._id">
                <h6>Đơn hàng nhận ngày: <b>26/09/2024</b></h6>
                <template v-for="pro in order.products">
                    <div class="row eval-content">
                        <div class="col-4">
                            <img style="width: 180px; height: 200px; object-fit: contain;"
                                :src="'http://localhost:3005/orders' + '\\' + pro.image" alt="">
                        </div>
                        <div class="col-8">
                            <h5 class="font-weight-bold">
                                {{ pro.productName }}
                            </h5>
                            <span>Màu: {{ pro.colorItemName }}</span>
                            <br>
                            <span>Size: {{ pro.sizeName }}</span>
                            <br>
                            <span>Số lượng: {{ pro.quantity }}</span>
                            <br>
                            <p class="eval-content-p">
                                <button class="eval-btn-buy">Mua lại</button>
                                <button v-if="evaluations.find(eva => eva.productOrderId === pro._id)"
                                    class="eval-btn-eval" style="background-color: green;" disabledBạn>Bạn đã đánh
                                    giá</button>
                                <button v-else="evaluations.find(eva => eva.productOrderId === pro._id)"
                                    class="eval-btn-eval"
                                    @click="openModalEvaluation(pro.productId, pro.sizeName, pro.colorItemName, pro._id)">Đánh
                                    giá</button>
                                <!-- <template v-if="eva.productOrderId !== pro._id">
                                        <button class="eval-btn-eval" @click="openModalEvaluation(pro.productId, pro.sizeName, pro.colorItemName, pro._id)">Đánh giá</button>
                                    </template> -->
                            </p>
                        </div>
                    </div>
                </template>
                <div class="eval-content-divider">

                </div>
            </template>
        </template>
        <template v-if="orders.length === 0">
            <h5>Hiện tại các sản phẩm bạn đã <b>Đánh giá</b></h5>
        </template>

        <div v-if="isVisibleModalEvaluation === true" class="modal-overlay" id="modal-evaluation">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title font-weight-bold">Đánh giá sản phẩm</h5>
                        <!-- <button type="button" class="close" @click="closeModalEvaluation">
                            <span aria-hidden="true">&times;</span>
                        </button> -->
                    </div>
                    <div class="modal-body">
                        <form action="" @submit.prevent="toRate">
                            <div class="form-group">
                                <label for="modal-write"><b>Đánh giá Sao {{ rating }}</b></label>
                                <br>
                                <span v-for="star in 5" :key="star" @click="rate(star)" class="star"
                                    :class="{ filled: star <= rating }">
                                    ★
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="modal-write"><b>Viết đánh giá</b></label>
                                <textarea name="modal-write" id="modal-write" rows="3" cols="1"
                                    v-model="content.content"></textarea>
                            </div>
                            <div class="row mt-2">
                                <div class="card1">
                                    <div class="top">
                                        <p>Thêm ảnh</p>
                                    </div>
                                    <div class="container1">
                                        <div v-if="content.images.length < 1 || content.images.length > 4">
                                            <h6 class="text-danger text-center">Ít nhất 1 ảnh để đánh giá sản phẩm, tối
                                                đa 3 ảnh
                                            </h6>
                                        </div>
                                        <div class="image" v-for="(image, imgIndex) in content.images" :key="imgIndex">
                                            <span class="delete" @click="deleteImage(content, imgIndex)">&times;</span>
                                            <img style="width: 100px; height: 100px; object-fit: contain;"
                                                :src="image.url" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div class="ml-2 mt-2">
                                    <label for="image"><span class="font-weight-bold" style="margin-left: 2px;">Chọn
                                            ảnh</span></label>
                                    <br>
                                    <input class="image-torate" name="image" type="file" multiple
                                        @change="handleFileUpload" />
                                </div>
                            </div>
                            <div class="incognito mt-2">
                                <span class="incognito-checkbox">
                                    <input type="checkbox" v-model="content.incognito">
                                </span>
                                <span>
                                    <b>Đánh giá ẩn danh</b>
                                </span>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-modal-close"
                                    @click="closeModalEvaluation">Hủy</button>
                                <button type="submit" class="btn btn-modal-send">Gửi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import evaluationsService from '@/services/evaluations.service';
import orderService from '@/services/order.service';
import $ from "jquery";
import { format } from 'date-fns';
import io from 'socket.io-client';
import { showSuccessToast } from '@/components/shared/Toast.vue';
export default {
    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    data() {
        return {
            isVisibleModalEvaluation: false,
            orders: [],
            isStatus: false,

            rating: 0,

            order: {},
            content: {
                userId: "",
                fullname: "",
                productId: "",
                productOrderId: "",
                content: "",
                sizeName: "",
                colorItemName: "",
                images: [],
                incognito: false,
            },

            evaluations: [],
        };
    },

    methods: {
        rate(star) {
            this.rating = star;
        },

        openModalEvaluation(id, sizeName, colorItemName, productOrderId) {
            this.content.productId = id;
            this.content.sizeName = sizeName;
            this.content.colorItemName = colorItemName;
            this.content.productOrderId = productOrderId;
            this.content.fullname = this.orders[0].fullname;

            this.isVisibleModalEvaluation = true;
        },

        closeModalEvaluation() {
            this.isVisibleModalEvaluation = false;
        },
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        handleFileUpload(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                // Đọc file và lưu URL dưới dạng base64 để hiển thị ảnh
                reader.onload = (e) => {
                    this.content.images.push({
                        name: file.name,   // Tên file gốc
                        url: e.target.result, // URL base64 để hiển thị ảnh
                        file: file         // File dùng để upload lên server
                    });
                };
                reader.readAsDataURL(file); // Đọc file dưới dạng Data URL
            }
        },

        async fetchOrders() {
            try {
                this.orders = await orderService.getAllByUserId(this.getUserId);
                await this.fetchEvaluations();
                this.orders = this.orders.filter(order => order.status === "2").sort((a, b) => b._id - a._id);
                // alert(this.orders.length);
            } catch (error) {
                console.error(error);
            }
        },

        async fetchEvaluations() {
            try {
                this.evaluations = await evaluationsService.getAll();
                this.evaluations = this.evaluations.filter(eva => eva.userId === this.getUserId);
                // alert(this.evaluations.length);
            } catch (error) {
                console.error(error);
            }
        },

        async toRate() {
            const now = new Date();
            const formattedDate = format(now, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
            const formData = new FormData();

            formData.append("userId", this.getUserId);
            formData.append("fullname", this.content.fullname);

            this.content.images.forEach((image) => {
                formData.append("images", image.file);
            });
            formData.append("productId", this.content.productId);
            formData.append("productOrderId", this.content.productOrderId);

            formData.append("content", this.content.content);
            formData.append("incognito", this.content.incognito);
            formData.append("sizeName", this.content.sizeName);
            formData.append("colorItemName", this.content.colorItemName);
            formData.append("rate", this.rating);
            formData.append("date", formattedDate);

            const message = await evaluationsService.create(formData);
            if (message) {
                showSuccessToast("Bạn đã đánh giá sản phẩm thành công!");
                this.isVisibleModalEvaluation = false;
                await this.fetchOrders();
            }
        },

        deleteImage(content, index) {
            content.images.splice(index, 1);
        },
    },

    mounted() {

        const socket = io('http://localhost:3005');
        socket.on('confirmShipping', async (data) => {
            console.log(data);
            await this.fetchOrders();
        });
        socket.on('createEvaluation', async (data) => {
            console.log(data);
            await this.fetchOrders();
        });

    },

    async created() {

        await this.fetchOrders();
    }
}
</script>

<style scoped>
.evaluation {
    font-family: 'Courier New', Courier, monospace;

}

.eval-content-p {
    margin-top: 10px;
    display: flex;
    gap: 20px;
}

.eval-btn-buy {
    border: 1px solid black;
    background-color: white;
    padding: 5px 8px;
}

.eval-btn-eval {
    border: 1px solid black;
    background-color: rgb(0, 0, 0);
    padding: 5px 8px;
    color: white;
}

.eval-btn-eval:hover {
    border: 1px solid black;
    background-color: rgb(89, 78, 78);
    padding: 5px 8px;
    color: white;
}

.eval-content-divider {
    margin-top: 10px;
    margin-bottom: 20px;
    border: 0.5px solid rgb(129, 129, 129);
}

.modal-overlay {
    position: fixed;
    z-index: 200;
    top: 0px;
    left: 40%;
}

.modal-image {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
}


.incognito {
    display: flex;
    gap: 20px;
    align-items: center;
}

.incognito-checkbox {
    margin-top: 5px;
}

.btn-modal-close {
    background-color: white;
    border: 0.5px solid black;
}

.btn-modal-send {
    background-color: rgb(0, 0, 0);
    border: 0.5px solid rgb(0, 0, 0);
    color: white;
}

.btn-modal-close:hover {
    background-color: white;
    border: 0.5px solid rgb(255, 0, 0);
}

.btn-modal-send:hover {
    background-color: rgb(0, 123, 53);
    border: 0.5px solid rgb(0, 0, 0);
    color: white;
}

/* card */
.card1 {
    margin-left: 15px;
    margin-right: 15px;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
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

.modal-body .image-torate {
    background: transparent;
    all: unset;

}

.star {
    cursor: pointer;
    font-size: 24px;
    color: gray;
}

.star.filled {
    color: gold;
}
</style>