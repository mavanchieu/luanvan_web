<template>
    <div class="account">
        <div class="row account-btn">
            <p class="account-p-btn">
                <span><button class=" account-btn-profile" :class="{ account_btn_profile: selectedButton === '0' }"
                        @click="proflie">Thông tin cá nhân</button></span>
                <span><button class=" account-btn-order" :class="{ account_btn_order: selectedButton === '1' }"
                        @click="order">Quản lý đơn hàng</button></span>
                <span><button class=" account-btn-shop" :class="{ account_btn_shop: selectedButton === '2' }"
                        @click="shop">Cửa hàng</button></span>
            </p>
        </div>
        <div v-if="selectedButton === '0'" class="content-profile">
            <div class="row">
                <div class="col-5">
                    <h5 class="font-weight-bold">Hồ sơ cá nhân</h5>
                    <form action="" @submit.prevent="updateUser">
                        <h6 class="mt-2">Tên đăng nhập</h6>
                        <input class="ml-4 username" type="text" placeholder="Vd: chieuma" v-model="user.username"
                            disabled>
                        <h6 class="mt-4">Ảnh đại diện</h6>
                        <Edit_Image />
                        <h6 class="name mt-4">Tên đầy đủ</h6>
                        <input class="ml-4 fullname " type="text" placeholder="Vd: Mã Văn Chiều"
                            v-model="user.fullname">
                        <h6 class="name mt-4">Giới tính</h6>
                        <p v-if="user.gender" class=" ml-4 account-space"><span class="gender">{{ user.gender }}</span>
                            <span>
                                <select name="" id="" style="" v-model="user.gender">
                                    <option value="Nam">
                                        Nam
                                    </option>
                                    <option value="Nữ">
                                        Nữ
                                    </option>
                                    <option value="Khác">
                                        Khác
                                    </option>
                                </select>
                            </span>
                        </p>
                        <p v-else class="mt-2 ml-4 account-space"><span class="gender"><span
                                    class="text-danger">Trống</span></span>
                            <span>
                                <select name="" id="" style="" v-model="user.gender">
                                    <option value="Nam">
                                        Nam
                                    </option>
                                    <option value="Nữ">
                                        Nữ
                                    </option>
                                    <option value="Khác">
                                        Khác
                                    </option>
                                </select>
                            </span>
                        </p>
                        <h6>Ngày sinh</h6>
                        <p v-if="user.birth" class="mt-2 ml-4 account-space"><span class="gender">{{ user.birth
                                }}</span>
                            <span>
                                <input type="date" v-model="user.birth">
                            </span>
                        </p>
                        <p v-else class="mt-2 ml-4 account-space"><span class="gender"><span
                                    class="text-danger">Trống</span></span>
                            <span>
                                <input type="date" v-model="user.birth">
                            </span>
                        </p>
                        <h6>Số điện thoại</h6>
                        <p class="mt-2 ml-4 space"><span><input class="phone" type="text" placeholder="Vd: 0369951760"
                                    v-model="user.phone"></span></p>
                        <h6 class="Email">Email</h6>
                        <input class="ml-4 email" type="text" placeholder="Vd: chieu@gmail.com" v-model="user.email">
                        <p class="text-center p-btn-save-profile">
                            <button class="btn btn-save-profile" type="submit">
                                <span>Lưu</span>
                            </button>
                        </p>
                    </form>
                </div>
                <div class="col-6 ml-4">
                    <Add_Address />
                    <div class=" mt-4 font-weight-bold">
                        <Edit_Password />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="selectedButton === '1'" class="content-order">
            <div class="row">
                <div class="col-3">
                    <p>
                        <button class="content-order-handle-p" @click="contentOrderHandle">
                            <span :class="{ content_order_handle_p: selectedContentOrder === '1' }">Xử lý</span>
                        </button>
                    </p>
                    <p>
                        <button class="content-ordered-p" @click="contentOrdered">
                            <span :class="{ content_ordered_p: selectedContentOrder === '2' }">Đã xác nhận</span>
                        </button>
                    </p>
                    <p>
                        <button class="content-order-delivery-p" @click="contentDelivery">
                            <span :class="{ content_order_delivery_p: selectedContentOrder === '5' }">Đang giao</span>
                        </button>
                    </p>
                    <p>
                        <button class="content-order-evaluation-p" @click="contentOrderedEvaluation">
                            <span :class="{ content_order_evaluation_p: selectedContentOrder === '3' }">Đánh giá</span>
                        </button>
                    </p>
                    <p>
                        <button class="content-order-refund-p" @click="contentOrderRefund">
                            <span :class="{ content_order_refund_p: selectedContentOrder === '4' }">Trả lại</span>
                        </button>
                    </p>
                </div>
                <div v-if="selectedContentOrder === '0'" class="content-shop-history col-9">

                </div>
                <div v-if="selectedContentOrder === '1'" class="content-shop-view col-9">
                    <Handle />
                </div>
                <div v-if="selectedContentOrder === '2'" class="content-shop-evaluation col-9">
                    <Ordered />
                </div>
                <div v-if="selectedContentOrder === '3'" class="content-shop-member col-9">
                    <Evaluation />
                </div>
                <div v-if="selectedContentOrder === '5'" class="content-shop-delivery col-9">
                    <Delivery />
                </div>
            </div>
        </div>
        <div v-if="selectedButton === '2'" class="content-shop">
            <div class="row">
                <div class="col-3">
                    <p>
                        <button class="content-shop-history-p" @click="contentShopHistory">
                            <span :class="{ content_shop_history_p: selectedContentShop === '0' }">Sản phẩm đã
                                xem</span>
                        </button>
                    </p>
                    <p>
                        <button class="content-shop-view-p" @click="contentShopView">
                            <span :class="{ content_shop_member_p: selectedContentShop === '1' }">Lịch sử tìm
                                kiếm</span>
                        </button>
                    </p>
                    <p>
                        <button class="content-shop-member-p" @click="contentShopMember">
                            <span :class="{ content_shop_member_p: selectedContentShop === '2' }">Trở thành Thành
                                Viên</span>
                        </button>
                    </p>
                    <p>
                        <button class="content-shop-discount-p" @click="contentDiscount">
                            <span :class="{ content_shop_discount_p: selectedContentShop === '3' }">Các khuyến
                                mãi</span>
                        </button>
                    </p>
                </div>
                <div class="col-9">
                    <div v-if="selectedContentShop === '0'" class="content-shop-history">
                        <Viewed_Product />
                    </div>
                    <div v-if="selectedContentShop === '3'" class="content-shop-history">
                        <UsersDiscountCode />
                    </div>
                    <div v-if="selectedContentShop === '1'" class="content-shop-view">
                        <Search_History />
                    </div>
                    <div v-if="selectedContentShop === '2'" class="content-shop-member">
                        <Member />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import Edit_Password from '@/components/account/Edit_Password.vue';
import Add_Address from '@/components/account/Add_Address.vue';
import Handle from '@/components/account/order_manager/Handle.vue';
import Search_History from '@/components/account/shop/Search_History.vue';
import Member from '@/components/account/shop/Member.vue';
import Evaluation from './evaluation/Evaluation.vue';
import Viewed_Product from './shop/Viewed_Products.vue';
import userService from '@/services/user.service';
import Ordered from './order_manager/Ordered.vue';
import Edit_Image from './shop/Edit_Image.vue';
import UsersDiscountCode from './usersDiscountCode/UsersDiscountCode.vue';
import Delivery from './order_manager/Delivery.vue';

export default {
    components: {
        Edit_Password,
        Add_Address,
        Search_History,
        Handle,
        Member,
        Evaluation,
        Viewed_Product,
        Ordered,
        Edit_Image,
        UsersDiscountCode,
        Delivery,
    },

    data() {
        return {
            user: typeof (Object),
            selectedButton: '0',
            selectedContentShop: '0',
            selectedContentOrder: '1',
        }
    },

    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        },
        getPassword() {
            return localStorage.getItem("password");
        }
    },

    methods: {
        proflie() {
            this.selectedButton = '0';
        },
        order() {
            this.selectedButton = '1';
        },
        shop() {
            this.selectedButton = '2';
        },

        contentShopHistory() {
            this.selectedContentShop = '0';
        },
        contentShopView() {
            this.selectedContentShop = '1';
        },
        contentShopMember() {
            this.selectedContentShop = '2';
        },
        contentDiscount() {
            this.selectedContentShop = '3';
        },


        contentOrderNotPayment() {
            this.selectedContentOrder = '0';
        },
        contentOrderHandle() {
            this.selectedContentOrder = '1';
        },
        contentOrdered() {
            this.selectedContentOrder = '2';
        },
        contentOrderedEvaluation() {
            this.selectedContentOrder = '3';
        },
        contentDelivery() {
            this.selectedContentOrder = '5';
        },
        contentOrderRefund() {
            this.selectedContentOrder = '4';
        },

        async fetchUser() {
            try {
                this.user = await userService.getId(this.getUserId);
            } catch {
                error(error);
            }
        },


        async updateUser() {
            const message = await userService.update(this.getUserId, this.user);
            if (message) {
                alert(message.message);
            }
        },
    },

    mounted() {
        this.fetchUser();
    }
}
</script>




<style>
.account {
    font-family: 'Courier New', Courier, monospace;
    width: 70%;
    margin: 0 auto;
    margin-top: 3px;
}

.account-btn {
    position: fixed;
    z-index: 99;
    background-color: white;
    width: 100%;
}

.account-p-btn {
    display: flex;
    gap: 20px;
    max-width: 100%;
}

.account-btn-profile,
.account-btn-order,
.account-btn-shop {
    background-color: white;
    color: black;
    border: 0.5px solid black;
    border-radius: 5px;
    padding: 5px 10px;
}

.account_btn_profile,
.account_btn_order,
.account_btn_shop {
    background-color: black;
    border: 0.5px solid black;
    color: white;

}

.content-profile {
    padding-top: 60px;
}

.account-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.username,
.phone,
.email,
.date,
.select-gender,
.fullname {
    border-radius: 5px;
    border: 0.5px solid black;
}

.p-btn-save-profile {
    margin-top: 20px;
    display: flex;
    justify-content: end;
    gap: 40px;
}

.btn-save-profile {
    display: flex;
    background-color: black;
    color: white;
    border: 0.5px solid black;
    align-items: center;
}

.btn-save-profile:hover {
    display: flex;
    gap: 40px;
    border: 0.5px solid black;
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
}

.p-date,
.gender {
    color: rgb(0, 109, 60);
    font-weight: bold;
}


/* content-shop */
.content-shop {
    padding-top: 60px;
}

.content_shop_history_p,
.content_shop_view_p,
.content_shop_member_p,
.content_shop_discount_p {
    border-bottom: 1px solid black;
    font-weight: bold;
}

.content-shop-history-p,
.content-shop-view-p,
.content-shop-member-p,
.content-shop-discount-p {
    background-color: white;
    border: none;
}

.content-order {
    padding-top: 60px;
}

.content_order_not_payment_p,
.content_order_handle_p,
.content_order_delivery_p,
.content_ordered_p,
.content_order_evaluation_p,
.content_order_refund_p {
    border-bottom: 1px solid black;
    font-weight: bold;
}

.content-order-not-payment-p,
.content-order-handle-p,
.content-ordered-p,
.content-order-delivery-p,
.content-order-evaluation-p,
.content-order-refund-p {
    background-color: white;
    border: none;
}
</style>