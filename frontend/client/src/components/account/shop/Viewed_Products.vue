<template>
    <div class="viewed-product">
        <div class="viewed-product-list" v-for="pro in products" :key="pro._id">
            <div class="viewed-product-image">
                <div class="viewed-product-image-price">
                    <template v-if="colorItems.some(colorItem => colorItem.productId === pro._id)">
                        <img class="img-center"
                            :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem.productId === pro._id)?.images[0]"
                            alt="">
                    </template>
                    <template v-if="colorItems.some(colorItem => colorItem.productId === pro._id)">
                        <h6 class="viewed-product-price">{{ formatPrice(colorItems.find(colorItem => colorItem.productId
                            === pro._id)?.price) }} vnd</h6>
                    </template>
                    <template v-if="favorites.length > 0">
                        <template v-for="fav in favorites" : key="fav._id">
                            <template v-if="fav.productId === pro._id">
                                <button class="viewed-product-icon-heart" @click="deleteOneFavorite(fav._id)"><i
                                        class="fa-solid fa-heart" style="color: #ff006f;"></i></button>
                            </template>
                        </template>
                        <template v-if="!favorites.some(fav => fav.productId === pro._id)">

                            <button class="viewed-product-icon-heart" @click="addOneFavorite(pro._id)">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                        </template>
                    </template>
                    <template v-if="favorites.length === 0">
                        <button class="viewed-product-icon-heart" @click="addOneFavorite(pro._id)"> <i
                                class="fa-regular fa-heart "></i></button>
                    </template>

                </div>
                <router-link class="router-link" v-if="pro && pro._id"
                    :to="{ name: 'product/detail', params: { id: pro._id } }">
                    <h5 class="viewed-product-name">{{ pro.name }}</h5>
                </router-link>
                <template v-for="brand in brands" :key="brand._id">
                    <template v-if="brand._id === pro.brandId">
                        <h6 class="viewed-product-brand">{{ brand.name }}</h6>
                    </template>
                </template>

            </div>
        </div>
    </div>
</template>

<script>
import viewed_productsService from '@/services/viewed_products.service';
import colorItemService from '@/services/colorItem.service';
import productService from '@/services/product.service';
import brandService from '@/services/brand.service';
import favoriteService from '@/services/favorite.service';

export default {
    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    data() {
        return {
            products: [],
            colorItems: [],
            viewedPrroducts: [],
            brands: [],
            favorites: [],
            favorite: {
                userId: "",
                productId: "",
                date: "",
            }
        };
    },

    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        async fetchViewedProducts() {
            try {
                this.viewedPrroducts = await viewed_productsService.getFindByUserId(this.getUserId);
            } catch (error) {
                console.error(error);
            }
        },

        async fetchProducts() {
            this.fetchViewedProducts();
            try {
                this.products = await productService.getAll();
                this.products = this.products.filter(pro => this.viewedPrroducts.some(viewedPro => viewedPro.productId === pro._id));
                console.log("Sản phẩm", this.products);
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

        async fetchFavorites() {
            try {
                this.favorites = await favoriteService.getAll();
                this.favorites = this.favorites.filter(favorite => favorite.userId === this.getUserId);
                console.log("Sản phẩm yêu thích", this.favorites);
            } catch (error) {
                console.error(error);
            }
        },

        async addOneFavorite(productId) {
            this.favorite.productId = productId;
            this.favorite.userId = this.getUserId;
            const now = new Date();
            const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
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
        },
    },

    async mounted() {
        await this.fetchViewedProducts();
        await this.fetchFavorites();
        await this.fetchProducts();
        await this.fetchColorItems();
        await this.fetchBrands();
    }
}
</script>

<style>
.viewed-product {
    max-width: 100%;
    width: 100%;
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 auto;
}



.viewed-product-space {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}

.viewed-product-category-name {
    font-size: 30px;
    font-weight: bold;
    font-style: italic;
}

.viewed-product-list {
    display: flex;
    flex-wrap: wrap;
}

.viewed-product-image {
    margin: 0 auto;
    width: 280px;
    height: 330px;
    margin-top: 15px;
    margin-left: 20px;
    object-fit: contain;

}

.viewed-product-image-price {
    position: relative;

}

.viewed-product-image div img {
    margin-top: 10px;
    margin: 0 auto;
    width: 278px;
    height: 270px;
    object-fit: contain;
}

.viewed-product-price {
    position: absolute;
    bottom: 7px;
    left: 20px;
    background-color: rgb(120, 120, 120);
    color: white;
    padding: 2px;
}


.viewed-product-icon-heart {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: transparent;

}

.viewed-product-name {
    margin-top: 5px;
    font-weight: bold;
}

.viewed-product-brand {
    color: gray;
}

.viewed-product-image:hover .viewed-product-price {
    bottom: 15px;
}

.viewed-product-image:hover {
    border: 1px solid black;
}


.viewed-product-name,
.viewed-product-brand {
    margin-left: 20px;
}

.viewed-product-name {
    margin-top: 5px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
}


.router-link {
    color: black;
}

.router-link:hover {
    color: black;
}
</style>