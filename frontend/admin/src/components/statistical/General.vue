<template>
    <div class="row general">
        <div class="col-6">
            <h5 class="font-weight-bold text-center">Thống kê về các danh mục cửa hàng</h5>
            <div class="general-content">
                <p class="general-space">
                    <span>Số lượng nhãn hiệu</span>
                    <span class="font-weight-bold">{{ brands.length }}</span>
                </p>
                <p class="general-space">
                    <span>Số lượng giới tính</span>
                    <span class="font-weight-bold">{{ genders.length }}</span>
                </p>
                <p class="general-space">
                    <span>Số lượng loại sản phẩm</span>
                    <span class="font-weight-bold">{{ types.length }}</span>
                </p>
                <p class="general-space">
                    <span>Số lượng chi tiết loại sản phẩm</span>
                    <span class="font-weight-bold">{{ typeDetails.length }}</span>
                </p>
            </div>
        </div>
        <div class="col-6">
            <h5 class="font-weight-bold text-center">Thống kê hàng tồn kho</h5>
            <form action="" @submit.prevent="">
                <div class="form-group general-space">
                    <span></span>
                    <input style="width: 400px;" class="form-control" type="number" placeholder="Nhập số lượng thống kê"
                        required>
                </div>
                <div class="form-group general-space">
                    <span></span>
                    <span><button class="btn btn-dark">> Lớn Hơn</button><button class="btn btn-dark ml-4">
                            < Nhỏ Hơn</button></span>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import brandService from '@/services/brand.service';
import genderService from '@/services/gender.service';
import typeService from '@/services/type.service';
import type_detailService from '@/services/type_detail.service';
import { error } from 'jquery';


export default {
    data() {
        return {
            genders: [],
            types: [],
            typeDetails: [],
            brands: [],
        };
    },

    methods: {
        async fetchGenders() {
            try {
                this.genders = await genderService.getAll();
            } catch {
                error(error);
            }
        },

        async fetchTypes() {
            try {
                this.types = await typeService.getAll();
            } catch {
                error(error);
            }
        },

        async fetchTypeDetails() {
            try {
                this.typeDetails = await type_detailService.getAll();
            } catch {
                error(error);
            }
        },

        async fetchBrands() {
            try {
                this.brands = await brandService.getAll();
            } catch {
                error(error);
            }
        }
    },

    mounted() {
        this.fetchBrands();
        this.fetchGenders();
        this.fetchTypes();
        this.fetchTypeDetails();
    },
}


</script>

<style>
.general {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.general-space {
    display: flex;
    justify-content: space-between;
}
</style>