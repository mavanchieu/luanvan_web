<template>
    <template v-if="products.length === 0">
        <div class="not-favorite">
            <p>
            <h5 class="font-weight-bold">DANH SÁCH SẢN PHẨM YÊU THÍCH</h5>
            </p>
            <div>
                <h5>Hiện tại không có sản phẩm yêu thích nào</h5>
                <button class="btn-favorite-now" @click="goFavorite">Yêu Thích Ngay<span class="favorite-icon"><i
                            class="fa-regular fa-heart"></i></span></button>
            </div>
        </div>
    </template>
    <template v-if="products.length > 0">
        <div class="favorite fav-fixed">
            <span class="font-weight-bold">DANH SÁCH SẢN PHẨM YÊU THÍCH</span>
            <button data-toggle="modal" class="fav-delete-all" data-target="#modal-fav-delete-all">
                <h6 class="font-weight-bold">BỎ YÊU THÍCH TẤT CẢ</h6>
            </button>
        </div>
        <div class="fav">
            <div class="fav-list" v-for="pro in products" :key="pro._id">
                <div class="fav-image">
                    <div class="fav-image-price">
                        <div class="fav-image-2" @mouseover="hoverImage = pro._id" @mouseleave="hoverImage = null">
                            <img class="img-center" :src="'http://localhost:3005/' + (hoverImage === pro._id
                                ? colorItems.find(colorItem => colorItem.productId === pro._id)?.images[1]
                                : colorItems.find(colorItem => colorItem.productId === pro._id)?.images[0])"
                                alt="product image">
                        </div>
                        <template v-if="colorItems.some(colorItem => colorItem.productId === pro._id)">
                            <h6 class="fav-price">{{ colorItems.find(colorItem => colorItem.productId ===
                                pro._id)?.price }} vnd</h6>
                        </template>

                        <template v-if="favorites.length > 0">
                            <template v-for="fav in favorites" : key="fav._id">
                                <template v-if="fav.productId === pro._id">
                                    <button class="fav-icon-heart" @click="deleteOneFavorite(fav._id)"><i
                                            class="fa-solid fa-heart" style="color: #ff006f;"></i></button>
                                </template>
                            </template>
                            <template v-if="!favorites.some(fav => fav.productId === pro._id)">
                                <button class="fav-icon-heart" @click="addOneFavorite(pro._id)">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                            </template>
                        </template>
                        <template v-if="favorites.length === 0">
                            <button class="fav-icon-heart" @click="addOneFavorite(pro._id)"> <i
                                    class="fa-regular fa-heart "></i></button>
                        </template>
                    </div>
                    <router-link class="router-link" v-if="pro && pro._id"
                        :to="{ name: 'product/detail', params: { id: pro._id } }">
                        <h5 class="fav-name">{{ pro.name }}</h5>
                    </router-link>
                    <template v-for="brand in brands" :key="brand._id">
                        <template v-if="brand._id === pro.brandId">
                            <h6 class="fav-brand">{{ brand.name }}</h6>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </template>
    <div class="modal" tabindex="-1" id="modal-fav-delete-all">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <p>
                    <h5 class="text-center font-weight-bold">Bạn có chắc chắn bỏ yêu thích tất cả?</h5>
                    </p>
                </div>
                <div class="modal-footer modal-footer-fav">
                    <button type="button" class="btn btn-secondary fav-btn-no" data-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary fav-btn-yes" @click="deleteAllFavorites">Đồng
                        ý</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import colorItemService from '@/services/colorItem.service';
import productService from '@/services/product.service';
import brandService from '@/services/brand.service';
import favoriteService from '@/services/favorite.service';
import $ from 'jquery';
import io from 'socket.io-client';

export default {

    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    data() {
        return {
            colorItems: [],
            products: [],
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
        goFavorite() {
            this.$router.push("/");
        },

        async fetchProducts() {
            this.fetchFavorites();
            try {
                this.products = await productService.getAll();
                this.products = this.products.filter(pro => this.favorites.some(fav => fav.productId === pro._id));
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
            } catch (error) {
                console.error(error);
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
        },

        async deleteAllFavorites() {
            try {
                const message = await favoriteService.deleteAllFavorites(this.getUserId);
                if (message) {
                    $('#modal-fav-delete-all').modal('hide');
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
            await this.fetchFavorites();
            await this.fetchProducts();
            await this.fetchColorItems();
            await this.fetchBrands();
        });

        socket.on('deleteOneFavorite', async (data) => {
            console.log(data);
            await this.fetchFavorites();
            await this.fetchProducts();
            await this.fetchColorItems();
            await this.fetchBrands();
        });

        socket.on('deleteAllFavorite', async (data) => {
            console.log(data);
            await this.fetchFavorites();
            await this.fetchProducts();
            await this.fetchColorItems();
            await this.fetchBrands();
        });
    },

    async created() {
        await this.fetchFavorites();
        await this.fetchProducts();
        await this.fetchColorItems();
        await this.fetchBrands();
    }
}

</script>

<style>
.fav-fixed {
    font-family: 'Courier New', Courier, monospace;
    width: 100%;
    position: fixed;
    z-index: 99;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 280px;
    padding-right: 280px;
    height: 40px;
    font-size: 20px;
}

.fav-fixed button h6 {
    font-size: 16px;
    color: rgb(80, 80, 80);
}

.fav {
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 80%;
    margin: 0 auto;
    padding-left: 100px;
    padding-top: 40px;
}

.favorite-space {
    display: flex;
    justify-content: space-between;
}

.favorite-list-image {
    display: flex;
    flex-wrap: wrap;
}

.favorite-image img {
    margin: 0 auto;
    width: 290px;
    height: 290px;
    margin-top: 10px;
    margin-left: 20px;
}

.favorite-btn-close {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
}

.favorite-btn-no {
    background-color: white;
    border: 0.5px solid black;
    color: black;
}

.favorite-btn-yes {
    background-color: rgb(0, 0, 0);
    border: 0.5px solid black;
    color: rgb(255, 255, 255);
}

.favorite-btn-yes:hover {
    background-color: rgb(255, 255, 255);
    border: 0.5px solid black;
    color: rgb(0, 0, 0);
}

.btn-favorite-now {
    display: flex;
    gap: 50px;
    background-color: black;
    color: white;
    align-items: center;
    border: 0.5px solid black;
}

.favorite-icon {
    padding-top: 2px;
}

.btn-favorite-now:hover {
    border: 0.5px solid black;
    background-color: white;
    color: rgb(0, 0, 0);
}

.btn-favorite-now:hover .favorite-icon i {
    color: rgb(255, 0, 43);
}

/* Not-favorite */


.not-favorite {
    margin-top: 10px;
    width: 80%;
    margin: 0 auto;
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
    padding-left: 100px;
}

.router-link {
    text-decoration: none;
    color: black;
}

.router-link:hover {
    text-decoration: none;
    color: black;
}

.fav-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px;
}

.fav-space span {
    font-size: 20px;
}

.fav-delete-all {
    cursor: pointer;
    background-color: white;
    border: none;
    color: rgb(64, 64, 64);
}

.fav-category-name {
    font-size: 28px;
    font-weight: bold;
    font-style: italic;
}

.fav-image {
    margin: 0 auto;
    width: 280px;
    height: 330px;
    margin-top: 15px;
    margin-left: 20px;
    object-fit: cover;
}

.fav-image-price {
    position: relative;

}

.fav-image div img {
    margin: 0 auto;
    width: 278px;
    height: 270px;
}

.fav-price {
    position: absolute;
    bottom: 7px;
    left: 20px;
    background-color: rgb(120, 120, 120);
    color: white;
    padding: 2px;
}


.fav-icon-heart {
    background: transparent;
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
}

.fav-name {
    margin-top: 5px;
    font-weight: bold;
}

.fav-brand {
    color: gray;
}

.fav-image:hover .product-price {
    bottom: 15px;
}

.fav-image:hover {
    border: 1px solid black;
}


.fav-name,
.fav-brand {
    margin-left: 20px;
}

.fav-name {
    margin-top: 5px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
}

.img-center {
    object-fit: contain;
}

/* modal */
.modal {
    font-family: 'Courier New', Courier, monospace;
}

.modal-footer-fav {
    display: flex;
    justify-content: center;
    align-items: center;
}

.fav-btn-no {
    color: black;
    border: 0.5px solid black;
    background-color: white;
}

.fav-btn-no:hover {
    background-color: rgb(118, 118, 118);
    border: 0.5px solid rgb(118, 118, 118);
    color: white;
}

.fav-btn-yes {
    color: rgb(255, 255, 255);
    border: 0.5px solid black;
    background-color: rgb(0, 0, 0);
}

.fav-btn-yes:hover {
    background-color: rgb(80, 80, 80);
    border: 0.5px solid black;
    color: white;
}

.fav-image-2 img {
    transition: transform 0.3s ease-in-out;
}

.fav-image-2:hover img {
    transform: scale(1.05);
    /* Phóng to khi hover */
}
</style>