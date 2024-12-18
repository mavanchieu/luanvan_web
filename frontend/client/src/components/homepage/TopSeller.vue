<template>
    <div class="top-seller mb-4">
        <h4 class="coll-title" style="font-family: 'Courier New', Courier, monospace;">TOP 10 SẢN PHẨM BÁN CHẠY NHẤT
        </h4>
        <div class="product-top-seller">
            <div class="product-list-top-seller">
                <template v-for="b in bestSeller" :key="_id">
                    <template v-for="pro in products" :key="pro._id">
                        <template v-if="b.productId == pro._id">
                            <div class="product-image">
                                <div class="product-image-price">
                                    <img :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem._id === b.colorItemId)?.images[0]"
                                        alt="">
                                    <h6 class="product-price">{{ formatPrice(colorItems.find(colorItem =>
                                        colorItem.productId === pro._id)?.price) }} vnd</h6>
                                    <template v-if="favorites.length > 0">
                                        <template v-for="fav in favorites" : key="fav._id">
                                            <template v-if="fav.productId === pro._id">
                                                <button class="product-icon-heart"
                                                    @click="deleteOneFavorite(fav._id)"><i class="fa-solid fa-heart"
                                                        style="color: #ff006f;"></i></button>
                                            </template>
                                        </template>
                                        <template v-if="!favorites.some(fav => fav.productId === pro._id)">
                                            <button class="product-icon-heart" @click="addOneFavorite(pro._id)">
                                                <i class="fa-regular fa-heart"></i>
                                            </button>
                                        </template>
                                    </template>
                                    <template v-if="favorites.length === 0">
                                        <button class="product-icon-heart" @click="addOneFavorite(pro._id)"> <i
                                                class="fa-regular fa-heart "></i></button>
                                    </template>
                                </div>
                                <router-link :to="{ name: 'product/detail', params: { id: pro._id } }"
                                    class="router-link">
                                    <h5 class="product-name">{{ pro.name }} ({{ colorItems.find(colorItem =>
                                        colorItem._id === b.colorItemId)?.name }})</h5>
                                </router-link>
                                <template v-for="brand in brands" :key="brand._id">
                                    <template v-if="brand._id === pro.brandId">
                                        <h6 class="product-brand">{{ brand.name }} </h6>
                                    </template>
                                </template>
                            </div>
                        </template>
                    </template>
                </template>

            </div>
        </div>
    </div class="top-seller">
</template>

<script>
import brandService from '@/services/brand.service';
import colorItemService from '@/services/colorItem.service';
import favoriteService from '@/services/favorite.service';
import orderService from '@/services/order.service';
import productService from '@/services/product.service';
import io from 'socket.io-client';
export default {
    computed: {
        getUserId() {
            return localStorage.getItem('userId');
        }
    },

    data() {
        return {
            products: [],
            colorItems: [],
            brands: [],

            favorites: [],
            favorite: {
                userId: "",
                productId: "",
            },
            bestSeller: [],
            orders: [],
        };
    },

    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        async fecthProducts() {
            try {
                this.products = await productService.getAll();
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
                        const existingPro = this.bestSeller.find(totalfav => totalfav.productId === pro.productId && totalfav.colorItemId === pro.colorItemId);
                        if (existingPro) {
                            existingPro.quantity += pro.quantity;
                        } else {
                            this.bestSeller.push({ 'productId': pro.productId, 'colorItemId': pro.colorItemId, 'quantity': pro.quantity });
                        }
                    }
                }
                this.bestSeller.sort((a, b) => {
                    return b.quantity - a.quantity
                });
                this.bestSeller = this.bestSeller.slice(0, 10);
                console.log("Best", this.bestSeller);
            } catch (error) {
                console.log(error);
            }
        },

        async fetchColorItems() {
            try {
                this.colorItems = await colorItemService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async fetchBrands() {
            try {
                this.brands = await brandService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async fetchFavorites() {
            try {
                this.favorites = await favoriteService.getAll();
                this.favorites = this.favorites.filter(favorite => favorite.userId === this.getUserId);
                console.log("sản phẩm bạn đã yêu thích", this.favorites);
            } catch (error) {
                console.error(error);
            }
        },

        async addOneFavorite(productId) {
            this.favorite.productId = productId;
            this.favorite.userId = this.getUserId;
            try {
                const message = await favoriteService.create(this.favorite);
                if (message) {
                    // alert("Sản phẩm đã được thêm vào mục yêu thích");
                    await this.fetchFavorites();
                    console.log(this.favorites);
                }
            } catch (error) {

            }
        },

        async deleteOneFavorite(id) {
            try {
                const message = await favoriteService.deleteOne(id);
                if (message) {
                    await this.fetchFavorites();
                    console.log(this.favorites);
                }
            } catch (error) {
                console.error(error);
            }
        }
    },

    mounted() {
        const socket = io('http://localhost:3005');

        socket.on('createFavorite', async (data) => {
            console.log(data);
            await this.fecthProducts();
            await this.fetchColtorItems();
            await this.fetchBrands();
            await this.fetchFavorites();
            await this.fetchOrders();
        });

        socket.on('deleteOneFavorite', async (data) => {
            console.log(data);
            await this.fecthProducts();
            await this.fetchColtorItems();
            await this.fetchBrands();
            await this.fetchFavorites();
            await this.fetchOrders();
        });

        socket.on('deteleAllFavorite', async (data) => {
            console.log(data);
            await this.fecthProducts();
            await this.fetchColtorItems();
            await this.fetchBrands();
            await this.fetchFavorites();
            await this.fetchOrders();
        });
    },


    async created() {
        await this.fecthProducts();
        await this.fetchColorItems();
        await this.fetchBrands();
        await this.fetchFavorites();
        await this.fetchOrders();
    }
}
</script>

<style>
/* .product-top-seller{
    max-width: 100%;
    width: 80%;
    margin: 0 auto;
    font-family: 'Courier New', Courier, monospace;
}

.product-list-top-seller{
    display: flex;
    flex-wrap: wrap;
}

.coll-title{
    margin-bottom: 2px;
}

.product-image{
    margin: 0 auto;
    width: 280px;
    height: 330px;
    margin-top: 15px;
    margin-left: 20px;
    
   
}

.product-image-price{
    position: relative ;
   
}

.product-image div img{
    margin: 0 auto;
    width: 278px;
    height: 270px;
    object-fit: contain;
}

.product-price{
    position: absolute;
    bottom: 7px;
    left: 20px;
    background-color: rgb(120, 120, 120);
    color: white ;
    padding: 2px;
}


.product-icon-heart{
    background: transparent;
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
}

.product-name {
    margin-top: 5px;
    font-weight: bold;
    color: black;
}

.product-name:hover{
    text-decoration: none;
}

.product-brand{
    color: gray;
}
.product-image:hover .product-price{
    bottom: 15px;
}

.product-image:hover{
    border: 1px solid black;
}

.product-name, .product-brand{
    margin-left: 20px;
}

.router-link:hover{
    text-decoration: none;
} */
.product-top-seller {
    max-width: 100%;
    width: 80%;
    margin: 0 auto;
    font-family: 'Courier New', Courier, monospace;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 10px;
}

.product-list-top-seller {
    display: inline-flex;
    gap: 20px;
}

.coll-title {
    margin-bottom: 2px;
}

.product-image {
    width: 280px;
    height: 330px;
    margin-top: 15px;
    display: inline-block;
}

.product-image-price {
    position: relative;
}

.product-image div img {
    margin: 0 auto;
    width: 278px;
    height: 270px;
    object-fit: contain;
}

.product-price {
    position: absolute;
    bottom: 7px;
    left: 20px;
    background-color: rgb(120, 120, 120);
    color: white;
    padding: 2px;
}

.product-icon-heart {
    background: transparent;
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
}

.product-name {
    margin-top: 5px;
    font-weight: bold;
    color: black;
}

.product-name:hover {
    text-decoration: none;
}

.product-brand {
    color: gray;
}

.product-image:hover .product-price {
    bottom: 15px;
}

.product-image:hover {
    border: 1px solid black;
}

.product-name,
.product-brand {
    margin-left: 20px;
}

.router-link:hover {
    text-decoration: none;
}

.product-top-seller::-webkit-scrollbar {
    height: 8px;
}

/* Màu nền của track */
.product-top-seller::-webkit-scrollbar-track {
    background: #ffffff;
}

/* Màu của thanh trược */
.product-top-seller::-webkit-scrollbar-thumb {
    background-color: #000000;
    border-radius: 10px;
    border: 2px solid #ffffff;
}

.product-top-seller::-webkit-scrollbar-thumb:hover {
    background-color: #000000;
    cursor: pointer;
}
</style>