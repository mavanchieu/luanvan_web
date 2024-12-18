<template>
    <div class="eva">
        <h5 class="font-weight-bold">CÁC SẢN PHẨM ĐƯỢC ĐÁNH GIÁ</h5>
        <table class="table mt-4">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" class="text-center">STT</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Lượt đánh giá</th>
                    <th scope="col">Tỉ lệ đánh giá</th>
                    <th scope="col" class="text-center">Xem chi tiết</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(uni, index) in uniqueId" :key="index">
                    <template v-for="pro in products" :key="pro._id">
                        <template v-if="pro._id == uni">
                            <tr>
                                <th scope="row" class="text-center">{{ index + 1 }}</th>
                                <td>{{ pro.name }}</td>
                                <template v-if="colorItems.some(colorItem => colorItem.productId === pro._id)">
                                    <img style="width: 150px; height: 120px; object-fit: contain;"
                                        :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem.productId === pro._id)?.images[0]"
                                        alt="">
                                </template>
                                <td>{{ pro.name }}</td>
                                <td>{{ pro.name }}</td>
                                <td class="text-center"><router-link
                                        :to="{ name: 'evaluation_details', params: { id: pro._id } }"><i
                                            class="fa-regular fa-eye" style="color: #74C0FC;"></i></router-link></td>
                            </tr>
                        </template>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import colorItemService from '@/services/colorItem.service';
import evaluationsService from '@/services/evaluations.service';
import orderService from '@/services/order.service';
import productService from '@/services/product.service';

export default {
    data() {
        return {
            products: [],
            orders: [],
            evas: [],
            colorItems: [],

            uniqueId: [],
        };
    },

    methods: {
        async fetchProducts() {
            try {
                this.products = await productService.getAll();
                console.log(this.products);
            } catch (error) {
                console.error(error);
            }
        },

        async fetchOrders() {
            try {
                this.orders = await orderService.getAll();
                console.log(this.orders);
            } catch (error) {
                console.error(error);
            }
        },

        async fetchEvas() {
            try {
                this.evas = await evaluationsService.getAll();
                this.uniqueId = new Set();
                this.evas.filter(item => {
                    const key = item.productId;
                    if (this.uniqueId.has(key)) {
                        return false;
                    }
                    this.uniqueId.add(key);
                })
                // for(const uni of this.uniqueId){
                //     const eva = this.evas.find( item => item.productId === uni.productId);
                //     if(eva){
                //         uni.total = uni.total + 1;
                //     }
                //     else{
                //         this.uniqueId.push({'productId': eva.productId, 'total': uni.total});
                //     }

                // }
                console.log(this.uniqueId);
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
        }
    },

    async mounted() {
        await this.fetchProducts();
        await this.fetchOrders();
        await this.fetchEvas();
        await this.fetchColorItems();
    }
}

</script>

<style>
.eva {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}
</style>