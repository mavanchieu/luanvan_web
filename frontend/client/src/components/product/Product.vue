<template>
    <template v-if="products.length > 0">
        <Filter_Brand :name="name" :products="products" @filteredProducts="updateProducts" />
        <div class="product">
            <div class="product-list" v-for="pro in paginatedProducts" :key="pro._id">
                <div class="product-image">
                    <div class="product-image-price">
                        <div class="image" @mouseover="hoverImage = pro._id" @mouseleave="hoverImage = null">
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
        <div class="pagination">
            <button :disabled="currentPage === 1" @click="currentPage--">
                Trước
            </button>

            <button v-for="page in visiblePages" :key="page" :class="{ active: page === currentPage }"
                @click="page !== '...' && (currentPage = page)">
                {{ page }}
            </button>

            <button :disabled="currentPage === totalPages" @click="currentPage++">
                Sau
            </button>
        </div>

    </template>

    <template v-else>
        <div class=" not-product mt-4">
            <h5 class=" font-weight-bold" style="font-family: 'Courier New', Courier, monospace;">Hiện tại cửa hàng của
                chúng tôi không có sản phẩm cho loại này</h5>
            <h5 class=" font-weight-bold" style="font-family: 'Courier New', Courier, monospace; color: grey">Mong quý
                khách hàng thông cảm</h5>
        </div>
    </template>

</template>
<script>
import colorItemService from '@/services/colorItem.service';
import Filter_Brand from './Filter_Brand.vue';
import productService from '@/services/product.service';
import brandService from '@/services/brand.service';
import favoriteService from '@/services/favorite.service';
import io from 'socket.io-client';
export default {
    components: {
        Filter_Brand,
    },

    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        },

        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.products.slice(start, end);
        },

        visiblePages() {
            const pages = [];
            const total = this.totalPages;
            const current = this.currentPage;

            if (total <= 5) {
                // Nếu tổng số trang <= 5, hiển thị tất cả
                for (let i = 1; i <= total; i++) pages.push(i);
            } else {
                // Hiển thị 1, ..., [current - 1, current, current + 1], ..., last
                if (current > 3) pages.push(1, '...');
                for (let i = Math.max(1, current - 1); i <= Math.min(total, current + 1); i++) pages.push(i);
                if (current < total - 2) pages.push('...', total);
            }

            return pages;
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

            currentPage: 1,
            itemsPerPage: 10,
            totalPages: 0,
        };
    },

    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        async fetchProducts() {
            try {
                this.products = await productService.getAll();
                this.products = this.products.filter(product => product.genderId == this.genderId && product.typeDetailsId === this.typeDetailId);
                this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
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

        socket.on('deleteOneFavorite', async (data) => {
            console.log(data);
            await this.fetchFavorites();
        });

        socket.on('createProduct', async (data) => {
            console.log(data);
            await this.fetchProducts();
            await this.fetchColorItems();
            await this.fetchBrands();
            await this.fetchFavorites();
        })
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
                this.fetchProducts(); // Gọi lại hàm khi có thay đổi
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
    width: 70%;
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

.product-image-price .image {

    transition: transform 0.3s ease-in-out;
}

.product-image-price .image:hover img {
    transform: scale(1.05);
}

/* Phân trang */
.pagination {
    width: 80%;
    display: flex;
    justify-content: end;
    font-family: 'Courier New', Courier, monospace;
}

.pagination button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: white;
    cursor: pointer;
}

.pagination button.active {
    background-color: black;
    color: white;
}

.pagination button:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
}

.pagination button[disabled] {
    cursor: not-allowed;
}

.pagination button {
    min-width: 30px;
}

.pagination button:hover:not(.active):not(:disabled) {
    background-color: #f0f0f0;
}
</style>