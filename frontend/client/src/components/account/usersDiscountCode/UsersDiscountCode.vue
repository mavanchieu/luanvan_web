<template>
    <div class="users-discount">
        <template v-if="usersDiscountCode.length != 0">
            <h5 class="font-weight-bold mb-4">Danh sách các khuyến mãi của bạn</h5>
            <template v-for="dis in usersDiscountCode" :key="dis._id">
                <template v-for="discount in discountCodes" :key="discount._id">
                    <template v-if="discount._id === dis.discountCodeId">
                        <div class="col-7 user-discount-content mb-4">
                            <span class="space">
                                <span><b>Mã Khuyến Mãi</b> <span class="ml-2" style="color: grey; font-weight: bold">{{
                                        discount.code }}</span></span>
                                <span><b>Giảm</b> <span class="ml-2" style="color: green; font-weight: bold">{{
                                        discount.discount }}%</span></span>
                            </span>
                            <span class="space">
                                <b>Đơn tối thiểu</b>
                                <span class="ml-2" style="color: green; font-weight: bold">
                                    {{ formatPrice(discount.price) }} vnd
                                </span>
                            </span>
                            <span>
                                <b>Thời gian từ </b>
                            </span>
                            <br>
                            <span class="ml-4" style="color: orangered; font-weight: bold"> {{ discount.fromDate }} - {{
                                discount.toDate }}</span>
                            <br>
                            <span><b>Nội dung khuyến mãi</b></span>
                            <br>
                            <span class="ml-4"> {{ discount.description }}</span>
                            <br>
                            <span class="delete-discount">
                                <button v-if="dis.used === true" class="btn-used" disabled>
                                    Đã sử dụng
                                </button>
                                <button v-else class="btn-not-used" disabled>
                                    Chưa sử dụng
                                </button>
                            </span>
                        </div>
                    </template>
                </template>
            </template>
        </template>
        <template v-if="usersDiscountCode.length === 0">
            <div>
                <h5 class="font-weight-bold">Hiện tại, bạn không có khuyến mãi nào</h5>
            </div>
        </template>
    </div>
</template>

<script>
import discount_codeService from '@/services/discount_code.service';
import usersDiscountCodeService from '@/services/usersDiscountCode.service';

export default {
    data() {
        return {
            usersDiscountCode: [],
            discountCodes: [],
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

        async fetchUsersDiscountCode() {
            try {
                this.usersDiscountCode = await usersDiscountCodeService.getAllDiscountByUserId(this.getUserId);
            } catch (error) {
                console.error(error);
            }
        },

        async fetchDiscountCodes() {
            try {
                this.discountCodes = await discount_codeService.getAll();
            } catch (error) {
                console.error(error);
            }
        }
    },


    async mounted() {
        await this.fetchUsersDiscountCode();
        await this.fetchDiscountCodes();
    }
}

</script>


<style scoped>
.users-discount {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.user-discount-content {
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
}

.user-discount-content .space {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
}

.delete-discount {
    display: flex;
    justify-content: end;
    align-items: center;
}

.btn-used {
    border: none;
    background-color: rgb(85, 171, 0);
    color: white;
}

.btn-not-used {
    border: 1px solid rgb(0, 0, 0);
    color: rgb(1, 108, 32);
}
</style>