<template>
    <div class="order-handle">
        <template v-if="orders.length > 0">
            <template v-for="order in orders" :key="order._id">
                <div class="row mt-2">
                    <div class="col-6">
                        <p class="font-weight-bold"> Thông tin đơn hàng</p>
                        <span class="handle-space">
                            <span>Ngày, giờ đặt: </span>
                            <span class="font-weight-bold text-success"> {{ order.date }}</span>
                        </span>
                        <span class="handle-space">
                            <span>Ngày nhận:</span>
                            <span>Từ <b>{{ order.fromDate }}</b> Đến <b>{{ order.toDate }}</b></span>
                        </span>
                        <span class="handle-space">
                            <span>Hình thức thanh toán: </span>
                            <span class="font-weight-bold text-primary"> {{ order.paymentMethod }}</span>
                        </span>
                        <br>
                        <span class="handle-border-bottom">Tổng thanh toán: <b>{{ formatPrice(order.totalPrice) }}
                                vnd</b></span>
                        <br>
                        <template v-for="pro in order.products" :key="pro._id">
                            <div class="row mt-2">
                                <div class="col-6">
                                    <img class="d-flex-image" :src="'http://localhost:3005/orders' + '\\' + pro.image"
                                        alt="">
                                </div>
                                <div class="col-6">
                                    <span class="font-weight-bold">{{ pro.productName }}</span>
                                    <br>
                                    <span class="handle-space">
                                        <span class="font-weight-bold" style="color: grey;">Màu</span>
                                        <span> <b>{{ pro.colorItemName }}</b> </span>
                                    </span>
                                    <span class="handle-space">
                                        <span class="font-weight-bold" style="color: grey;">Size</span>
                                        <span><b>{{ pro.sizeName }}</b></span>
                                    </span>
                                    <span class="handle-space">
                                        <span class="font-weight-bold" style="color: grey;">Giá </span>
                                        <span> <b>{{ pro.price }}</b> </span>
                                    </span>
                                    <span class="handle-space">
                                        <span class="font-weight-bold" style="color: grey;">Số lượng </span>
                                        <span><b> x{{ pro.quantity }}</b> </span>
                                    </span>
                                    <span v-if="pro.discount != 0" class="handle-space mt-2">
                                        <span class="font-weight-bold" style="color: grey;">Giảm giá </span>
                                        <span class="text-danger"><b> {{ pro.discount }}%</b> </span>
                                    </span>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div class="col-6">
                        <p class="font-weight-bold"> Thông tin người nhận</p>
                        <span class="handle-space">
                            <span class="font-weight-bold" style="color: grey;">Người nhận</span>
                            <span>{{ order.fullname }}</span>
                        </span>
                        <span class="handle-space">
                            <span class="font-weight-bold" style="color: grey;">Số điện thoại</span>
                            <span>{{ order.phone }}</span>
                        </span>
                        <span class="handle-space">
                            <span class="font-weight-bold" style="color: grey;">Email</span>
                            <span>{{ order.email }}</span>
                        </span>
                        <span class="handle-space">
                            <span class="font-weight-bold" style="color: grey;">Địa chỉ</span>
                            <span>{{ order.address }}</span>
                        </span>
                        <br>
                        <div>
                            <span class="handle-space">
                                <span class="font-weight-bold">Trạng thái đơn hàng</span>
                                <span v-if="order.status === '3'" class="handle-status">
                                    Đang giao
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="handle-divider mt-2">
                </div>
            </template>
        </template>
        <template v-if="orders.length === 0">
            <h5>Hiện tại không có đơn hàng nào <b>Đang giao</b></h5>
        </template>
    </div>
</template>

<script>
import colorItemService from '@/services/colorItem.service';
import orderService from '@/services/order.service';
import $ from 'jquery';
import io from 'socket.io-client';
export default {
    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    data() {
        return {
            orders: [],
            isStatus: false,

            order: {},

        };
    },

    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        async fetchOrders() {
            try {
                this.orders = await orderService.getAllByUserId(this.getUserId);
                this.orders = this.orders.filter(order => order.status === "3");
            } catch (error) {
                console.error(error);
            }
        },

        btnDeleteOrder(order) {
            console.log(order);
            this.order = order;
        },


    },

    mounted() {

        const socket = io('http://localhost:3005');

        socket.on('confirmCompletedOrder', async (data) => {
            console.log(data);
            await this.fetchOrders();
        });
        socket.on('confirmShipping', async (data) => {
            console.log(data);
            await this.fetchOrders();
        });

    },

    async created() {
        await this.fetchOrders();
    }
}
</script>

<style>
.order-handle {
    width: 100%;
}

.handle-border-bottom {
    border-bottom: 1px solid black;
}

.d-flex-image {
    display: flex;
    width: 150px;
    height: 170px;
    object-fit: contain;
    align-items: flex-start;
}

.handle-space {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 15px;
}

.handle-status {
    padding: 5px;
    background-color: green;
    color: white;
}

.btn-delete-order {
    all: unset;
    background: transparent;
    background-color: black;
    color: white;
    padding: 5px;
}

.handle-divider {
    border: 1px solid black;
}

.order-btn-no {
    background-color: white;
    border: 0.5px solid black;
    color: black;
}

.order-btn-yes {
    background-color: rgb(0, 0, 0);
    border: 0.5px solid black;
    color: rgb(255, 255, 255);
}

.order-btn-yes:hover {
    background-color: rgb(66, 66, 66);
    border: 0.5px solid black;
    color: rgb(255, 255, 255);
}
</style>