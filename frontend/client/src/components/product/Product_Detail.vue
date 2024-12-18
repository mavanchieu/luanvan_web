<template>
    <div class="pd">
        <p class="font-weight-bold" style="font-size: 18px;">Thông tin sản phẩm</p>
        <div class="row">
            <div class="col-2 pd-image">
                <template v-for="(image, index) in selectedColorItem.images" :key="index">
                    <img class="img-center" style="width: 80px; height: 80px;" :style="{ cursor: 'pointer' }"
                        :src="'http://localhost:3005/' + image" alt="" @mouseenter="hoverImage = image"
                        @mouseleave="hoverImage = selectedColorItem.images[0]">
                </template>
            </div>

            <div class="col-4">
                <img class="img-center" style="width: 375px; height: 400px;"
                    :src="'http://localhost:3005/' + hoverImage" alt="">
            </div>

            <div class="col-6">
                <h4><b>{{ product.name }} </b> <span>({{ selectedColorItem.name }})</span></h4>
                <h6 v-if="product.discount != 0">Giá gốc: <span class="text-danger font-weight-bold"
                        style="font-size: 18px;"><del>{{ formatPrice(selectedColorItem.price) }} vnd</del></span></h6>
                <h6 v-else>Giá: <span class="text-danger font-weight-bold" style="font-size: 18px;">{{
                    formatPrice(selectedColorItem.price) }} vnd</span></h6>
                <template v-if="product.discount != 0">
                    <h6>Giá sau khi giảm:
                        <span class="text-success font-weight-bold" style="font-size: 18px;">
                            {{ formatPrice(selectedColorItem.price - (selectedColorItem.price * product.discount / 100))
                            }}
                            vnd
                        </span>
                    </h6>
                </template>

                <h6 class="mt-4">Màu sắc</h6>
                <span class="color-array">
                    <template v-for="(colorItem, index) in colorItems" :key="colorItem._id">
                        <span style="border:  solid black;" :style="{
                            backgroundColor: colorItem.color, padding: '10px',
                            margin: '5px', cursor: 'pointer', width: '30px', height: '30px', border: selectedColorIndex === index ? '2px solid black' : '0.5px solid black'
                        }" @click="selectColor(index)">
                        </span>
                    </template>
                </span>


                <h6 class="mt-2">Size</h6>
                <template v-for="(size, index) in selectedColorItem.sizes" :key="size._id">
                    <button class="ml-2" style="width: 40px; background-color: white" :style="{
                        border: selectedSizeIndex === index ? '2px solid black' : '0.5px solid black'
                        , color: selectedSizeIndex === index ? 'blue' : 'black'
                    }" @click="selectSize(index)">
                        {{ size.name }}
                    </button>
                </template>

                <h6 class="mt-4">Kho:
                    <span v-if="selectedSizeItem.quantity === 0" class="text-danger"> Sản phẩm hết hàng</span>
                    <span v-else class="font-weight-bold">{{ selectedSizeItem.quantity }}</span>
                </h6>

                <br>
                <div class="pro-detail-space">
                    <h6 class="mt-2">Số lượng</h6>
                    <input style="width: 100px;" type="number" class="form-control" :max="selectedSizeItem.quantity"
                        min="1" v-model="quantity">
                </div>
                <AddToCart :cartItem="cartItem" :quantityInStock="quantityInStock" @buy-now="handleBuyNow"
                    @add-to-cart="handleAddToCart" />
            </div>
        </div>

        <div class="pd-title">
            <h5><b>CHI TIẾT SẢN PHẨM</b></h5>
            <div class="pd-divider"></div>
            <div class="">
                <h6 class="font-weight-bold ml-4" style="font-size: 19px;">Bảng Size</h6>
                <table class="table ml-4 mt-2">
                    <thead class="thead">
                        <tr>
                            <th scope="col" style="border: 1px solid black;">Thông số</th>
                            <template v-for="s in sizes" :key="s._id">
                                <th class="text-center" style="border: 1px solid black;">
                                    <span class="font-weight-bold">{{ s.name }}</span>
                                </th>
                            </template>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-if="sizes.some(size => size.chestFrom)">
                            <td>Rộng ngực</td>
                            <template v-for="s in sizes" :key="s._id">
                                <td scope="col" class="text-center">{{ s.chestFrom + "-" + s.chestTo + " cm" }}</td>
                            </template>
                        </tr>
                        <tr v-if="sizes.some(size => size.sleevedFrom)">
                            <td>Dài tay</td>
                            <template v-for="s in sizes" :key="s._id">
                                <td scope="col" class="text-center">{{ s.sleevedFrom + "-" + s.sleevedTo + " cm" }}</td>
                            </template>
                        </tr>
                        <tr v-if="sizes.some(size => size.shoulderFrom)">
                            <td>Ngang vai</td>
                            <template v-for="s in sizes" :key="s._id">
                                <td scope="col" class="text-center">{{ s.shoulderFrom + "-" + s.shoulderTo + " cm" }}
                                </td>
                            </template>
                        </tr>
                        <tr v-if="sizes.some(size => size.heightFrom)">
                            <td>Dài áo</td>
                            <template v-for="s in sizes" :key="s._id">
                                <td scope="col" class="text-center">{{ s.heightFrom + "-" + s.heightTo + " cm" }}</td>
                            </template>
                        </tr>
                        <tr v-if="sizes.some(size => size.longPantsFrom)">
                            <td>Dài quần</td>
                            <template v-for="s in sizes" :key="s._id">
                                <td scope="col" class="text-center">{{ s.longPantsFrom + "-" + s.longPantsTo + " cm" }}
                                </td>
                            </template>
                        </tr>
                        <tr v-if="sizes.some(size => size.wideWaistFrom)">
                            <td>Rộng eo</td>
                            <template v-for="s in sizes" :key="s._id">
                                <td scope="col" class="text-center">{{ s.wideWaistFrom + "-" + s.wideWaistTo + " cm" }}
                                </td>
                            </template>
                        </tr>
                        <tr v-if="sizes.some(size => size.widePipeFrom)">
                            <td>Rộng ống</td>
                            <template v-for="s in sizes" :key="s._id">
                                <td scope="col" class="text-center">{{ s.widePipeFrom + "-" + s.widePipeTo + " cm" }}
                                </td>
                            </template>
                        </tr>
                        <tr v-if="sizes.some(size => size.longLegsFrom)">
                            <td>Dài chân</td>
                            <template v-for="s in sizes" :key="s._id">
                                <td scope="col" class="text-center">{{ s.longLegsFrom + "-" + s.longLegsTo + " cm" }}
                                </td>
                            </template>
                        </tr>
                        <tr v-if="sizes.some(size => size.wideLegsFrom)">
                            <td>Rộng chân</td>
                            <template v-for="s in sizes" :key="s._id">
                                <td scope="col" class="text-center">{{ s.wideLegsFrom + "-" + s.wideLegsTo + " cm" }}
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h5><b>MÔ TẢ CHI TIẾT</b></h5>
            <div class="pd-detail-description ">
                <span v-if="product.material"> Chất liệu vãi: {{ product.material }}</span>
                <br>
                <span v-if="product.description">Mô tả chi tiết: {{ product.description }}</span>
            </div>

            <div class="pd-divider"></div>
            <Evaluation :productId="this.$route.params.id" />

            <h5><b>CÂU HỎI</b></h5>
            <div class="pd-divider"></div>
            <div class="row mt-4">
                <div class="col-2 ml-4">
                    <i class="fa-regular fa-comment fa-2xl"></i>
                    <h6 class="mt-2">Chat với cửa hàng</h6>
                    <h5 style="border-bottom: 1px solid black; font-weight: bold;">BẮT ĐẦU NGAY</h5>
                </div>
                <div class="col-2">
                    <i class="fa-regular fa-circle-question fa-2xl"></i>
                    <h6 class="mt-2">Nhờ sự giúp đỡ</h6>
                    <h5 style="border-bottom: 1px solid black; font-weight: bold;">FAQ & HELP</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import colorItemService from '@/services/colorItem.service';
import productService from '@/services/product.service';
import viewed_productsService from '@/services/viewed_products.service';
import AddToCart from '../cart/AddToCart.vue';
import cartService from '@/services/cart.service';
import Evaluation from './Evaluation.vue';
import sizeService from '@/services/size.service';
import { showErrorToast, showSuccessToast } from '../shared/Toast.vue';
import io from 'socket.io-client';
export default {
    components: {
        AddToCart,
        Evaluation,
    },

    data() {
        return {
            products: [],
            product: typeof (Object),
            brands: [],
            colorItems: [],
            typeDetails: [],
            selectedColorItem: typeof (Object),
            selectedSizeItem: [],

            selectedColorIndex: 0,
            selectedSizeIndex: 0,
            hoverImage: null,
            sizes: [],

            viewedProducts: [],

            quantity: 1,

            quantityInStock: 0,

            cartItem: {
                id: "",
                productId: "",
                productName: "",

                colorItemId: "",
                colorItemName: "",

                userId: "",
                sizeId: "",
                sizeName: "",
                quantity: 0,
                price: "",
            },
            updateFlag: false,
        };
    },
    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    methods: {

        handleBuyNow(cartItem) {
            console.log(cartItem);
        },


        async fetchProducts() {
            try {
                this.products = await productService.getAll();
                this.product = this.products.find(pro => pro._id === this.$route.params.id);

                this.cartItem.productId = this.product._id;
                this.cartItem.productName = this.product.name;
            } catch (error) {
                console.error(error);
            }
        },

        async fetchColorItems() {
            try {
                this.colorItems = await colorItemService.getAll();
                this.colorItems = this.colorItems.filter(colorItem => colorItem.productId === this.$route.params.id);
            } catch (error) {
                console.error(error);
            }
        },

        async fetchViewedProducts() {
            try {
                this.viewedProducts = await viewed_productsService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async fetchSizes() {
            try {
                this.sizes = await sizeService.getAll();
                this.sizes = this.sizes.filter(size => size.typeDetailId === this.product.typeDetailsId);
                console.log(this.product.typeDetailsId);
                console.log(this.sizes);
            } catch (error) {
                console.error(error);
            }
        },

        async addOneViewedProduct() {
            await this.fetchViewedProducts();
            const now = new Date();
            const vietnamTime = new Date(now.getTime() + (7 * 60 * 60 * 1000)); // Cộng 7 giờ vào giờ UTC
            const formattedDate = vietnamTime.toISOString().slice(0, 19).replace('T', ' ');
            try {
                const notEmpty = this.viewedProducts.find(pro => pro.userId === this.getUserId && pro.productId === this.$route.params.id);
                if (notEmpty) {
                    return;
                }
                else {
                    const message = await viewed_productsService.create({ userId: this.getUserId, productId: this.$route.params.id, date: formattedDate });
                }
            } catch (error) {
                console.error(error);
            }
        },

        selectColor(index) {
            this.selectedColorItem = this.colorItems[index];
            this.cartItem.colorItemId = this.selectedColorItem._id;
            this.cartItem.colorItemName = this.selectedColorItem.name;
            this.cartItem.price = this.selectedColorItem.price;

            this.selectedSizeItem = this.selectedColorItem.sizes[0];
            this.cartItem.sizeId = this.selectedSizeItem._id;
            this.cartItem.sizeName = this.selectedSizeItem.name;
            this.quantityInStock = this.selectedSizeItem.quantity;

            this.selectedColorIndex = index;

        },

        selectSize(index) {
            this.selectedSizeItem = this.selectedColorItem.sizes[index];
            this.cartItem.sizeId = this.selectedSizeItem._id;
            this.cartItem.sizeName = this.selectedSizeItem.name;
            this.quantityInStock = this.selectedSizeItem.quantity;

            this.selectedSizeIndex = index;
        },

        formatPrice(price) {
            return new Intl.NumberFormat().format(price);
        },

        // checkQuantity() {
        //     if (cartItem.quantity > this.quantityInStock) {
        //         showErrorToast("Số lượng nhập vào không hợp lệ");
        //         return;
        //     }
        // },
        // thêm sản phẩm vào giỏ hàng
        async handleAddToCart(cartItem, index) {
            //  console.log(cartItem);
            //  console.log(index);
            if (this.quantityInStock < this.quantity || this.quantity < 1) {
                showErrorToast("Số lượng nhập vào không hợp lệ");
                return;
            }

            if (index === 0) {
                cartItem.quantity = cartItem.quantity + this.quantity;
                if (cartItem.quantity > this.quantityInStock) {
                    showErrorToast("Tổng số lượng sản phẩm lớn hơn số lượng còn trong kho");
                    return;
                }
                const message = await cartService.update(cartItem.id, cartItem);
                if (message) {
                    showSuccessToast("Sản phẩm đã có trong giỏ hàng, số lượng được cập nhật");
                }
            }
            if (index === 1) {
                try {
                    cartItem.quantity = this.quantity;
                    const message = await cartService.create(cartItem);
                    if (message) {
                        showSuccessToast("Bạn đã thếm sản phẩm vào giỏ hàng");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        },
        // async fetchProductDetails(){
        //     await this.addOneViewedProduct();
        //     await this.fetchProducts();
        //     if(this.product){
        //         await this.fetchSizes();
        //     }
        //     await this.fetchColorItems();

        //     if (this.colorItems.length > 0) {
        //         this.selectedColorItem = this.colorItems[0];
        //         this.cartItem.colorItemId = this.selectedColorItem._id;
        //         this.cartItem.colorItemName = this.selectedColorItem.name;
        //         this.cartItem.price = this.selectedColorItem.price;

        //         this.selectedSizeItem = this.selectedColorItem.sizes[0];
        //         this.cartItem.sizeId = this.selectedSizeItem._id;
        //         this.cartItem.sizeName = this.selectedSizeItem.name;
        //         this.quantityInStock = this.selectedSizeItem.quantity;

        //         this.hoverImage =  this.selectedColorItem.images.length > 0 ? this.selectedColorItem.images[0] : null;
        //     }
        // }
        async fetchProductDetails() {
            await this.addOneViewedProduct();
            await this.fetchProducts();
            if (this.product) {
                await this.fetchSizes();
            }
            await this.fetchColorItems();

            // If color items exist, select the first one as the default
            if (this.colorItems.length > 0) {
                // If selectedColorItem exists and matches one of the colorItems, don't overwrite
                if (!this.selectedColorItem || !this.colorItems.find(item => item._id === this.selectedColorItem._id)) {
                    this.selectedColorItem = this.colorItems[0]; // Default to the first item if none is selected
                }

                // Ensure selectedColorItem and selectedSizeItem are updated correctly
                this.cartItem.colorItemId = this.selectedColorItem._id;
                this.cartItem.colorItemName = this.selectedColorItem.name;
                this.cartItem.price = this.selectedColorItem.price;

                // Ensure the selectedSizeItem corresponds to the selected color
                const selectedSize = this.selectedColorItem.sizes.find(size => size._id === this.selectedSizeItem._id);
                if (selectedSize) {
                    this.selectedSizeItem = selectedSize;
                } else {
                    // If the size is not found, select the first available size
                    this.selectedSizeItem = this.selectedColorItem.sizes[0];
                }

                this.cartItem.sizeId = this.selectedSizeItem._id;
                this.cartItem.sizeName = this.selectedSizeItem.name;
                this.quantityInStock = this.selectedSizeItem.quantity;

                this.hoverImage = this.selectedColorItem.images.length > 0 ? this.selectedColorItem.images[0] : null;
            }
        },
    },

    mounted() {
        const socket = io('http://localhost:3005');

        socket.on('deleteOneOrder', async (childData) => {
            await this.fetchProductDetails();
            const updatedColorItem = this.colorItems.find(colorItem => colorItem._id === this.selectedColorItem._id);
            if (updatedColorItem) {
                this.selectedColorItem = updatedColorItem;
                const updatedSize = this.selectedColorItem.sizes.find(size => size._id === this.selectedSizeItem._id);
                if (updatedSize) {
                    this.selectedSizeItem = updatedSize
                } else {
                    this.selectedSizeItem = this.selectedColorItem.sizes[0];
                }
                console.log("Cập nhật color item:", this.selectedColorItem);
                console.log("Cập nhật size item:", this.selectedSizeItem);
            }
        });


        socket.on('createOrder', async (data) => {
            console.log(data);
            await this.fetchProductDetails();
            const updatedColorItem = this.colorItems.find(colorItem => colorItem._id === this.selectedColorItem._id);
            if (updatedColorItem) {
                this.selectedColorItem = updatedColorItem;
                const updatedSize = this.selectedColorItem.sizes.find(size => size._id === this.selectedSizeItem._id);
                if (updatedSize) {
                    this.selectedSizeItem = updatedSize
                } else {
                    this.selectedSizeItem = this.selectedColorItem.sizes[0];
                }
                console.log("Cập nhật color item:", this.selectedColorItem);
                console.log("Cập nhật size item:", this.selectedSizeItem);
            }
        });

        socket.on('updateProduct', async (data) => {
            console.log(data);
            await this.fetchProductDetails();
            const updatedColorItem = this.colorItems.find(colorItem => colorItem._id === this.selectedColorItem._id);
            if (updatedColorItem) {
                this.selectedColorItem = updatedColorItem;
                const updatedSize = this.selectedColorItem.sizes.find(size => size._id === this.selectedSizeItem._id);
                if (updatedSize) {
                    this.selectedSizeItem = updatedSize
                } else {
                    this.selectedSizeItem = this.selectedColorItem.sizes[0];
                }
                console.log("Cập nhật color item:", this.selectedColorItem);
                console.log("Cập nhật size item:", this.selectedSizeItem);
            }
        });

        socket.on('orderStatus', async (data) => {
            console.log(data);
            await this.fetchColorItems();
        });
    },

    async created() {
        await this.fetchProductDetails();
    },
    watch: {
        '$route.params.id': 'fetchProductDetails',
    }
}

</script>

<style scoped>
.pd {
    font-family: 'Courier New', Courier, monospace;
    padding-left: 200px;
    margin-top: 10px;
}

.pd-image {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 18px;
    clear: both;
    width: 100%;
}

.img-center {
    object-fit: contain;
}

.pro-detail-space {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
}

.color-array {
    display: flex;
}

.pd-divider {
    border: 0.5px solid rgb(226, 226, 226);
    margin-bottom: 10px;
    margin-right: 130px;
}

.pd-rate {
    margin-left: 20px;
}

.rate {
    color: red;
    font-weight: bold;
}

.pd-avatar {
    display: flex;
    justify-content: center;
    align-items: start;
}

.img-fluid {
    width: 150px;
    border-radius: 50%;
}

.table {
    border-collapse: collapse;
    border: 1px solid black;
    width: 80%;
}

.table th,
.table td {
    border: 1px solid rgb(173, 173, 173);
}

.table .thead {
    background-color: rgb(223, 223, 223);

}
</style>