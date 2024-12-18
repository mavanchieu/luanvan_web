<template>
    <div class="payment">
        <p class="payment-title"><span><b>TÓM TẮT ĐƠN HÀNG:</b></span> <span class="font-weight-bold text-success"> {{
            formatPrice(totalPrice) }} vnd</span></p>
        <h6 class="">Số các mặt hàng khác nhau: <b>{{ cartItems.length }}</b></h6>
        <h6 class="payment-count-product">Tổng số các mặt hàng: <b>{{ totalItems }}</b></h6>
        <span class="payment-space">
            <span class="order-summary" style="font-size: 20px;"><b>Thông tin tóm tắt đơn hàng</b></span>
            <button v-if="isVisibleSummary === false" class="order-summary-button" @click="openIsVisibleSummary">
                <span><i class="fa-solid fa-angle-down"></i></span>
            </button>
            <button v-if="isVisibleSummary === true" class="order-summary-button" @click="closeIsVisibleSummary">
                <span>
                    <i class="fa-solid fa-angle-up"></i>
                </span>
            </button>
        </span>
        <div v-if="isVisibleSummary === true">
            <div>
                <template v-for="pro in productsList" :key="pro._id">
                    <template v-for="(cart, index) in cartItems" :key="cart._id">
                        <template v-if="cart.productId === pro._id">
                            <div class="row mt-2">
                                <div class="col-12">
                                    <div class="row">
                                        <template v-for="color in colorItems" :key="color._id">
                                            <template v-if="cart.colorItemId === color._id">
                                                <div class="col-4">
                                                    <img style="width: 250px; object-fit: contain;"
                                                        :src="'http://localhost:3005/' + color.images[0]" alt="">
                                                </div>
                                            </template>
                                        </template>
                                        <div class="col-4">
                                            <h5 class="font-weight-bold">{{ pro.name }}</h5>
                                            <template v-for="color in colorItems" :key="color._id">
                                                <template v-if="cart.colorItemId === color._id">
                                                    <span class="payment-space"> <span>Màu</span> <span><b>{{ color.name
                                                                }}</b></span></span>

                                                    <template v-for="size in color.sizes">
                                                        <template v-if="cart.sizeId === size._id">
                                                            <input type="number" hidden v-model="size.quantity">
                                                            <span class="payment-space"> <span>Size</span> <span><b>{{
                                                                size.name }}</b></span></span>
                                                            <br>

                                                            <span class="payment-space">
                                                                <span>Số lượng</span>
                                                                <span>
                                                                    {{ cart.quantity }}
                                                                </span>
                                                            </span>

                                                            <span class="payment-space">
                                                                <span>Giá</span><span><b>{{ formatPrice(color.price) }}
                                                                        vnd</b></span></span>
                                                            <br>
                                                            <template v-if="pro.discount != 0">
                                                                <span class="payment-space"> <span>Giảm</span><span
                                                                        class="text-danger"><b>{{ pro.discount
                                                                            }}%</b></span></span>
                                                                <br>
                                                            </template>
                                                            <span class="payment-space">
                                                                <span>Tạm tính</span>
                                                                <span class="text-success">
                                                                    <b>{{ formatPrice(cart.quantity * (color.price -
                                                                        (color.price * pro.discount / 100))) }}vnd</b>
                                                                </span>
                                                            </span>
                                                            <div class="payment-divider">

                                                            </div>
                                                        </template>
                                                    </template>
                                                </template>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                </template>
            </div>
        </div>
        <div class="payment-content mt-4">
            <h5><b>Thông tin nhận hàng</b></h5>
            <div class=" mt-4">
                <form action="" class="form ml-4">
                    <div class="row">
                        <div class="col-6">
                            <h6>
                                <b> Điền tên và địa chỉ</b>
                            </h6>
                            <div class="form-group ml-4 mt-2">
                                <label for="fullname">Họ và tên</label>
                                <input type="text" class="form-control" name="fullname" id="fullname"
                                    placeholder="Vui lòng nhập tên người nhận" v-model="fullname">
                                <span class="text-danger"> {{ errors.fullname }}</span>
                            </div>
                            <div class="form-group ml-4">
                                <label for="address">Địa chỉ nhận hàng</label>
                                <textarea class="form-control" name="address" id="address" rows="3"
                                    v-model="address"></textarea>
                                <span class="text-danger"> {{ errors.address }}</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <h6>
                                <b> Thông tin liên hệ</b>
                            </h6>
                            <div class="form-group ml-4 mt-2">
                                <label for="phone">Số điện thoại</label>
                                <input type="text" class="form-control" name="phone" id="phone"
                                    placeholder="Vui lòng nhập số điện thoại" v-model="phone">
                                <span class="text-danger"> {{ errors.phone }}</span>
                            </div>
                            <div class="form-group ml-4">
                                <label for="email">Email</label>
                                <textarea class="form-control" name="email" id="email" rows="3"
                                    v-model="email"></textarea>
                                <span class="text-danger"> {{ errors.email }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="row mt-4">
                        <div class="col-7">
                            <h6>
                                <b>Khi nào bạn muốn nhận hàng?</b>
                            </h6>
                            <button class="ml-4 payment-btn-transition"><span><b>18-22/07/2024</b></span> <span>200.000
                                    vnd</span></button>
                            <button class="ml-4 mt-2 payment-btn-transition"><span><b>18-22/07/2024</b></span>
                                <span>200.000
                                    vnd</span></button>
                        </div>
                    </div> -->
                    <div class="row mt-4">
                        <div class="col-6">
                            <h6>
                                <b>Bạn có khuyến mãi?</b>
                            </h6>
                            <select v-model="discountCode" @change="changeDiscount">
                                <template v-for="dis in discountCodes" :key="dis._id">
                                    <template v-for="user in usersDiscountCode" :key="user._id">
                                        <option
                                            v-if="user.discountCodeId === dis._id && user.used === false && totalPrice >= dis.price"
                                            :value="{ 'userDiscountCodeId': user._id, 'discount': dis.discount, 'userDiscountId': user._id, 'code': dis.code }">
                                            Giảm {{ dis.discount }}% cho đơn hàng từ {{ dis.price }}
                                        </option>
                                    </template>
                                </template>
                            </select>
                            <!-- <div class="form-group ml-4 mt-2">
                                <input type="text" class="form-control"name="phone" id="phone" placeholder="Nhập mã khuyến mãi tại đây"  v-model="inputCode">
                            </div> -->
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-7">
                            <h6>
                                <b>Hình thức thanh toán?</b>
                            </h6>
                            <span class="text-danger">{{ errors.paymentMethod }}</span>
                            <div class="form-group ml-4 mt-2">
                                <span class="radio-space"><input type="radio" style="width: 20px;"
                                        v-model="paymentMethod" name="checkbox" value="Tiền mặt">Thanh toán khi nhận
                                    hàng</span>
                                <br>
                                <!-- <span class="radio-space"><input type="radio" style="width: 20px;"
                                        v-model="paymentMethod" name="checkbox" value="Ví MoMo">Thanh bằng ví
                                    MoMo</span>
                                <br> -->
                                <span class="radio-space"><input type="radio" style="width: 20px;"
                                        v-model="paymentMethod" name="checkbox" value="Zalo Pay"
                                        @change="handlePaymentChange">Thanh toán bằng
                                    ZaloPay</span>
                                <br>
                            </div>
                        </div>
                    </div>
                    <div class="row ml-4">
                        <form action="" @submit.prevent="addOrder" v-if="paymentMethod != 'Zalo Pay'">
                            <button class="btn payment-btn-order " type="submit">
                                ĐẶT HÀNG
                            </button>
                        </form>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import cartService from '@/services/cart.service';
import colorItemService from '@/services/colorItem.service';
import discount_codeService from '@/services/discount_code.service';
import orderService from '@/services/order.service';
import productService from '@/services/product.service';
import usersDiscountCodeService from '@/services/usersDiscountCode.service';
import { showErrorToast, showSuccessToast } from '../shared/Toast.vue';
import * as yup from 'yup';
import io from 'socket.io-client';

export default {
    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    data() {
        return {
            cartItems: [],
            totalPrice: 0,
            initialTotalPrice: 0,
            totalItems: 0,
            isVisibleSummary: false,

            productsList: [],

            fullname: "",
            phone: "",
            email: "",
            address: "",

            //  discount khi người dùng chọn
            discountCode: {
                userDiscountCodeId: "",
                discount: "",
                userDiscountId: "",
                code: "",
            },

            products: [
            ],

            colorItems: [],

            checkbox: false,


            usersDiscountCode: [],
            discountCodes: [],

            initialCode: "",


            paymentMethod: "",
            errors: {},
        };
    },

    methods: {

        async validator() {
            const schema = yup.object().shape({
                fullname: yup.string().min(5, 'Tên đăng nhập ít nhất 6 kí tự').required('Tên đăng nhập không được để trống'),
                phone: yup.string().matches(/^\d{10}$/, 'Số điện thoại phải có 10 chữ số').required('Số điện thoại không được để trống'),
                address: yup.string().min(10, "Tối thiểu 10 kí tự").required("Địa chỉ không được trống"),
                email: yup.string().email("Email phải hợp lệ").required("Email không được để trống"),
                paymentMethod: yup.string().required("Vui lòng chọn hình thức thanh toán"),
            });

            try {
                await schema.validate({
                    fullname: this.fullname,
                    phone: this.phone,
                    email: this.email,
                    address: this.address,
                    paymentMethod: this.paymentMethod,
                }, { abortEarly: false });
                return true;
            } catch (error) {
                this.errors = this.getErrors(error);
                return false;
            }

        },
        getErrors(error) {
            const errors = {};
            error.inner.forEach((err) => {
                errors[err.path] = err.message;
            });
            return errors;
        },

        changeDiscount() {
            console.log(this.discountCode);
            this.initialCode = this.discountCode.code;
            this.totalPrice = this.initialTotalPrice - (this.initialTotalPrice * this.discountCode.discount / 100);
        },

        async handlePaymentChange() {
            if (this.paymentMethod == "Zalo Pay") {
                const result = await orderService.payment(this.totalPrice);
                if (result) {
                    window.open(result.order_url, '_blank');
                    const checkStatusInterval = setInterval(async () => {
                        const result1 = await orderService.orderStatus(result.app_trans_id);

                        if (result1.return_code === 3) {
                            console.log("Giao dịch đang được thực hiện");
                        } else if (result1.return_code === 1) {
                            showSuccessToast("Giao dịch thực hiện thành công");
                            await this.addOrder();
                            window.location.href = "/cart";
                            clearInterval(checkStatusInterval);
                        } else if (result1.return_code === -1) {
                            showErrorToast("Giao dịch thất bại");
                            clearInterval(checkStatusInterval);
                        }
                    }, 5000);

                }
            }
        },

        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        openIsVisibleSummary() {
            this.isVisibleSummary = true;
        },

        closeIsVisibleSummary() {
            this.isVisibleSummary = false;
        },

        async fetchCartItems() {
            try {
                this.cartItems = await cartService.getAllByUserId(this.getUserId);
                for (const item of this.cartItems) {
                    const pro = this.productsList.find(item1 => item1._id === item.productId);
                    const color = this.colorItems.find(item2 => item2._id === item.colorItemId);
                    this.totalPrice = this.totalPrice + (item.quantity * (color.price - (color.price * pro.discount / 100)));
                }
                this.initialTotalPrice = this.totalPrice;

                for (const item of this.cartItems) {
                    this.totalItems = this.totalItems + item.quantity;
                }
            } catch (error) {
                console.error(error);
            }
        },

        async fetchProducts() {
            try {
                this.productsList = await productService.getAll();
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

        async fetchUsersDicountCode() {
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
        },

        hienthi() {
            this.products = [...this.cartItems];
            for (const item of this.colorItems) {
                for (const [index, pro] of this.products.entries()) {
                    if (pro.colorItemId === item._id) {
                        this.products[index].image = item.images[0];
                    }
                }
            }
            console.log(this.products);
        },

        async addOrder() {
            this.errors = {};
            const validate = await this.validator();
            if (validate) {
                console.log('Dữ liệu hợp lệ, thêm đơn hàng...');
            } else {
                console.log('Dữ liệu không hợp lệ:', this.errors);
                return;
            }
            try {
                const now = new Date();
                const vietnamTime = new Date(now.getTime() + (7 * 60 * 60 * 1000)); // Cộng 7 giờ vào giờ UTC
                const formattedDate = vietnamTime.toISOString().slice(0, 19).replace('T', ' ');

                for (const [index, item] of this.cartItems.entries()) {

                    const product = this.productsList.find(item2 => item2._id == item.productId);
                    this.cartItems[index].productName = product.name;
                    this.cartItems[index].discount = product.discount;

                    const color = this.colorItems.find(item1 => item1._id == item.colorItemId);

                    this.cartItems[index].colorItemName = color.name;
                    this.cartItems[index].price = color.price;

                    const size = color.sizes.find(item3 => item3._id == item.sizeId);
                    this.cartItems[index].sizeName = size.name;

                }

                this.products = [...this.cartItems];

                for (const item of this.colorItems) {
                    for (const [index, pro] of this.products.entries()) {
                        if (pro.colorItemId === item._id) {
                            this.products[index].image = item.images[0];
                        }
                    }
                }
                for (const item of this.colorItems) {
                    for (const [index, pro] of this.products.entries()) {
                        if (pro.colorItemId === item._id) {

                            const fullPath = item.images[0];
                            const imageName = fullPath.split('\\').slice(1).join('\\');
                            this.products[index].image = imageName;
                        }
                    }
                }

                console.log(this.products);
                const formData = new FormData();
                formData.append("userId", this.getUserId);

                this.products.forEach((product) => {
                    if (product.image) {
                        formData.append('image', product.image);
                    }
                });

                formData.append("fullname", this.fullname);
                formData.append("email", this.email);
                formData.append("phone", this.phone);
                formData.append("address", this.address),
                    formData.append("status", "0");
                formData.append("date", formattedDate);
                formData.append("totalPrice", this.totalPrice);
                formData.append("paymentMethod", this.paymentMethod);
                formData.append("products", JSON.stringify(this.products));
                formData.append("userDiscountCodeId", this.discountCode.userDiscountCodeId);
                formData.append("discount", this.discountCode.discount);
                formData.append("code", this.discountCode.code);

                // await usersDiscountCodeService.update(this.discountCode.userDiscountId, this.discountCode);

                const message = await orderService.create(formData);
                if (message) {
                    // xóa giỏ hàng khi thanh toán thành công
                    await cartService.deleteAll(this.getUserId);
                    if (this.initialCode != "") {
                        await usersDiscountCodeService.update(this.discountCode.userDiscountId);
                    }
                    showSuccessToast("Bạn đã đặt hàng thành công, vui lòng đợi đơn hàng được xác nhận");
                    setTimeout(() => {
                        this.$router.push({ name: 'cart' });
                    }, 1500);
                }
            } catch (error) {
                showErrorToast(error.response.data.message);
            }
        }
    },

    mounted() {
        const socket = io('http://localhost:3005');

        socket.on('updateProduct', async (data) => {
            console.log('Sản phẩm đã bị ẩn:', data.productId);
            await this.fetchProducts();
            await this.fetchColorItems();
            await this.fetchCartItems();
            await this.fetchUsersDicountCode();
            await this.fetchDiscountCodes();
        });

    },
    async created() {
        await this.fetchProducts();
        await this.fetchColorItems();
        await this.fetchCartItems();
        await this.fetchUsersDicountCode();
        await this.fetchDiscountCodes();
        this.initialCode = "";
    }
}
</script>

<style scoped>
.payment {
    margin-top: 10px;
    width: 60%;
    margin: 0 auto;
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.payment-title {
    font-size: 20px;
}

.payment-space {
    display: flex;
    justify-content: space-between;
}

.payment-divider {
    border: 1px solid black;
    margin-bottom: 40px;
}

.order-summary-button {
    background-color: transparent;
    all: unset;
    border: none;
}

.payment-count-product {
    border-bottom: 1px solid black;
}

.form {
    width: 70%;
}

.payment-btn-transition {
    padding: 0px;
    display: flex;
    background-color: white;
    border: 0.5px solid black;
    padding: 5px;
    gap: 20px;
}

.payment-btn-transition:hover {
    border: 2px solid black;
}


.radio-space {
    display: flex;
    gap: 20px;
    align-items: center;
}

.payment-btn-order {
    background-color: black;
    color: white;
}

.payment-btn-order:hover {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border: 1px solid black;
}
</style>