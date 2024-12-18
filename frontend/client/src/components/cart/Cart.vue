<template>
    <templat v-if="cartItems.length === 0">
        <div class="not-cart">
            <p>
            <h5 class="font-weight-bold">GIỎ HÀNG CỦA BẠN</h5>
            </p>
            <div>
                <h5>Hiện tại không có sản phẩm nào trong giỏ hàng</h5>
                <button class="btn-cart-now" @click="buyNow">Mua Ngay<span class="cart-icon"><i
                            class="fa-solid fa-bag-shopping"></i></span></button>
            </div>
        </div>
    </templat>

    <template v-if="cartItems.length > 0">
        <div class="cart">
            <span class="cart-space">
                <span class="cart-total-items">Tổng số các mặt hàng khác nhau: <b>{{ cartItems.length }}</b></span>
                <button class="cart-delete-all" data-target="#cart-delete-all" data-toggle="modal">Xóa tất cả</button>
            </span>
            <template v-for="pro in products" :key="pro._id">
                <template v-for="(cart, index) in cartItems" :key="cart._id">
                    <template v-if="cart.productId === pro._id">
                        <div class="row mt-2">
                            <div class="col-8">
                                <div class="row">
                                    <h6 style="margin-left: 13px; color: red" v-if="pro.hidden == true">Sản phẩm hiện
                                        không còn khả dụng, vui lòng xóa trước khi thanh toán!</h6>
                                    <br>
                                    <template v-for="color in colorItems" :key="color._id">
                                        <template v-if="cart.colorItemId === color._id">
                                            <div class="col-4">
                                                <img style="width: 250px;"
                                                    :src="'http://localhost:3005/' + color.images[0]" alt="">
                                            </div>
                                        </template>
                                    </template>

                                    <div class="col-4">
                                        <h5 class="font-weight-bold">{{ pro.name }}</h5>
                                        <template v-for="color in colorItems" :key="color._id">
                                            <template v-if="cart.colorItemId === color._id">
                                                <span class="cart-space"> <span>Màu</span> <span><b>{{ color.name
                                                            }}</b></span></span>

                                                <template v-for="size in color.sizes">
                                                    <template v-if="cart.sizeId === size._id">
                                                        <input type="number" hidden v-model="size.quantity">
                                                        <span class="cart-space"> <span>Size</span> <span><b>{{
                                                            size.name }}</b></span></span>
                                                        <br>

                                                        <span class="cart-space">
                                                            <span>Số lượng</span>
                                                            <span>
                                                                <input style="width: 100px;" type="number"
                                                                    v-model="cart.quantity" min="1" :max="size.quantity"
                                                                    @change="updateQuantiy(cart._id, cart, size.quantity)"
                                                                    v-if="
                                                                        cart.quantity >
                                                                        colorItems.find(color => color._id == cart.colorItemId)
                                                                            ?.sizes.find(size => size._id == cart.sizeId)?.quantity && colorItems.find(color => color._id == cart.colorItemId)
                                                                                ?.sizes.find(size => size._id == cart.sizeId)?.quantity == 0
                                                                    " readonly>
                                                                <input v-else style="width: 100px;" type="number"
                                                                    v-model="cart.quantity" min="1" :max="size.quantity"
                                                                    @change="updateQuantiy(cart._id, cart, size.quantity)">
                                                            </span>
                                                        </span>
                                                        <br>
                                                        <p v-if="
                                                            cart.quantity >
                                                            colorItems.find(color => color._id == cart.colorItemId)
                                                                ?.sizes.find(size => size._id == cart.sizeId)?.quantity
                                                        ">
                                                        <p class="text-danger">Số lượng trong kho không đủ, vui lòng xóa
                                                            sản phẩm</p>
                                                        </p>

                                                        <p v-if="
                                                            cart.quantity < 1
                                                        ">
                                                        <p class="text-danger">Số lượng nhập vào không hợp lệ, giữ
                                                            nguyên số lượng ban đầu </p>
                                                        </p>

                                                        <span class="cart-space">
                                                            <span>Giá</span><span><b>{{ formatPrice(color.price) }}
                                                                    vnd</b></span></span>

                                                        <template v-if="pro.discount != 0">
                                                            <span class="cart-space">
                                                                <span>Giảm</span>
                                                                <span class="text-danger">
                                                                    <b>{{ pro.discount }}%</b>
                                                                </span>
                                                            </span>
                                                        </template>
                                                        <span class="cart-space mt-2">
                                                            <span><b>Tạm tính</b></span>
                                                            <span class="text-success">
                                                                <b>{{ formatPrice(cart.quantity * (color.price -
                                                                    (color.price * pro.discount / 100))) }} vnd</b>
                                                            </span>
                                                        </span>
                                                    </template>
                                                </template>
                                            </template>
                                        </template>

                                    </div>
                                    <div class="col-4 cart-icon">
                                        <button style="border: none;background-color: white;" data-toggle="modal"
                                            data-target="#cart-delete" @click="assignCartId(cart._id)">
                                            <span>
                                                <i style="width: 30px;" class="fa-solid fa-xmark "></i>
                                            </span>
                                        </button>
                                        <br>
                                    </div>
                                </div>
                                <div class="cart-divider"></div>
                            </div>
                            <div v-if="index === 0" class="col-4">
                                <div class="row">
                                    <div class="col-12">
                                        <h5 class="font-weight-bold">THÔNG TIN ĐƠN HÀNG</h5>
                                        <p class="cart-space"><span>Tổng số các mặt hàng</span><b> <span>{{ totalitems
                                                    }}</span></b></p>
                                        <p class="cart-space"><span>Tổng thanh toán</span> <b> <span>{{
                                            formatPrice(totalprice) }} vnd</span></b>
                                        </p>
                                        <div class="cart-divider-2"></div>
                                        <button class="btn cart-btn-payment" :disabled="isPaymentDisabled"
                                            @click="goPayment">
                                            <span>Thanh Toán</span>
                                            <span><i class="fa-solid fa-chevron-right"></i></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>
            </template>

            <div class="modal" tabindex="-1" id="cart-delete">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title font-weight-bold">Xóa sản phẩm</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p class="text-center">Bạn có chắc chắn xóa sản phẩm này khỏi giỏ hàng?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary cart-btn-no"
                                data-dismiss="modal">Hủy</button>
                            <button type="button" class="btn btn-primary cart-btn-yes" @click="deleteOneItem">Đồng
                                ý</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal" tabindex="-1" id="cart-delete-all">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title font-weight-bold">Xóa tất cả sản phẩm</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p class="text-center">Bạn có chắc chắn xóa tất cả sản phẩm trong giỏ hàng?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary cart-btn-no"
                                data-dismiss="modal">Hủy</button>
                            <button type="button" class="btn btn-primary cart-btn-yes" @click="deleteAllItems">Đồng
                                ý</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>
<script>
import router from '@/router';
import cartService from '@/services/cart.service';
import colorItemService from '@/services/colorItem.service';
import productService from '@/services/product.service';
import $ from "jquery";
import io from "socket.io-client";
import { showSuccessToast, showErrorToast } from '@/components/shared/Toast.vue';
import { isValid } from 'date-fns';
export default {
    data() {
        return {
            products: [],
            cartItems: [],
            colorItems: [],

            totalitems: 0,
            totalprice: 0,

            notEmpty: true,
            cartId: "",

            quantityInStock: 0,
        };
    },

    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        },
        isOutOfStock() {
            return this.cartItems.some(cart => {
                const color = this.colorItems.find(item => item._id === cart.colorItemId);
                const size = color?.sizes.find(s => s._id === cart.sizeId);
                return cart.quantity > (size?.quantity || 0); // Sản phẩm hết hàng nếu số lượng vượt quá tồn kho
            });
        },

        proHidden() {
            return this.cartItems.some(cart => {
                const product = this.products.find(item => item._id === cart.productId);
                return product.hidden == true;
            });
        },

        // isQuantityValid() {
        //     return cart.quantity < 1;
        // },

        isPaymentDisabled() {
            return this.isOutOfStock || this.proHidden;
        },
    },

    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        buyNow() {
            this.$router.push("/");
        },

        goPayment() {
            this.$router.push("/payment");
        },

        checkQuantity(cart, quantity) {
            if (cart.quantity > quantity) {
                showSuccessToast("Số lượng nhập không đúng");
                return;
            }
        },
        async fetchProducts() {
            try {
                this.products = await productService.getAllHidden();
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

        async fetchCartItems() {
            try {
                this.cartItems = await cartService.getAllByUserId(this.getUserId);
                this.totalItems();
                this.totalPrice();
            } catch (error) {
                console.error(error);
            }
        },

        assignCartId(cartId) {
            this.cartId = cartId;
        },

        totalPrice() {
            this.totalprice = 0;
            for (const item of this.cartItems) {
                const pro = this.products.find(item1 => item1._id === item.productId);
                const color = this.colorItems.find(item2 => item2._id === item.colorItemId);
                console.log(color);
                console.log(pro);
                this.totalprice = this.totalprice + (item.quantity * (color.price - (color.price * pro.discount / 100)));
            };
            return this.totalprice;
        },

        totalItems() {
            this.totalitems = 0;
            for (const item of this.cartItems) {
                this.totalitems = this.totalitems + item.quantity;
            };
            return this.totalitems;
        },

        // xóa 1 sản phẩm khỏi giỏ hàng
        async deleteOneItem() {
            try {
                const message = await cartService.deleteOne(this.cartId);
                if (message) {
                    showSuccessToast("Xóa sản phẩm thành công!");
                    $('#cart-delete').modal('hide');
                    this.fetchCartItems();
                }
            } catch (error) {
                console.error(error);
            }
        },

        // Xóa tất cả sản phẩm khỏi giỏ hàng
        async deleteAllItems() {
            try {
                const message = await cartService.deleteAll(this.getUserId);
                if (message) {
                    showErrorToast("Xóa tất cả sản phẩm thành công!")
                    $('#cart-delete-all').modal('hide');
                    this.fetchCartItems();
                }
            } catch (error) {
                console.error(error);
            }
        },

        // cập nhật sản phẩm 
        async updateQuantiy(cartId, cart, quantityInStock) {
            if (cart.quantity < 1) {
                showErrorToast("Số lượng bạn nhập vào không hợp lệ");
                return;
            }
            if (cart.quantity > quantityInStock) {
                showErrorToast("Số lượng bạn cập nhật lớn hơn số lượng hàng còn trong kho")
                return;

                // cart.quantity = quantityInStock;
                // try {
                //     const message = await cartService.update(cartId, cart);
                //     if (message) {
                //         showSuccessToast("Cập nhật số lượng thành công");
                //         this.fetchCartItems();
                //     }
                // } catch (error) {
                //     console.error(error);
                // }
            }
            else {
                try {
                    const message = await cartService.update(cartId, cart);
                    if (message) {
                        showSuccessToast("Bạn đã cập nhật số lượng thành công");
                        this.fetchCartItems();
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        },



        async updateCartData() {
            await this.fetchProducts();
            await this.fetchColorItems();
            await this.fetchCartItems();
            this.totalItems();
            this.totalPrice();
        }
    },

    mounted() {
        const socket = io('http://localhost:3005');

        const handleCartUpdate = async (data) => {
            console.log(data);
            await this.updateCartData();
        };

        socket.on('createCart', async (data) => {
            console.log(data);
            await this.updateCartData();
        });
        socket.on('deleteOneCart', handleCartUpdate);
        socket.on('deleteAllCart', handleCartUpdate);
        socket.on('updateCart', handleCartUpdate);
        socket.on('orderStatus', handleCartUpdate);

        socket.on('createOrder', handleCartUpdate);
        socket.on('updateProduct', handleCartUpdate);

        socket.on('productHidden', handleCartUpdate);

    },

    async created() {
        await this.updateCartData();
    }
}

</script>

<style>
.cart {
    margin-top: 10px;
    width: 80%;
    margin: 0 auto;
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.cart-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-total-items {
    font-size: 20px;
}

.cart-delete-all {
    background: transparent;
    all: unset;
    border-bottom: 2px solid black;
    color: rgb(0, 0, 0);
    margin-bottom: 2px;
}



.cart-icon {
    padding-left: 40px;
}

.cart-divider {
    border: 0.5px solid rgb(172, 172, 172);
    margin-top: 10px;
}

.cart-divider-2 {
    border: 0.1cqb solid black;
}

.cart-input-code {
    height: 40px;
    width: 100%;
    max-width: 70%;
    border-radius: 5px;
    border: 0.5px solid black;
}

.cart-btn-payment {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: black;
    color: white;
}

.cart-btn-payment:hover {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border: 0.5px solid black;
}

.close {
    all: unset;
    font-size: 32px;
    width: 30px;
    height: 30px;
    display: inline-block;
    line-height: 30px;
}

.close:hover {
    color: red;
}

.cart-btn-no {
    background-color: white;
    border: 0.5px solid black;
    color: black;
}

.cart-btn-yes {
    background-color: rgb(0, 0, 0);
    border: 0.5px solid black;
    color: rgb(255, 255, 255);
}

.cart-btn-yes:hover {
    background-color: rgb(255, 255, 255);
    border: 0.5px solid black;
    color: rgb(0, 0, 0);
}

/* Button Mua Ngay */

.btn-cart-now {
    display: flex;
    gap: 50px;
    background-color: black;
    color: white;
    align-items: center;
    border: 0.5px solid black;
}

.cart-icon {
    padding-top: 2px;
}

.btn-cart-now:hover {
    border: 0.5px solid black;
    background-color: white;
    color: rgb(0, 0, 0);
}

.btn-cart-now:hover .cart-icon i {
    color: rgb(255, 0, 43);
}


/* Not-cart */

.not-cart {
    margin-top: 10px;
    width: 80%;
    margin: 0 auto;
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
    padding-left: 100px;
}
</style>