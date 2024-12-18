<template>
    <template v-if="products.length > 0">
        <Filter_Search :products="products" @filteredProducts="updateProducts" />
        <h5 class="font-weight-bold"
            style="padding-top: 50px; font-family: 'Courier New', Courier, monospace; width: 70%; margin: 0 auto;">Tất
            cả sản phẩm</h5>
        <div class="search-product">

            <div class="search-product-list" v-for="pro in products" :key="pro._id">
                <div class="search-product-image">
                    <div class="search-product-image-price">
                        <template v-if="colorItems.some(colorItem => colorItem.productId === pro._id)">
                            <img style="object-fit: contain;" class="img-center"
                                :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem.productId === pro._id)?.images[0]"
                                alt="">
                        </template>
                        <template v-if="colorItems.some(colorItem => colorItem.productId === pro._id)">
                            <h6 class="search-product-price">{{ formatPrice(colorItems.find(colorItem =>
                                colorItem.productId === pro._id)?.price) }} vnd</h6>
                        </template>
                        <template v-if="favorites.length > 0">
                            <template v-for="fav in favorites" : key="fav._id">
                                <template v-if="fav.productId === pro._id">
                                    <button class="search-product-icon-heart" @click="deleteOneFavorite(fav._id)"><i
                                            class="fa-solid fa-heart" style="color: #ff006f;"></i></button>
                                </template>
                            </template>
                            <template v-if="!favorites.some(fav => fav.productId === pro._id)">
                                <button class="search-product-icon-heart" @click="addOneFavorite(pro._id)">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                            </template>
                        </template>
                        <template v-if="favorites.length === 0">
                            <button class="search-product-icon-heart" @click="addOneFavorite(pro._id)"> <i
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
        <div class="search-not-product d-flex" v-if="products.length === 0">
            <h5 class=" font-weight-bold" style="font-family: 'Courier New', Courier, monospace;">Hiện tại cửa hàng của
                chúng tôi không có sản phẩm cho tìm kiếm <span class="text-danger font-weight-bold"> "{{ searchName
                    }}"</span></h5>
            <h6 class="" style="font-family: 'Courier New', Courier, monospace;">Khách hàng vui lòng tìm kiếm sản phẩm
                tương tự</h6>
        </div>
    </template>
</template>

<script>
import brandService from '@/services/brand.service';
import colorItemService from '@/services/colorItem.service';
import productService from '@/services/product.service';
import Filter_Search from '../product/Filter_Search.vue';
import favoriteService from '@/services/favorite.service';
import io from 'socket.io-client';

export default {
    components: {
        Filter_Search,
    },

    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    data() {
        return {
            searchName: "",
            products: [],
            colorItems: [],
            brands: [],
            favorites: [],
            favorite: {
                userId: "",
                productId: "",
                date: "",
            }
        }
    },

    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        async fetchProducts() {
            try {
                this.products = await productService.getAll();
                this.products = this.products.filter(pro => pro.name.toLowerCase().includes(this.searchName));
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

        async fetchBrands() {
            try {
                this.brands = await brandService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        updateProducts(filteredProducts) {
            this.products = filteredProducts;
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
                    console.log(this.favorites);
                }
            } catch (error) {

            }
        },

        async deleteOneFavorite(id) {
            try {
                const message = await favoriteService.deleteOne(id);
                if (message) {
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
            await this.fetchFavorites();
        });

        socket.on('deleteOneFavorite', async (data) => {
            await this.fetchFavorites();
        });
    },

    async created() {
        await this.fetchProducts();
        await this.fetchBrands();
        await this.fetchColorItems();
        await this.fetchFavorites();
    },

    watch: {
        '$route.query': {
            immediate: true,
            handler(newQuery) {
                this.searchName = newQuery.search;
                this.fetchProducts();
            }
        }
    }

}
</script>

<style scoped>
.search-product {
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 70%;
    margin: 0 auto;
}

.search-not-product {
    font-family: 'Courier New', Courier, monospace;
    padding-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 80%;
    margin: 0 auto;
}

.router-link {
    text-decoration: none;
    color: black;
}

.router-link:hover {
    text-decoration: none;
    color: black;
}

.search-product-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px;
}


.search-product-space {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}

.search-product-category-name {
    font-size: 28px;
    font-weight: bold;
    font-style: italic;
}

.search-product-image {
    margin: 0 auto;
    width: 280px;
    height: 330px;
    margin-top: 15px;
    margin-left: 20px;
    object-fit: contain;
}

.search-product-image-price {
    position: relative;

}

.search-product-image div img {
    margin: 0 auto;
    width: 278px;
    height: 270px;
}

.search-product-price {
    position: absolute;
    bottom: 7px;
    left: 20px;
    background-color: rgb(120, 120, 120);
    color: white;
    padding: 2px;
}


.search-product-icon-heart {
    background: transparent;
    border: none;
    position: absolute;
    top: 10px;
    right: 10px;
}

.search-product-name {
    margin-top: 5px;
    font-weight: bold;
}

.search-product-brand {
    color: gray;
}

.search-product-image:hover .search-product-price {
    bottom: 15px;
}

.search-product-image:hover {
    border: 1px solid black;
}


.search-product-name,
.search-product-brand {
    margin-left: 20px;
}
</style>