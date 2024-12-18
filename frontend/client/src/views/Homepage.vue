<template>
    <!-- <template>
        <div v-if="visible" class="modal-overlay">
            <div class="modal-content">
                <span class="close-btn" @click="close">&times;</span>
                <h2>Khuyến Mãi Hấp Dẫn!</h2>
                <p>Chúng tôi có chương trình khuyến mãi đặc biệt dành cho bạn. Hãy tận dụng ngay!</p>
                <button @click="close">Đóng</button>
            </div>
        </div>
    </template> -->

    <Carousel />
    <Discount_Code />
    <Product_Suggetions />
    <TopSeller />
    <JoinTeam />
    <Explore />
    <Brand_Collection />
    <Seasonal_Collection />

</template>

<script>

import Carousel from "@/components/homepage/Carousel.vue";
import Discount_Code from "@/components/homepage/Discount_Code.vue";
import Explore from "@/components/homepage/Explore.vue";
import JoinTeam from "@/components/homepage/JoinTeam.vue";
import Product_Suggetions from "@/components/homepage/Product_Suggetions.vue";
import TopSeller from "@/components/homepage/TopSeller.vue";
import productService from "@/services/product.service";
import { error } from "jquery";
import Brand_Collection from "@/components/homepage/Brand_Collection.vue";
import Seasonal_Collection from "@/components/homepage/Seasonal_Collection.vue";

export default {
    components: {
        Explore,
        Brand_Collection,
        Carousel,
        TopSeller,
        JoinTeam,
        Discount_Code,
        Product_Suggetions,
        Seasonal_Collection
    },

    data() {
        return {
            products: [],
            selectedColorIndex: 0,
            selectedProductIndex: 0,
            imagePaths: [],
            visible: true,
        };
    },

    methods: {
        // handleFileUpload(event) {
        //     const files = event.target.files;
        //     this.imagePaths = []; // Clear previous paths
        //     for (let i = 0; i < files.length; i++) {
        //         this.imagePaths.push(files[i].name); // Store only the file names
        //     }
        // },
        close() {
            this.visible = false;  // Ẩn modal khi người dùng đóng
        },
        async fetchProducts() {
            try {
                this.products = await productService.getAll();
                console.log(this.products);
            } catch {
                error(error);
            }
        },

        // selectColor(productIndex, colorIndex) {
        //     this.selectedColorIndex = colorIndex; // Update the selected color index
        //     this.selectedProductIndex = productIndex; // Update the selected product index
        // }
    },

    // mounted(){
    //     this.fetchProducts();
    // }
}
</script>

<style scoped></style>