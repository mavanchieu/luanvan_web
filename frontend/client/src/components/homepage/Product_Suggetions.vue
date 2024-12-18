<template>
    <div class="sgt mb-4">
        <h4 class="coll-title" style="font-family: 'Courier New', Courier, monospace;">GỢI Ý SẢN PHẨM DÀNH CHO BẠN</h4>
        <div class="product-sgt">
            <div class="product-list-sgt">
                <template v-for="pro in filteredProducts" :key="pro._id">
                    <div class="product-image">
                        <div class="product-image-price">
                            <img :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem.productId === pro._id)?.images[0]"
                                alt="">
                            <h6 class="product-price">{{ formatPrice(colorItems.find(colorItem => colorItem.productId
                                === pro._id)?.price) }} vnd</h6>
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
                        <router-link :to="{ name: 'product/detail', params: { id: pro._id } }" class="router-link">
                            <h5 class="product-name">{{ pro.name }}</h5>
                        </router-link>
                        <template v-for="brand in brands" :key="brand._id">
                            <template v-if="brand._id === pro.brandId">
                                <h6 class="product-brand">{{ brand.name }}</h6>
                            </template>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div class="sgt">
</template>

<script>
import brandService from '@/services/brand.service';
import colorItemService from '@/services/colorItem.service';
import favoriteService from '@/services/favorite.service';
import productService from '@/services/product.service';
import viewed_productsService from '@/services/viewed_products.service';

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
            viewedProducts: [],

            suggestionCounts: {
                genderId: {},
                typeDetailsId: {},
                brandId: {}
            },

            filterProducts: [],

            filteredProducts: [],
        };
    },

    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        async fetchViewedProducts() {
            try {
                this.viewedProducts = await viewed_productsService.getFindByUserId(this.getUserId);
            } catch (error) {
                console.error(error);
            }
        },

        async fecthProducts() {
            try {
                this.products = await productService.getAll();

                // mảng sản phẩm sau khi loại bỏ các sản phẩm đã xem
                this.filterProducts = this.products.filter(product => {
                    return !this.viewedProducts.some(viewed => viewed.productId === product._id);
                });
            } catch (error) {
                console.error(error);
            }
        },


        combineSuggestions(genderIds, typeDetailsIds, brandIds) {
            const suggestions = [];

            // Tạo tất cả các tổ hợp của genderId, typeDetailsId, và brandId
            genderIds.forEach(genderId => {
                typeDetailsIds.forEach(typeDetailsId => {
                    brandIds.forEach(brandId => {
                        suggestions.push(`${genderId},${typeDetailsId},${brandId}`);
                    });
                });
            });

            return suggestions;
        },

        async loadSuggestions() {
            // Khởi tạo đối tượng để đếm
            this.suggestionCounts = {
                genderId: {},
                typeDetailsId: {},
                brandId: {}
            };

            // Xử lý các sản phẩm đã xem
            this.viewedProducts.forEach(viewed => {
                const product = this.products.find(p => p._id === viewed.productId);

                if (product) {
                    // Đếm `genderId`
                    if (product.genderId) {
                        if (!this.suggestionCounts.genderId[product.genderId]) {
                            this.suggestionCounts.genderId[product.genderId] = 0;
                        }
                        this.suggestionCounts.genderId[product.genderId]++;
                    }

                    // Đếm `typeDetailsId`
                    if (product.typeDetailsId) {
                        if (!this.suggestionCounts.typeDetailsId[product.typeDetailsId]) {
                            this.suggestionCounts.typeDetailsId[product.typeDetailsId] = 0;
                        }
                        this.suggestionCounts.typeDetailsId[product.typeDetailsId]++;
                    }

                    // Đếm `brandId`
                    if (product.brandId) {
                        if (!this.suggestionCounts.brandId[product.brandId]) {
                            this.suggestionCounts.brandId[product.brandId] = 0;
                        }
                        this.suggestionCounts.brandId[product.brandId]++;
                    }
                }
            });
            console.log(this.suggestionCounts);
            const topGenderIds = Object.keys(this.suggestionCounts.genderId);
            const topTypeDetailsIds = Object.keys(this.suggestionCounts.typeDetailsId);
            const topBrandIds = Object.keys(this.suggestionCounts.brandId);

            // Tạo tất cả các tổ hợp từ genderId, typeDetailsId, và brandId
            const topSuggestions = this.combineSuggestions(topGenderIds, topTypeDetailsIds, topBrandIds);
            console.log("Top suggestions:", topSuggestions);

            this.filteredProducts = this.filterProducts.filter(product =>
                topSuggestions.some(suggestion => {
                    const [suggestionGenderId, suggestionTypeDetailsId, suggestionBrandId] = suggestion.split(',');
                    return suggestionGenderId === product.genderId &&
                        suggestionTypeDetailsId === product.typeDetailsId &&
                        suggestionBrandId === product.brandId;
                })
            );

            if (this.filteredProducts.length > 10) {
                // Lấy ngẫu nhiên 10 sản phẩm từ filteredProducts
                const randomProducts = [];
                const usedIndexes = new Set(); // Để đảm bảo không chọn trùng sản phẩm

                while (randomProducts.length < 10) {
                    const randomIndex = Math.floor(Math.random() * this.filteredProducts.length);

                    // Kiểm tra nếu index chưa được chọn
                    if (!usedIndexes.has(randomIndex)) {
                        randomProducts.push(this.filteredProducts[randomIndex]);
                        usedIndexes.add(randomIndex); // Đánh dấu index đã được chọn
                    }
                }

                // Cập nhật lại filteredProducts với 10 sản phẩm ngẫu nhiên
                this.filteredProducts = randomProducts;
            }

            if (this.filteredProducts.length == 0) {
                const suggestions = {
                    genderId: topGenderIds[Math.floor(Math.random() * topGenderIds.length)],
                    typeDetailsId: topTypeDetailsIds[Math.floor(Math.random() * topTypeDetailsIds.length)],
                    brandId: topBrandIds[Math.floor(Math.random() * topBrandIds.length)]
                };

                this.filteredProducts = this.filterProducts.filter(product =>
                    suggestions.typeDetailsId == product.typeDetailsId ||
                    suggestions.brandId == product.brandId ||
                    suggestions.genderId == product.genderId
                );
                if (this.filteredProducts.length > 10) {
                    // Lấy ngẫu nhiên 10 sản phẩm từ filteredProducts
                    const randomProducts = [];
                    const usedIndexes = new Set(); // Để đảm bảo không chọn trùng sản phẩm

                    while (randomProducts.length < 10) {
                        const randomIndex = Math.floor(Math.random() * this.filteredProducts.length);

                        // Kiểm tra nếu index chưa được chọn
                        if (!usedIndexes.has(randomIndex)) {
                            randomProducts.push(this.filteredProducts[randomIndex]);
                            usedIndexes.add(randomIndex); // Đánh dấu index đã được chọn
                        }
                    }
                    // Cập nhật lại filteredProducts với 10 sản phẩm ngẫu nhiên
                    this.filteredProducts = randomProducts;
                }

                console.log("Suggestions:", suggestions);
                console.log("FilterredProducts:", this.filteredProducts);
            }
        },



        async fetchColtorItems() {
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


    async mounted() {
        await this.fetchViewedProducts();
        await this.fecthProducts();
        await this.fetchColtorItems();
        await this.fetchBrands();
        await this.fetchFavorites();
        await this.loadSuggestions();
    }
}
</script>

<style>
.product-sgt {
    max-width: 100%;
    width: 80%;
    margin: 0 auto;
    font-family: 'Courier New', Courier, monospace;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 10px;
}

.product-list-sgt {
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

.product-sgt::-webkit-scrollbar {
    height: 8px;
}

/* Màu nền của track */
.product-sgt::-webkit-scrollbar-track {
    background: #ffffff;
}

/* Màu của thanh trược */
.product-sgt::-webkit-scrollbar-thumb {
    background-color: #000000;
    border-radius: 10px;
    border: 2px solid #ffffff;
}

.product-sgt::-webkit-scrollbar-thumb:hover {
    background-color: #000000;
    cursor: pointer;
}
</style>