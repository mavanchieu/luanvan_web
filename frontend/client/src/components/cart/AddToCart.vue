<template>
    <template v-if="getUserId">
        <template v-if="quantityInStock != 0">
            <p class="mt-4">
                <button class="btn btn-add-to-cart" @click="addToCart">Thêm vào giỏ hàng</button>
            </p>
        </template>
        <template v-if="quantityInStock === 0">
            <p class="mt-4">
                <button class="btn btn-add-to-cart" disabled @click="addToCart">Thêm vào giỏ hàng</button>
            </p>
        </template>
    </template>
    <template v-if="!getUserId">
        <p class="mt-4">
            <button class="btn btn-add-to-cart" disabled data-toggle="tooltip" data-placement="top"
                title="Vui lòng đăng nhập">
                Thêm vào giỏ hàng
            </button>
        </p>
    </template>
</template>

<script>
import cartService from '@/services/cart.service';

export default {

    props: {
        cartItem: {
            type: Object,
            require: true,
        },
        quantityInStock: {
            type: Number,
            require: true,
        }
    },

    emits: ['buy-now', 'add-to-cart'],

    data() {
        return {
            cartItems: [],
        };
    },

    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    data() {
        return {
        };
    },

    methods: {
        async fetchCartItems() {
            try {
                this.cartItems = await cartService.getAll();
                this.cartItems = this.cartItems.filter(item => item.userId === this.getUserId);
            } catch (error) {
                console.error(error);
            }
        },

        buyNow() {
            this.cartItem.userId = this.getUserId;
            this.$emit('buy-now', this.cartItem);
        },

        async addToCart() {
            await this.fetchCartItems();
            this.cartItem.userId = this.getUserId;
            const notEmpty = this.cartItems.find(item => item.colorItemId === this.cartItem.colorItemId && item.sizeId === this.cartItem.sizeId);

            // update quantity
            if (notEmpty) {
                const index1 = 0;
                // console.log(index1);
                this.cartItem.id = notEmpty._id;
                this.cartItem.quantity = notEmpty.quantity;
                console.log(this.cartItem.quantity);
                this.$emit('add-to-cart', this.cartItem, index1);
            }
            if (!notEmpty) {
                const index2 = 1;
                // console.log(index2);
                this.$emit('add-to-cart', this.cartItem, index2);
            }

        }
    },

    async mounted() {
        await this.fetchCartItems();
        console.log(this.$props.quantityInStock);
        console.log(this.cartItem);
    },
}
</script>

<style>
.btn-buynow {
    background-color: white;
    border: 0.5px solid black;
    color: rgb(0, 0, 0);
}

.btn-buynow:hover {
    background-color: rgb(0, 136, 70);
    border: 0.5px solid rgb(0, 74, 29);
    color: rgb(255, 255, 255);
}

.btn-add-to-cart {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
}

.btn-add-to-cart:hover {
    background-color: rgb(0, 87, 48);
    color: rgb(255, 255, 255);
}
</style>
