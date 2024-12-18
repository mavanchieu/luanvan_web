<template>
    <div class="discount-code" v-if="discountCodes.length > 0">
        <span>
            <h4><b>Các mã khuyến mãi</b></h4>
        </span>
        <div class="">
            <template v-for=" dis in discountCodes" :key="dis._id">
                <div class="row mt-2  discount-code-content">
                    <div class="col-4 ml-2">
                        <span class="text-white">
                            <span> <b>Mã code </b></span>
                            <span style="font-weight: bold;">{{ dis.code }}</span>
                        </span>
                        <br>
                        <span class="text-white">
                            <span><b>Thời gian </b> </span>
                            <span>{{ dis.fromDate + ' - ' + dis.toDate }}</span>
                        </span>
                    </div>
                    <div class="col-4">
                        <span class="text-white ">
                            <span class="font-weight-bold">Giảm </span>
                            <b>{{ dis.discount }}%</b>
                        </span>
                        <span class="discount-code-space">
                            <span class="font-weight-bold text-white">Đơn tối thiểu <span
                                    style="font-weight: bold; color: green; border: 1px solid white ; background: white; padding: 3px;">{{
                                        formatPrice(dis.price) }} vnd</span></span>
                        </span>
                    </div>
                    <div class="col-3">
                        <template v-for="user in usersDiscountCode" :key="user._id">
                            <template v-if="user.discountCodeId === dis._id">
                                <span class="d-flex-right">
                                    <button class="btn btn-dark" disabled>Đã lưu</button>
                                </span>
                            </template>
                        </template>
                        <template v-if="!usersDiscountCode.some(user => user.discountCodeId === dis._id)">
                            <span class="d-flex-right">
                                <button class="btn btn-save-discount-code"
                                    @click="createUserDiscountCode(dis._id)">Lưu</button>
                            </span>
                        </template>
                    </div>
                </div>
            </template>
            <template v-if="discountCodes.length === 0">
                <h5>Hiện tại không có mã khuyến mãi nào</h5>
            </template>
        </div>
    </div>
</template>

<script>
import discount_codeService from '@/services/discount_code.service';
import usersDiscountCodeService from '@/services/usersDiscountCode.service';
import { showSuccessToast } from '../shared/Toast.vue';


export default {

    data() {
        return {
            discountCodes: [],
            isSelected: 0,

            userDiscountCode: {
                userId: "",
                discountCodeId: "",
                used: false,
            },

            usersDiscountCode: [],
        };
    },

    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },


    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        async fetchDiscountCodes() {
            try {
                this.discountCodes = await discount_codeService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async fetchUsersDiscountCode() {
            try {
                this.usersDiscountCode = await usersDiscountCodeService.getAllDiscountByUserId(this.getUserId);
            } catch (error) {
                console.error(error);
            }
        },

        async createUserDiscountCode(id) {
            this.userDiscountCode.discountCodeId = id;
            this.userDiscountCode.userId = this.getUserId;
            console.log(this.userDiscountCode);
            try {
                const message = await usersDiscountCodeService.create(this.userDiscountCode);
                if (message) {
                    showSuccessToast("Bạn đã lưu thành công mã khuyến mãi!");
                    await this.fetchDiscountCodes();
                    await this.fetchUsersDiscountCode();
                }
            } catch (error) {
                console.error(error);
            }
        },

        showDiscount() {
            this.isSelected = 1;
        }
    },

    async mounted() {
        await this.fetchDiscountCodes();
        await this.fetchUsersDiscountCode();
    }
}

</script>

<style>
.discount-code {
    font-family: 'Courier New', Courier, monospace;
    padding-left: 10px;
    width: 70%;
    margin: 0 auto;
    padding-bottom: 20px;
}

.discount-code-content {
    padding: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(1, 107, 95, 1) 38%, rgba(1, 129, 107, 1) 51%, rgba(0, 255, 176, 1) 100%);
}

.discount-code-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.discount-code-divider {
    border: 0.5px solid black;
}

.d-flex-right {
    margin-top: 5px;
    display: flex;
    justify-content: end;
    align-items: center;
}

.btn-save-discount-code {
    background-color: rgb(0, 0, 0);
    color: rgb(251, 251, 251);
    border: 1px solid rgb(101, 232, 101);
}

.btn-save-discount-code:hover {
    background-color: rgb(0, 87, 20);
    color: rgb(255, 255, 255);
    border: 1px solid rgb(101, 232, 101);
}
</style>