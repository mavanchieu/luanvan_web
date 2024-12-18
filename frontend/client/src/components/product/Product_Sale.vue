<template>
    <template v-if="products.length > 0">
        <Filter_Sale :products="products" @filteredProducts="updateProducts" />
        <div class="product">
            <div class="product-list" v-for="pro in products" :key="pro._id">
                <div class="product-image">
                    <div class="product-image-price">
                        <div class="sale-image" @mouseover="hoverImage = pro._id" @mouseleave="hoverImage = null">
                            <img class="img-center" :src="'http://localhost:3005/' + (hoverImage === pro._id
                                ? colorItems.find(colorItem => colorItem.productId === pro._id)?.images[1]
                                : colorItems.find(colorItem => colorItem.productId === pro._id)?.images[0])"
                                alt="product image">
                        </div>

                        <template v-if="colorItems.some(colorItem => colorItem.productId === pro._id)">
                            <h6 class="product-price">{{ formatPrice(colorItems.find(colorItem => colorItem.productId
                                === pro._id)?.price) }} vnd</h6>
                        </template>

                        <template v-if="favorites.length > 0">
                            <template v-for="fav in favorites" : key="fav._id">
                                <template v-if="fav.productId === pro._id">
                                    <button class="product-icon-heart" @click="deleteOneFavorite(fav._id)"><i
                                            class="fa-solid fa-heart" style="color: #ff006f;"></i></button>
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
                    <router-link class="router-link" v-if="pro && pro._id"
                        :to="{ name: 'product/detail', params: { id: pro._id } }">
                        <h5 class="product-name">{{ pro.name }}</h5>
                    </router-link>
                    <template v-for="brand in brands" :key="brand._id">
                        <template v-if="brand._id === pro.brandId">
                            <h6 class="product-brand">{{ brand.name }}</h6>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <div class=" not-product mt-4">
            <h5 class=" font-weight-bold" style="font-family: 'Courier New', Courier, monospace;">Hiện tại cửa hàng của
                chúng tôi không có sản phẩm <b class="text-danger ">SALE</b></h5>
            <h5 class=" font-weight-bold" style="font-family: 'Courier New', Courier, monospace; color: grey">Mong quý
                khách hàng thông cảm</h5>
        </div>
    </template>

</template>
<script>
import colorItemService from '@/services/colorItem.service';
import productService from '@/services/product.service';
import brandService from '@/services/brand.service';
import favoriteService from '@/services/favorite.service';
import Filter_Sale from './Filter_Sale.vue';
import io from 'socket.io-client';
export default {
    components: {
        Filter_Sale,
    },

    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    data() {
        return {
            genderId: "",
            typeDetailId: "",
            name: "",
            products: [],
            colorItems: [],
            brands: [],
            favorites: [],
            favorite: {
                userId: "",
                productId: "",
                date: "",
            },
            hoverImage: null,
        };
    },

    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },
        async fetchProducts() {
            try {
                this.products = await productService.getAll();
                this.products = this.products.filter(pro => pro.discount !== 0);
            } catch (error) {
                console.error(error);
            }
        },

        updateProducts(filteredProducts) {
            this.products = filteredProducts;
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
                console.log(this.favorites);

            } catch (error) {
                console.error(error);
            }
        },

        async addOneFavorite(productId) {
            this.favorite.productId = productId;
            this.favorite.userId = this.getUserId;
            const now = new Date();
            const vietnamTime = new Date(now.getTime() + (7 * 60 * 60 * 1000)); // Cộng 7 giờ vào giờ UTC
            const formattedDate = vietnamTime.toISOString().slice(0, 19).replace('T', ' ');
            this.favorite.date = formattedDate;
            try {
                const message = await favoriteService.create(this.favorite);
                if (message) {
                    this.fetchFavorites();
                    console.log(this.favorites);
                }
            } catch (error) {

            }
        },

        async deleteOneFavorite(id) {
            try {
                const message = await favoriteService.deleteOne(id);
                if (message) {
                    this.fetchFavorites();
                    console.log(this.favorites);
                }
            } catch (error) {
                console.error(error);
            }
        }
    },

    mounted() {
        const socket = io('http://localhost:3005');

        socket.on('productHidden', (data) => {
            console.log('Sản phẩm đã bị ẩn:', data.productId);
            this.fetchProducts();
        });

        socket.on('createFavorite', async (data) => {
            console.log(data);
            await this.fetchProducts();
            await this.fetchColorItems();
            await this.fetchBrands();
            await this.fetchFavorites();
        });

        socket.on('deleteOneFavorite', async (data) => {
            await this.fetchProducts();
            await this.fetchColorItems();
            await this.fetchBrands();
            await this.fetchFavorites();
        });

        socket.on('deleteOneFavorite', async (data) => {
            console.log(data);
            await this.fetchProducts();
            await this.fetchColorItems();
            await this.fetchBrands();
            await this.fetchFavorites();;
        });
    },

    async created() {
        this.genderId = this.$route.query.genderId;
        this.typeDetailId = this.$route.query.typeDetailId;
        this.name = this.$route.query.name;

        await this.fetchProducts();
        await this.fetchColorItems();
        await this.fetchBrands();
        await this.fetchFavorites();
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler(newQuery) {
                this.genderId = newQuery.genderId;
                this.typeDetailId = newQuery.typeDetailId;
                this.name = newQuery.name;
                this.fetchProducts();
            }
        }
    }
}
</script>
<style>
.product {
    font-family: 'Courier New', Courier, monospace;
    padding-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 70%;
    margin: 0 auto;
}

.not-product {
    width: 80%;
    margin: 0 auto;
    padding-top: 10px;
}

.router-link {
    text-decoration: none;
    color: black;
}

.router-link:hover {
    text-decoration: none;
    color: black;
}

.product-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px;
}


.product-space {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}

.product-category-name {
    font-size: 28px;
    font-weight: bold;
    font-style: italic;
}

.product-image {
    margin: 0 auto;
    width: 280px;
    height: 330px;
    margin-top: 15px;
    margin-left: 20px;
    object-fit: contain;
}

.product-image-price {
    position: relative;
}

.product-image div img {
    margin: 0 auto;
    width: 278px;
    height: 270px;
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

.img-center {
    object-fit: contain;
}

.product-name {
    margin-top: 5px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
}

.sale-image img {
    transition: transform 0.3s ease-in-out;
}

.sale-image:hover img {
    transform: scale(1.05);
}
</style>