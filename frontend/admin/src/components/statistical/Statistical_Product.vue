<template>
    <div class="statis-pro mt-4">
        <h5 class="ml-4" style="font-style: italic;">Liên quan đến sản phẩn</h5>
        <div class="d-flex justify-content-end align-items-center" style="margin-right: 55px;">
            <form action="" @submit.prevent="statisProducts">
                <span>Từ <input type="date" v-model="fromDate"></span>
                <span class="ml-2">Đến <input type="date" v-model="toDate"></span>
                <span class="ml-2"><button type="submit" class="btn btn-dark">Chọn</button></span>
            </form>
        </div>
        <div class="row ml-2 mt-4 statis-pro">
            <div class="col-4 text-center">
                <h5 class="section-title">Top 10 sản phẩm được xem nhiều nhất</h5>
                <template v-for="tPro in totalViewedProducts">
                    <template v-for="pro in products">
                        <template v-if="tPro.productId === pro._id">
                            <div class="product-card">
                                <template v-if="colorItems.some(colorItem => colorItem.productId === tPro.productId)">
                                    <img class="product-image"
                                        :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem.productId === pro._id)?.images[0]"
                                        alt="Product image">
                                </template>
                                <h5 class="product-name">
                                    <router-link :to="{ name: 'product_detail', params: { id: pro._id } }"
                                        class="product-link">
                                        {{ pro.name }}
                                    </router-link>
                                </h5>
                                <template v-if="colorItems.some(colorItem => colorItem.productId === pro._id)">
                                    <h6 class="product-price">{{ colorItems.find(colorItem => colorItem.productId ===
                                        pro._id)?.price }} VND</h6>
                                </template>
                                <h6 class="product-likes">
                                    Số lượt yêu thích: <span class="likes-count">{{ tPro.quantity }}</span>
                                </h6>
                            </div>
                        </template>
                    </template>
                </template>
            </div>

            <div class="col-4 text-center">
                <h5 class="section-title">Top 10 sản phẩm được yêu thích nhất</h5>
                <template v-for="fav in totalFavorites">
                    <template v-for="pro in products">
                        <template v-if="fav.productId === pro._id">
                            <div class="product-card">
                                <template v-if="colorItems.some(colorItem => colorItem.productId === fav.productId)">
                                    <img class="product-image"
                                        :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem.productId === pro._id)?.images[0]"
                                        alt="Product image">
                                </template>
                                <h5 class="product-name">
                                    <router-link :to="{ name: 'product_detail', params: { id: pro._id } }"
                                        class="product-link">
                                        {{ pro.name }}
                                    </router-link>
                                </h5>
                                <template v-if="colorItems.some(colorItem => colorItem.productId === pro._id)">
                                    <h6 class="product-price">{{ colorItems.find(colorItem => colorItem.productId ===
                                        pro._id)?.price }} VND</h6>
                                </template>
                                <h6 class="product-likes">
                                    Số lượt yêu thích: <span class="likes-count">{{ fav.quantity }}</span>
                                </h6>
                            </div>
                        </template>
                    </template>
                </template>
            </div>
            <div class="col-4">
                <h5 class="text-center text-success font-weight-bold">Top 10 sản phẩm được bán ra nhiều nhất</h5>
                <template v-for="fav in totalProducts">
                    <template v-for="pro in products">
                        <template v-if="fav.productId === pro._id">
                            <div class="product-card">
                                <template v-if="colorItems.some(colorItem => colorItem._id === fav.colorItemId)">
                                    <img class="product-image"
                                        :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem._id === fav.colorItemId)?.images[0]"
                                        alt="Product image">
                                </template>
                                <h5 class="product-name">
                                    <router-link :to="{ name: 'product_detail', params: { id: pro._id } }"
                                        class="product-link">
                                        {{ pro.name }}
                                    </router-link>
                                </h5>
                                <template v-if="colorItems.some(colorItem => colorItem.productId === pro._id)">
                                    <h6 class="product-price">{{ colorItems.find(colorItem => colorItem.productId ===
                                        pro._id)?.price }} VND</h6>
                                </template>
                                <p class="product-color "><strong>Màu sắc: {{ colorItems.find(colorItem => colorItem._id
                                    ===
                                    fav.colorItemId)?.name }}</strong>
                                    <span>
                                        <p
                                            :style="{ backgroundColor: colorItems.find(colorItem => colorItem._id === fav.colorItemId)?.color, width: '50px', height: '30px', borderRadius: '20px', border: '1px solid black' }">
                                        </p>
                                    </span>
                                </p>
                                <h6 class="product-likes">
                                    Số sản phẩm bán ra: <span class="likes-count">{{ fav.quantity }}</span>
                                </h6>
                            </div>
                        </template>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import colorItemService from '@/services/colorItem.service';
import favoriteService from '@/services/favorite.service';
import orderService from '@/services/order.service';
import productService from '@/services/product.service';
import viewed_productsService from '@/services/viewed_products.service';
import { get } from 'jquery';
import { showErrorToast } from '../shared/Toast_Notification.vue';

export default {
    data() {
        return {
            products: [],
            colorItems: [],
            favorites: [],
            viewedProducts: [],
            totalViewedProducts: [],
            totalFavorites: [],

            fromDate: "",
            toDate: "",

            orders: [],
            totalProducts: [], // sản phẩm bán ra
        };
    },

    methods: {
        async fetchProducts() {
            try {
                this.products = await productService.getAll();
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

        async fetchOrders() {
            try {
                this.orders = await orderService.getAll();
                this.orders = this.orders.filter(order => order.status == '2');
                for (const order of this.orders) {
                    for (const pro of order.products) {
                        const existingPro = this.totalProducts.find(totalfav => totalfav.productId === pro.productId && totalfav.colorItemId === pro.colorItemId);
                        if (existingPro) {
                            existingPro.quantity += pro.quantity;
                        } else {
                            this.totalProducts.push({ 'productId': pro.productId, 'colorItemId': pro.colorItemId, 'quantity': pro.quantity });
                        }
                    }
                }
                this.totalProducts.sort((a, b) => {
                    return b.quantity - a.quantity
                });
                this.totalProducts = this.totalProducts.slice(0, 10);
                console.log(this.totalProducts);
            } catch (error) {

            }
        },

        async fetchViewedProducts() {
            try {
                this.viewedProducts = await viewed_productsService.getAll();
                for (const fav of this.viewedProducts) {
                    const existingFav = this.totalViewedProducts.find(totalfav => totalfav.productId === fav.productId);
                    if (existingFav) {
                        existingFav.quantity += 1;
                    } else {
                        this.totalViewedProducts.push({ 'productId': fav.productId, 'quantity': 1 });
                    }
                }
                this.totalViewedProducts.sort((a, b) => {
                    return b.quantity - a.quantity
                });
                this.totalViewedProducts = this.totalViewedProducts.slice(0, 10);
            } catch (error) {
                console.log(error);
            }
        },

        async fetchFavorites() {
            try {
                this.favorites = await favoriteService.getAll();
                for (const fav of this.favorites) {
                    const existingFav = this.totalFavorites.find(totalfav => totalfav.productId === fav.productId);
                    if (existingFav) {
                        existingFav.quantity += 1;
                    } else {
                        this.totalFavorites.push({ 'productId': fav.productId, 'quantity': 1 });
                    }
                }
                this.totalFavorites.sort((a, b) => {
                    return b.quantity - a.quantity
                });
                this.totalFavorites = this.totalFavorites.slice(0, 10);
                console.log(this.favorites);
                console.log(this.totalFavorites);
            } catch (error) {
                console.error(error);
            }
        },

        async statisProducts() {
            const date = new Date();
            const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            const currentDate = offsetDate.toISOString().split('T')[0];
            console.log(currentDate);
            // console.log(formattedDate);
            // console.log(currentDate);
            // const fromDate = new Date(this.fromDate);

            // const toDate = new Date(this.toDate);
            console.log(currentDate);
            if (this.fromDate && this.toDate && this.toDate < this.fromDate) {
                showErrorToast("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
                return;
            }
            if (this.toDate > currentDate || this.fromDate > currentDate) {
                showErrorToast("Vui lòng kiểm tra lại ngày thống kê");
                return;
            }
            await this.fetchViewedProducts();
            this.totalViewedProducts = [];
            this.viewedProducts = this.viewedProducts.filter(pro => pro.date.split(' ')[0] >= this.fromDate && pro.date.split(' ')[0] <= this.toDate);
            for (const fav of this.viewedProducts) {
                const existingFav = this.totalViewedProducts.find(totalfav => totalfav.productId === fav.productId);
                if (existingFav) {
                    existingFav.quantity += 1;
                } else {
                    this.totalViewedProducts.push({ 'productId': fav.productId, 'quantity': 1 });
                }
            }
            this.totalViewedProducts.sort((a, b) => {
                return b.quantity - a.quantity
            });
            this.totalViewedProducts = this.totalViewedProducts.slice(0, 10);

            await this.fetchFavorites();
            this.totalFavorites = [];
            this.favorites = this.favorites.filter(pro => pro.date.split(' ')[0] >= this.fromDate && pro.date.split(' ')[0] <= this.toDate);
            for (const fav of this.favorites) {
                const existingFav = this.totalFavorites.find(totalfav => totalfav.productId === fav.productId);
                if (existingFav) {
                    existingFav.quantity += 1;
                } else {
                    this.totalFavorites.push({ 'productId': fav.productId, 'quantity': 1 });
                }
            }
            this.totalFavorites.sort((a, b) => {
                return b.quantity - a.quantity
            });
            this.totalFavorites = this.totalFavorites.slice(0, 10);

            await this.fetchOrders();
            this.totalProducts = [];
            this.orders = await orderService.getAll();
            this.orders = this.orders.filter(order => order.status == '2' && order.toDate >= this.fromDate && order.toDate <= this.toDate);
            for (const order of this.orders) {
                for (const pro of order.products) {
                    const existingPro = this.totalProducts.find(totalfav => totalfav.productId === pro.productId && totalfav.colorItemId === pro.colorItemId);
                    if (existingPro) {
                        existingPro.quantity += pro.quantity;
                    } else {
                        this.totalProducts.push({ 'productId': pro.productId, 'colorItemId': pro.colorItemId, 'quantity': pro.quantity });
                    }
                }
            }
            this.totalProducts.sort((a, b) => {
                return b.quantity - a.quantity
            });
            this.totalProducts = this.totalProducts.slice(0, 10);
        }
    },

    async mounted() {
        await this.fetchColorItems();
        await this.fetchProducts();
        await this.fetchFavorites();
        await this.fetchOrders();
        await this.fetchViewedProducts();
    },
}
</script>

<style>
.statis-pro {
    font-family: 'Courier New', Courier, monospace;
}

.statis-pro-router-link:hover {
    text-decoration: none;
}

.statis-pro {
    background-color: white;
    margin: 10px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.section-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-top: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}


.product-image {
    width: 170px;
    height: 180px;
    object-fit: contain;
    display: block;
    margin: 0 auto 10px;
}


.product-name {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
    text-align: left;
    margin-left: 15px;
}

.product-color {
    margin-left: 15px;
}


.product-price {
    font-size: 1rem;
    color: #e74c3c;
    text-align: left;
    margin-left: 15px;
    font-weight: 600;
}


.product-likes {
    font-size: 1rem;
    color: #555;
    text-align: left;
    margin-left: 15px;
}

.likes-count {
    color: #e74c3c;
    font-weight: bold;
}

.product-link {
    text-decoration: none;
    color: inherit;
}

.product-link:hover {
    color: #3498db;
    text-decoration: underline;
}
</style>