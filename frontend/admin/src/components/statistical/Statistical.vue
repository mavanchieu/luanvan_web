<template>
    <div class="statistical">
        <h5 class="font-weight-bold" style="border-bottom: 1px solid black;"> THỐNG KÊ</h5>
        <div class="statis-order mt-4">
            <h5 class="ml-4" style="font-style: italic;">Liên quan đến người dùng</h5>
            <div class="d-flex justify-content-end align-items-center" style="margin-right: 55px;">
                <form action="" @submit.prevent="statisUsers()">
                    <span>Từ <input type="date" v-model="fromDate2"></span>
                    <span class="ml-2">Đến <input type="date" v-model="toDate2"></span>
                    <span class="ml-2"><button type="submit" class="btn btn-dark">Chọn</button></span>
                </form>
            </div>
            <div class="row statis-row mt-2">
                <div class="col-5 total-ordered">
                    <div class="row">
                        <div class="col-7">
                            <span
                                style="font-weight: bold;color: black; font-size: 19px; font-family: 'Times New Roman', Times, serif;">Tổng
                                Truy Cập</span>
                            <br>
                            <span style="color: black; font-size: 17px;">Truy cập vào hệ thống</span>
                        </div>
                        <div class="col-5">
                            <span style="color: white; font-size: 20px; font-weight: bold;"> {{ accesses.length
                                }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-5 total-order">
                    <div class="row">
                        <div class="col-7">
                            <span
                                style="font-weight: bold;color: black; font-size: 19px; font-family: 'Times New Roman', Times, serif;">Tổng
                                Tài Khoản</span>
                            <br>
                            <span style="color: black; font-size: 17px;">Tài khoản đã tạo</span>
                        </div>
                        <div class="col-5">
                            <span style="color: white; font-size: 20px; font-weight: bold;"> {{ usersCreate.length }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;">
                <p class="ml-4 font-weight-bold" style="margin-top: 30px; padding-top: 10px;">Lịch sử truy cập</p>
                <div class="row statis-row">
                    <div class="statis-button">
                        <button @click="btnShowAccess('client')" class="btn"
                            :class="{ 'active-button': currentRole === 'client' }">Tài Khoản Khách</button>
                        <button @click="btnShowAccess('staff')" class="btn"
                            :class="{ 'active-button': currentRole === 'staff' }">Tài Khoản Nhân Viên Bán Hàng</button>
                        <button @click="btnShowAccess('wh_staff')" class="btn"
                            :class="{ 'active-button': currentRole === 'wh_staff' }">Tài Khoản Nhân Viên kho</button>
                        <button @click="btnShowAccess('admin')" class="btn"
                            :class="{ 'active-button': currentRole === 'admin' }">Tài Khoản Admin</button>
                    </div>
                </div>
                <table class="table mt-4" style=" box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">Tên đăng nhập</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="accesses.length > 0" v-for="access in accesses" :key="access._id">
                            <template v-for="user in users" :key="user._id">
                                <template v-if="access.userId == user._id && user.role == currentRole">
                                    <tr>
                                        <td> {{ user.username }}</td>
                                        <td> {{ user.phone }}</td>
                                        <td> {{ user.gender }}</td>
                                        <td> {{ user.date }}</td>
                                    </tr>
                                </template>
                            </template>
                        </template>
                    </tbody>
                </table>
            </div>
            <Access />
            <div style="box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;;">
                <p class="mt-4 ml-4 font-weight-bold" style="margin-top: 30px; padding-top: 10px;">Lịch sử tạo tài khoản
                </p>
                <div class="row statis-row">
                    <div class="statis-button">
                        <button @click="btnShowCreate('client')" class="btn"
                            :class="{ 'active-button2': currentRole2 === 'client' }">Tài Khoản Khách</button>
                        <button @click="btnShowCreate('staff')" class="btn"
                            :class="{ 'active-button2': currentRole2 === 'staff' }">Tài Khoản Nhân Viên</button>
                        <button @click="btnShowCreate('admin')" class="btn"
                            :class="{ 'active-button2': currentRole2 === 'admin' }">Tài Khoản Admin</button>
                    </div>
                </div>
                <table class="table mt-4" style=" box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">Tên đăng nhập</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="user in listCreate" :key="user._id">
                            <tr>
                                <td> {{ user.username }}</td>
                                <td> {{ user.phone }}</td>
                                <td> {{ user.gender }}</td>
                                <td> {{ user.date }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="statis-order mt-4">
            <h5 class="ml-4" style="font-style: italic;">Liên quan đến đơn hàng</h5>
            <div class="d-flex justify-content-end align-items-center" style="margin-right: 55px;">
                <form action="" @submit.prevent="statisOrder">
                    <span>Từ <input type="date" v-model="fromDate1"></span>
                    <span class="ml-2">Đến <input type="date" v-model="toDate1"></span>
                    <span class="ml-2"><button type="submit" class="btn btn-dark">Chọn</button></span>
                </form>
            </div>
            <div class="row statis-row mt-2">
                <div class="col-5 total-ordered">
                    <div class="row">
                        <div class="col-7">
                            <span
                                style="font-weight: bold;color: black; font-size: 19px; font-family: 'Times New Roman', Times, serif;">Tổng
                                Đơn Hàng</span>
                            <br>
                            <span style="color: black; font-size: 17px;">Đơn hàng đã xác nhận</span>
                        </div>
                        <div class="col-5">
                            <span style="color: white; font-size: 20px; font-weight: bold;"> {{ ordered.length }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-5 total-order">
                    <div class="row">
                        <div class="col-7">
                            <span
                                style="font-weight: bold;color: black; font-size: 19px; font-family: 'Times New Roman', Times, serif;">Tổng
                                Đơn Hàng</span>
                            <br>
                            <span style="color: black; font-size: 17px;">Đơn hàng chưa xác nhận</span>
                        </div>
                        <div class="col-5">
                            <span style="color: white; font-size: 20px; font-weight: bold;"> {{ handle.length }} </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row statis-row mt-2">
                <div class="col-5 total-shipping">
                    <div class="row">
                        <div class="col-7">
                            <span
                                style="font-weight: bold;color: black; font-size: 19px; font-family: 'Times New Roman', Times, serif;">Tổng
                                Đơn Hàng</span>
                            <br>
                            <span style="color: black; font-size: 17px;">Đơn hàng đã vận chuyển</span>
                        </div>
                        <div class="col-5">
                            <span style="color: white; font-size: 20px; font-weight: bold;"> {{ shipping.length
                                }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-5 statis-total-price">
                    <div class="row">
                        <div class="col-7">
                            <span
                                style="font-weight: bold;color: black; font-size: 19px; font-family: 'Times New Roman', Times, serif;">Tổng
                                Doanh Thu</span>
                            <br>
                            <span style="color: black; font-size: 17px;">Doanh thu bán hàng</span>
                        </div>
                        <div class="col-5">
                            <span style="color: white; font-size: 20px; font-weight: bold;"> {{ formatPrice(totalPrice)
                                }}
                                vnd</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Revenue />
        <div>
            <Statistical_Product />
        </div>

    </div>
</template>

<script>
import accessService from '@/services/access.service';
import orderService from '@/services/order.service';
import userService from '@/services/user.service';
import Statistical_Product from './Statistical_Product.vue';
import Revenue from './Revenue.vue';
import Access from './Access.vue';
import { showErrorToast } from '../shared/Toast_Notification.vue';

export default {
    components: {
        Statistical_Product,
        Revenue,
        Access,
    },


    data() {
        return {
            fromDate1: "",
            toDate1: "",

            fromDate2: "",
            toDate2: "",

            // người dùng
            accesses: [], // try cập
            currentRole: 'client',
            currentRole2: 'client',
            listCreate: [],

            users: [],

            clientUsers: [],
            staffUsers: [],
            whStaffUsers: [],
            adminUsers: [],
            createUsers: [],

            usersCreate: [],

            // đơn hàng
            orders: [],
            ordered: [], // đơn hàng đã xác nhận
            handle: [], // đơn hàng chưa xác nhận
            shipping: [], // đơn hàng đã vận chuyển
            totalPrice: 0,

        }
    },

    methods: {
        // người dùng hệ thống
        async fetchAccesses() {
            try {
                this.accesses = await accessService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async btnShowAccess(role) {
            this.currentRole = role;
            // await this.fetchUsers();
        },

        btnShowCreate(role) {
            this.currentRole2 = role;
            if (role == 'client') {
                this.listCreate = this.clientUsers;
            }
            if (role == 'staff') {
                this.listCreate = this.staffUsers;
            }
            if (role == 'wh_staff') {
                this.listCreate = this.whStaffUsers;
            }
            if (role == 'admin') {
                this.listCreate = this.adminUsers;
            }
        },

        async fetchUsers() {
            try {

                // create
                this.users = await userService.getAll();
                this.usersCreate = this.users;
                this.clientUsers = this.users.filter(user => user.role == 'client');
                this.adminUsers = this.users.filter(user => user.role == 'admin');
                this.staffUsers = this.users.filter(user => user.role == 'staff');
                this.whStaffUsers = this.users.filter(user => user.role == 'wh_staff');

                // mặc định hiển thị thông tin clientUsers
                this.listCreate = this.clientUsers;
            } catch (error) {
                console.log(error);
            }
        },

        async statisUsers() {
            const date = new Date();
            const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            const currentDate = offsetDate.toISOString().split('T')[0];

            if (this.fromDate2 && this.toDate2 && this.toDate2 < this.fromDate2) {
                showErrorToast("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
                return;
            }
            if (this.toDate2 && this.toDate2 > currentDate || this.fromDate2 && this.fromDate2 > currentDate) {
                showErrorToast("Vui lòng kiểm tra lại ngày thống kê");
                return;
            }
            this.fetchUsers();
            await this.fetchAccesses();
            this.usersCreate = this.users.filter(user => user.date >= this.fromDate2 && user.date <= this.toDate2);
            this.clientUsers = this.users.filter(user => user.role == 'client' && user.date >= this.fromDate2 && user.date <= this.toDate2);
            this.staffUsers = this.users.filter(user => user.role == 'staff' && user.date >= this.fromDate2 && user.date <= this.toDate2);
            this.whStaffUsers = this.users.filter(user => user.role == 'wh_staff' && user.date >= this.fromDate2 && user.date <= this.toDate2);
            this.adminUsers = this.users.filter(user => user.role == 'admin' && user.date >= this.fromDate2 && user.date <= this.toDate2);
            this.accesses = this.accesses.filter(acc => {
                // Lấy phần ngày từ chuỗi 'YYYY-MM-DD HH:mm:ss'
                const accessDate = acc.date.split(' ')[0];
                return accessDate >= this.fromDate2 && accessDate <= this.toDate2;
            });
            console.log("Số lượng truy cập", this.accesses);
        },

        // đơn hàng
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        async fetchOrders() {
            try {
                this.orders = await orderService.getAll();

                this.ordered = this.orders.filter(order => order.status == 1); // đơn hàng đã xác nhận
                this.handle = this.orders.filter(order => order.status == 0); // đơn hàng chưa xác nhận
                this.shipping = this.orders.filter(order => order.status == 2); // đơn hàng đã vận chuyển
                this.totalPrice = this.shipping.reduce((total, order) => {
                    return total + parseInt(order.totalPrice);
                }, 0)

            } catch (error) {
                console.log(error);
            }
        },

        async statisOrder() {
            const date = new Date();
            const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            const currentDate = offsetDate.toISOString().split('T')[0];
            console.log(currentDate);

            if (this.fromDate1 && this.toDate1 && this.toDate1 < this.fromDate1) {
                showErrorToast("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
                return;
            }
            if (this.toDate1 && this.toDate1 > currentDate || this.fromDate1 && this.fromDate1 > currentDate) {
                showErrorToast("Vui lòng kiểm tra lại ngày thống kê");
                return;
            }

            await this.fetchOrders();
            this.ordered = this.ordered.filter(order => order.fromDate >= this.fromDate1 && order.fromDate <= this.toDate1);
            this.handle = this.handle.filter(order => order.date.split(" ")[0] >= this.fromDate1 && order.date.split(" ")[0] <= this.toDate1);
            this.shipping = this.shipping.filter(order => order.toDate >= this.fromDate1 && order.toDate <= this.toDate1);
            this.totalPrice = this.shipping.reduce((total, order) => {
                return total + parseInt(order.totalPrice);
            }, 0)
        }
    },

    async mounted() {
        await this.fetchUsers();
        await this.fetchAccesses();
        await this.fetchOrders();
    }
}

</script>

<style>
.statistical {
    font-family: 'Courier New', Courier, monospace;
    margin: 10px;
    background-color: rgb(228, 244, 243);
    padding: 10px;
}

.statis-button {
    display: flex;
    gap: 20px;
}

.statis-button button {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border: 1px solid black;
}

.statis-button .active-button {
    background-color: black;
    color: white;
}

.statis-button .active-button2 {
    background-color: black;
    color: white;
}


.statis-order {
    background-color: white;
    margin: 10px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.statis-row {
    display: flex;
    justify-content: space-evenly;
    padding-left: 10px;
}

.total-order,
.statis-total-price,
.total-ordered,
.total-shipping {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 10px;
}

.total-order {
    background-image: linear-gradient(rgb(235, 188, 231), rgb(221, 172, 229));
}

.total-ordered {
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(128, 125, 212, 1) 0%, rgba(133, 197, 206, 1) 0%, rgba(9, 9, 121, 1) 100%, rgba(145, 211, 225, 1) 100%);
}

.statis-total-price {
    background: rgb(131, 58, 180);
    background: linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(220, 135, 135, 1) 0%, rgba(134, 153, 0, 1) 100%);
}

.total-shipping {
    background: rgb(238, 174, 202);
    background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(216, 189, 194, 1) 31%, rgba(148, 233, 169, 1) 91%);
}

/* Cột 2 */
.statis-total-price .row .col-5,
.total-order .row .col-5,
.total-shipping .row .col-5,
.total-ordered .row .col-5 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.image-container {
    position: relative;
    display: inline-block;
    overflow: hidden;
    /* Để đảm bảo lớp phủ không ra ngoài ảnh */
}

.image-container img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 10px;
    /* Để ảnh có góc bo nếu cần */
}

/* Lớp phủ mờ (sóng mờ) */
.image-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    /* Lớp mờ trắng */
    transform: scaleX(0);
    /* Bắt đầu ở trạng thái thu nhỏ */
    transform-origin: left;
    /* Đặt điểm gốc của hiệu ứng từ trái */
    opacity: 0;
    /* Để lớp phủ ban đầu trong suốt */
    transition: transform 0.5s ease, opacity 0.3s ease;
    /* Hiệu ứng mượt mà */
    border-radius: 10px;
    /* Để lớp phủ có góc bo giống ảnh */
}

/* Hiệu ứng khi hover vào ảnh */
.image-container:hover::after {
    transform: scaleX(1);
    /* Mở rộng lớp phủ khi hover */
    opacity: 1;
    /* Làm lớp phủ hiển thị */
}
</style>
