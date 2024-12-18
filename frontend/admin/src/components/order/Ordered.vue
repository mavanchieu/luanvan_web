<template>
    <div class="handle">
        <h5 class="font-weight-bold">DANH SÁCH CÁC ĐƠN HÀNG</h5>
        <h5 class="">Tổng đơn hàng: <b>{{ orders.length }}</b></h5>
        <div class="handle-search">
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Nhập thông tin tìm kiếm"
                    aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Tìm kiếm</button>
            </form>
        </div>
        <div class="handle-divider">

        </div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th style="width: 15%;">Họ và tên</th>
                    <th style="width: 25%;">Địa chỉ</th>
                    <th style="width: 15%;">Số điện thoại</th>
                    <th style="width: 10%;">Email</th>
                    <th scope="col" class="text-center" style="width: 20%;">Tổng thanh toán</th>
                    <th scope="col" class="text-center" style="width: 15%;">Xem chi tiết</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="order in orders" :key="order._id">
                    <tr>
                        <th scope="row">{{ order.fullname }}</th>
                        <td>{{ order.address }}</td>
                        <td>{{ order.phone }}</td>
                        <td>{{ order.email }}</td>
                        <td class="text-center">{{ formatPrice(order.totalPrice) }} vnd</td>
                        <td class="text-center">
                            <router-link :to="{ name: 'order_details', params: { id: order._id } }">
                                <i class="fa-solid fa-eye" style="color: #000000;"></i>
                            </router-link>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import orderService from '@/services/order.service';
import io from 'socket.io-client';

export default {
    data() {
        return {
            orders: [],
        };
    },

    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },
        async fetchOrders() {
            try {
                this.orders = await orderService.getAll();
                this.orders = this.orders.filter(order => order.status === "1");
            } catch (error) {
                console.error(error);
            }
        }
    },

    mounted() {
        const socket = io('http://localhost:3005');

        socket.on('confirmOrder', async (data) => {
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
.handle {
    font-family: 'Courier New', Courier, monospace;
    padding-left: 10px;
    padding-top: 10px;
    padding-right: 10px;
}

.handle-search {
    display: flex;
    justify-content: end;
}

.handle-divider {
    border: 1px solid black;
    margin-top: 10px;
    margin-bottom: 20px;
}
</style>