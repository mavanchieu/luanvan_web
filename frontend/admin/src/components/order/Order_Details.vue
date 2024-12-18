<template class="order">
    <div class="order-details">
        <span class="font-weight-bold title">CHI TIẾT ĐƠN HÀNG</span>
        <br>
        <div class="text-right mr-2" v-if="order.status === '1'">
            <button class=" btn btn-primary" @click="exportInvoice(order)">
                Xuất hóa đơn
            </button>
        </div>
        <div class="header row mt-4">
            <div class="col-4">
                <span class="font-weight-bold" style="color: grey;">Mã Đơn Hàng</span>
                <br>
                <span class="font-weight-bold">
                    {{ order._id }}
                </span>
            </div>
            <div class="col-4">
                <span class="font-weight-bold" style="color: grey;">Ngày và giờ đặt</span>
                <br>
                <span class="font-weight-bold">
                    {{ order.date }}
                </span>
            </div>
            <div class="col-4">
                <span class="font-weight-bold" style="color: grey;">Trạng thái đơn hàng</span>
                <br>
                <span class="font-weight-bold" style="color: green;">
                    <template v-if="order.status === '0'">
                        Chờ xác nhận
                    </template>
                    <template v-if="order.status === '1'">
                        Đã xác nhận
                    </template>
                    <template v-if="order.status === '2'">
                        Đã vận chuyển
                    </template>
                    <template v-if="order.status === '3'">
                        Đã được lên
                    </template>
                </span>
            </div>
        </div>
        <div class="row header">
            <div class="col-3" v-if="order.status === '1'">
                <span class="font-weight-bold" style="color: grey;">Nhận từ</span>
                <br>
                <span class="font-weight-bold">{{ order.fromDate + '-' + order.toDate }}</span>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-8">
                <div class="info-products mb-4">
                    <h5>Thông Tin Sản Phẩm</h5>
                    <div class="row" style="margin-left: 2px; margin-right: 2px;">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">Ảnh</th>
                                    <th scope="col" class="">Tên sản phẩm</th>
                                    <th scope="col" class="text-center">Số lượng</th>
                                    <th scope="col" class="text-center">Giá (vnd)</th>
                                    <th scope="col" class="text-center">Sale (%)</th>
                                    <th scope="col" class="text-center">Thành tiền (vnd)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="item in order.products">
                                    <tr>
                                        <th scope="row">
                                            <img style="width: 100px; height: 120px; object-fit: contain;"
                                                :src="'http://localhost:3005/orders' + '\\' + item.image" alt="">
                                        </th>
                                        <td style="color: blue; font-weight: bold;">{{ item.productName }}</td>
                                        <td class="text-center"> {{ item.quantity }}</td>
                                        <td class="text-center"> {{ formatPrice(item.price) }}</td>
                                        <td class="text-center">{{ item.discount }}</td>
                                        <td class="text-center"> {{ formatPrice(item.quantity * (item.price -
                                            (item.price
                                                * item.discount / 100))) }}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="info-client">
                    <h6>Thông Tin Người Nhận</h6>
                    <div class="order-details-divider mb-2">
                    </div>
                    <span class="font-weight-bold "> {{ order.fullname }}</span>
                    <br>
                    <span class="font-weight-bold" style="color: grey; font-size: 14px;"> {{ order.phone }} </span>
                    <br>
                    <span class="font-weight-bold" style="color: grey; font-size: 14px;"> {{ order.email }} </span>
                </div>
                <div class="info-client mt-4 mb-4">
                    <h6>Địa Chỉ Nhận Hàng</h6>
                    <div class="order-details-divider mb-2">
                    </div>
                    <span style="color: black; font-weight: 600;  font-size: 14px;">{{ order.address }}</span>
                </div>
                <div class="info-client mt-4 mb-4">
                    <h6 style="color: red;">Tổng Thanh Toán</h6>
                    <div class="order-details-divider mb-2">
                    </div>
                    <span class="order-details-space">
                        <span style="font-size: 15px;">Tổng mặt hàng</span>
                        <span style="font-weight: bold;"> {{ totalItems }}</span>
                    </span>
                    <span class="order-details-space" v-if="order.code != ''">
                        <span style="font-size: 15px;">
                            Khuyến mãi
                        </span>
                        <span style="font-size: 15px; font-weight: bold;">
                            {{ order.discount }}%
                        </span>
                    </span>
                    <span class="order-details-space">
                        <span style="font-size: 15px; font-weight: bold;">Cần thanh toán</span>
                        <span style="font-weight: bold;" class="total-price"> {{ formatPrice(order.totalPrice) }}
                            vnd</span>
                    </span>
                </div>
                <div class="info-client text-center mt-4 mb-4" v-if="order.status === '3'">
                    <button class="btn btn-confirm-order" data-toggle="modal" data-target="#modal-confirm-shipping">Xác
                        nhận đơn
                        hàng đã vận chuyển</button>
                </div>
                <div class="info-client text-center mt-4 mb-4" v-if="order.status === '1'">
                    <button class="btn btn-confirm-order" data-toggle="modal" data-target="#modal-confirm-completed">Xác
                        nhận
                        đơn hàng đã được lên</button>
                </div>
                <div class="info-client text-center mt-4 mb-4" v-if="order.status === '0'">
                    <button class="btn btn-confirm-order" data-toggle="modal" data-target="#modal-confirm-order">Xác
                        nhận đơn
                        hàng</button>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="modal-confirm-order">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title font-weight-bold">Thời gian giao hàng</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" @submit.prevent="confirmOrder">
                            <div class="form-group">
                                <label for="fromDate">Từ</label>
                                <input type="date" class="form-control" name="fromDate" v-model="data.fromDate">
                            </div>
                            <div class="form-group">
                                <label for="toDate">Đến</label>
                                <input type="date" class="form-control" name="toDate" v-model="data.toDate">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-confirm-no"
                                    data-dismiss="modal">Hủy</button>
                                <button type="submit" class="btn btn-primary btn-confirm-yes">Xác nhận</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="modal-confirm-completed">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <form action="" @submit.prevent="confirmCompletedOrder">
                            <h5 class="text-center font-weight-bold">Bạn có chắc đơn hàng đã được lên?</h5>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-confirm-no"
                                    data-dismiss="modal">Hủy</button>
                                <button type="submit" class="btn btn-primary btn-confirm-yes">Xác nhận</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="modal-confirm-shipping">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <form action="" @submit.prevent="confirmShipping">
                            <h5 class="text-center font-weight-bold">Bạn có chắc đơn hàng đã được nhận?</h5>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-confirm-no"
                                    data-dismiss="modal">Hủy</button>
                                <button type="submit" class="btn btn-primary btn-confirm-yes">Xác nhận</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import orderService from '@/services/order.service';
import $ from "jquery";
import html2pdf from 'html2pdf.js';
import { showErrorToast, showSuccessToast } from '../shared/Toast_Notification.vue';
export default {
    data() {
        return {
            order: typeof (Object),
            orders: [],
            totalItems: 0,

            data: {
                fromDate: "",
                toDate: "",
                userId: "",
            }
        }
    },

    methods: {

        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        async fetchOrders() {
            try {
                this.orders = await orderService.getOneById(this.$route.params.id);
                this.order = this.orders.find(order => order._id === this.$route.params.id);

                for (const pro of this.order.products) {
                    this.totalItems = this.totalItems + pro.quantity;
                }

            } catch (error) {
                console.error(error);
            }
        },


        async confirmCompletedOrder() {
            try {
                const message = await orderService.confirmCompletedOrder(this.order._id);
                console.log(this.order._id);
                if (message) {
                    $('#modal-confirm-completed').modal('hide');
                    showSuccessToast("Bạn đã lên đơn hàng thành công");
                    setTimeout(() => {
                        this.$router.replace({ name: "order_ordered" });
                    }, 1500);
                }
            } catch (error) {
                console.log(error);
            }
        },

        async confirmOrder() {
            const fromDate = new Date(this.data.fromDate);
            const orderDate = new Date(this.order.date.split(' ')[0]);
            if (fromDate < orderDate) {
                showErrorToast("Ngày giao phải lớn hơn hoặc bằng ngày đặt");
                $('#modal-confirm-order').modal('hide');
                return;
            }

            if (this.data.fromDate > this.data.toDate) {
                showErrorToast("Ngày giao phải nhỏ hơn ngày nhận");
                $('#modal-confirm-order').modal('hide');
                return;
            }
            try {
                this.data.userId = this.order.userId;
                const message = await orderService.confirmOrder(this.order._id, this.data);
                if (message) {
                    $('#modal-confirm-order').modal('hide');
                    showSuccessToast("Bạn đã xác nhận đơn hàng thành công");
                    setTimeout(() => {
                        this.$router.replace({ name: "order_handle" });
                    }, 1500);
                }
            } catch (error) {
                console.error(error);
            }
        },

        async confirmShipping() {
            try {
                const message = await orderService.confirmShipping(this.order._id);
                if (message) {
                    showSuccessToast("Bạn đã xác nhận đơn hàng thành công");
                    $('#modal-confirm-shipping').modal('hide');
                    setTimeout(() => {
                        this.$router.replace({ name: "order_completed" });
                    }, 1500);

                }
            } catch (error) {
                console.error(error);
            }
        },

        exportInvoice(order) {
            const formatPrice = (price) => {
                return new Intl.NumberFormat().format(price);
            };
            const generateRandomId = () => {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';
                for (let i = 0; i < 10; i++) {
                    result += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                return result;
            };
            const invoiceContent = `
                <style>
                    /* Container chính của hóa đơn */
                    .invoice-container {
                        width: 600px;
                        margin: 0 auto;
                        font-family: 'Courier New', Courier, monospace;
                        padding: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }

                    /* Tiêu đề hóa đơn */
                    .invoice-header {
                        margin-bottom: 20px;
                        position: relative;
                    }
                    .invoice-header h1 {
                        font-size: 26px;
                        margin: 0;
                        color: #333;
                        font-family: 'Georgia', serif;
                        transform: rotate(-10deg);
                        display: inline-block;
                        background: linear-gradient(to right, #ff7e5f, #feb47b);
                        color: white;
                        padding: 5px 10px;
                        border-radius: 5px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                    }
                    .invoice-header .details {
                        text-align: right; /* Căn phải */
                        margin-top: 10px;
                    }
                    .invoice-header .details span {
                        display: block; /* Mỗi dòng là một block */
                        font-size: 14px;
                        color: #333;
                    }

                    /* Thông tin khách hàng */
                    .customer-info {
                        display: flex;
                        justify-content: space-between;
                        font-size:15px;
                    }

                    .customer-info div {
                        width: 70%;
                    }

                    .customer-info span {
                        display: block;
                    }

                    .dates-info {
                        font-size:15px;
                    }

                    /* Tổng tiền */
                    .total-container {
                        font-size: 18px;
                        font-weight: bold;
                    }
                </style>

            <div class="invoice-container">
                <!-- Tiêu đề hóa đơn -->
                <div class="invoice-header">
                    <h1>MC - SHOP</h1>
                    <div class="details">
                        <span style="font-size:22px; font-weight-bold">HÓA ĐƠN</span>
                        <span>Mã đơn: ${order._id.toUpperCase()}</span>
                        <span>Ngàylập: ${new Date().toLocaleDateString()}</span>
                    </div>
                </div>

                <!-- Thông tin khách hàng -->
                <div class="customer-info">
                    <div>
                        <span><b>Đến:</b></span>
                        <span>${order.fullname}</span>
                        <span>${order.address}</span>
                        <span>${order.phone}</span>
                    </div>
                    <div class="dates-info">
                        <span><b>Ngày,giờ đặt hàng:</b> ${order.date}</span>
                        <span><b>Ngày giao hàng:</b> ${order.fromDate} - ${order.toDate}</span>
                    </div>
                </div>
                <!-- Tổng tiền -->
            
                <div class="row  mt-4">
                                <table class="table">
                    <thead class="thead-light">
                        <tr>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Phân loại</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                            ${order.products.map(item => `
                                <tr>
                                    <td>${item.productName}</td>
                                    <td>${item.colorItemName}, ${item.sizeName}</td>
                                    <td class="text-center">${item.quantity}</td>
                                    <td class="text-right">${formatPrice(item.price)}</td>
                                    <td class="text-right">${formatPrice(item.price * item.quantity)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                            </div>
                <div class="total-container text-right">
                    <p>Tổng cộng: <span>${order.totalPrice.toLocaleString()} VND</span></p>
                </div>
                <div class="row">
                    <span>Hotline: 0369951760</span>
                </div>
                <div class="mt-4 text-center">
                    <p class="font-italic"><b>Xin cảm ơn quý khách!</b></p>
                </div>
            </div>
        `;



            const options = {
                margin: [10, 10, 10, 10],
                filename: 'invoice.pdf',
                html2canvas: { scale: 2 }, // Độ phân giải
                jsPDF: {
                    unit: 'mm',
                    format: [180, 200], // Kích thước PDF (rộng x cao) - Ví dụ: 80mm x 120mm
                    orientation: 'portrait',
                },
            };
            html2pdf().set(options).from(invoiceContent).save();
        },
    },

    async mounted() {
        await this.fetchOrders();
    }
}
</script>

<style scoped>
.order-details {
    width: 100%;
    height: 100%;
    font-family: 'Courier New', Courier, monospace;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: rgb(237, 237, 237);
}

.order-details .header {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    height: 60px;
    background-color: rgb(255, 255, 255);
}

.align-items {
    display: flex;
    align-items: center;
    justify-content: end;
}

.btn-confirm-order {
    all: unset;
    background: transparent;
    background-color: black;
    color: white;
    padding: 5px;

}

.info-products {
    margin-left: 10px;
    box-shadow: rgba(97, 222, 157, 0.3) 0px 0px 0px 3px;
    padding: 10px;
    background-color: white;
}

.info-products h5 {
    font-weight: bold;
    color: rgb(2, 185, 105);
}

.info-client {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    padding: 10px;
    background-color: white;
}

.info-client h6 {
    font-weight: bold;
    color: rgb(0, 102, 133);
}

.order-details-divider {
    border: 0.2px solid rgb(216, 216, 216);
}

.total-price {
    color: rgb(0, 161, 81);
}

.order-details .title {
    border-bottom: 1px solid black;
    font-size: 20px;
}

.order-details-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-confirm-no {
    background-color: white;
    border: 0.5px solid black;
    color: black;
}

.btn-confirm-no:hover {
    background-color: rgb(70, 70, 70);
    border: 0.5px solid rgb(70, 70, 70);
    color: rgb(255, 255, 255);
}

.btn-confirm-yes {
    background-color: rgb(0, 0, 0);
    border: 0.5px solid black;
    color: rgb(255, 255, 255);
}

.btn-confirm-yes:hover {
    background-color: rgb(96, 96, 96);
    border: 0.5px solid rgb(96, 96, 96);
    color: rgb(255, 255, 255);
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
