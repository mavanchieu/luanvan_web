<template>
    <div class="discount-code">
        <span class="discount-space">
            <span style="font-size: 20px;"><b>DANH SÁCH CÁC KHUYẾN MÃI</b></span>
            <button class="btn-add-discount" data-toggle="modal" data-target="#modal-create-discount">Thêm khuyến
                mãi</button>
        </span>
        <span>Số lượng khuyến mãi: <b>{{ discountCodes.length }}</b></span>
        <div class="discount-divider">
        </div>
        <div class="ml-4 row dis-content mt-4">
            <template v-for="dis in discountCodes" :key="dis._id">
                <div class="content">
                    <span style="font-weight: bold; font-size: 18px;">MÃ GIẢM GIÁ</span>
                    <br>
                    <span style="font-weight: bold; color: grey; font-size: 18px;"> {{ dis.code }}</span>
                    <br>
                    <p class="mt-2 discount-space"><span>Ngày bắt đầu</span> <span><b>{{ dis.fromDate }}</b></span></p>
                    <p class="discount-space"><span>Ngày kết thúc</span> <span><b>{{ dis.toDate }}</b></span></p>
                    <p class="discount-space"><span><b>Phần trăm giảm</b></span> <span class="text-success"><b>{{
                        dis.discount }}%</b></span></p>
                    <span>Nội dung</span>

                    <span class="discount-space-right ml-4"> {{ dis.description }}</span>

                    <span class="discount-space">
                        <button class="btn-update-discount" data-toggle="modal" data-target="#modal-update-discount"
                            @click="btnUpdateDiscount(dis)">Cập nhật</button>
                        <button class="btn-delete-discount" data-toggle="modal" data-target="#modal-delete-discount"
                            @click="btnDeleteDiscount(dis._id)"><i class="fa-solid fa-xmark"></i></button>
                    </span>
                </div>
            </template>
        </div>

        <!-- modal tạo discount -->
        <div class="modal" tabindex="-1" id="modal-create-discount">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header modal-header-update-discount">
                        <h5 class="modal-title font-weight-bold">THÊM KHUYẾN MÃI</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form action="" @submit.prevent="createDiscount">
                        <div class="modal-body">
                            <p class="text-center">
                                <span style="border-bottom: 1px solid black; font-size: 18px; font-weight: bold;">
                                    Điền thông tin
                                </span>
                            </p>

                            <div class="form-group">
                                <label for="code"><b>Mã khuyến mãi</b></label>
                                <input class="form-control" type="text" name="code" id="code"
                                    placeholder="Vui lòng nhập mã khuyến mãi" v-model="createDiscountCode.code">
                            </div>
                            <div class="form-group">
                                <label for="discount"><b>Phần trăm khuyến mãi</b></label>
                                <input class="form-control" type="number" name="discount" id="discount"
                                    placeholder="Vui lòng nhập % khuyến mãi" v-model="createDiscountCode.discount">
                            </div>
                            <div class="form-group">
                                <label for="price"><b>Tổng hóa đơn</b></label>
                                <input class="form-control" type="number" name="price" id="price"
                                    placeholder="Vui lòng nhập số tiền" v-model="createDiscountCode.price">
                            </div>
                            <div class="form-group mt-2">
                                <label for="content"><b>Nội dung khuyến mãi</b></label>
                                <textarea class="form-control" type="text" name="content" id="content"
                                    placeholder="Vui lòng nhập nội dung"
                                    v-model="createDiscountCode.description"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="fromDate"><b>Ngày bắt đầu</b></label>
                                <input type="date" id="fromDate" v-model="createDiscountCode.fromDate">
                            </div>
                            <div class="form-group">
                                <label for="toDate"><b>Ngày kết thúc</b></label>
                                <input type="date" id="toDate" v-model="createDiscountCode.toDate">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            <button type="submit" class="btn btn-primary btn-save-discount">Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- modal cập nhật discount -->
        <div class="modal" tabindex="-1" id="modal-update-discount">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header modal-header-update-discount">
                        <h5 class="modal-title font-weight-bold">CẬP NHẬT KHYẾN MÃI</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form action="" @submit.prevent="updateDiscount">
                        <div class="modal-body">
                            <p class="text-center">
                                <span style="border-bottom: 1px solid black; font-size: 18px; font-weight: bold;">
                                    Thay đổi thông tin
                                </span>
                            </p>
                            <div class="form-group">
                                <label for="code"><b>Mã khuyến mãi</b></label>
                                <input class="form-control" type="text" name="code" id="code"
                                    placeholder="Vui lòng nhập mã khuyến mãi" v-model="discountCode.code">
                            </div>
                            <div class="form-group">
                                <label for="discount"><b>Phần trăm khuyến mãi</b></label>
                                <input class="form-control" type="number" name="discount" id="discount"
                                    placeholder="Vui lòng nhập % khuyến mãi" v-model="discountCode.discount">
                            </div>
                            <div class="form-group">
                                <label for="price"><b>Tổng hóa đơn</b></label>
                                <input class="form-control" type="number" name="price" id="price"
                                    placeholder="Vui lòng nhập số tiền" v-model="discountCode.price">
                            </div>
                            <div class="form-group mt-2">
                                <label for="content"><b>Nội dung khuyến mãi</b></label>
                                <textarea class="form-control" type="text" name="content" id="content"
                                    placeholder="Vui lòng nhập nội dung" v-model="discountCode.description"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="fromDate"><b>Ngày bắt đầu</b></label>
                                <input type="date" id="fromDate" v-model="discountCode.fromDate">
                            </div>
                            <div class="form-group">
                                <label for="toDate"><b>Ngày kết thúc</b></label>
                                <input type="date" id="toDate" v-model="discountCode.toDate">
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            <button type="submit" class="btn btn-primary">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="modal-delete-discount">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <h5 class="font-weight-bold text-center">Bạn có chắc chắn xóa khuyến mãi này?</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                        <button type="submit" class="btn btn-primary btn-confirm-delete" @click="deleteDiscount">Đồng
                            ý</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import discount_codeService from '@/services/discount_code.service';
import $ from "jquery";
import { showSuccessToast } from '../shared/Toast_Notification.vue';
export default {
    data() {
        return {
            discountCodes: [],

            // update
            discountCode: typeof (Object),

            //create
            createDiscountCode: {
                code: "",
                discount: 0,
                fromDate: "",
                toDate: "",
                description: "",
                price: 0,
            },

            discountCodeId: "",
        };
    },

    methods: {
        async fetchDiscountCodes() {
            try {
                this.discountCodes = await discount_codeService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        async createDiscount() {
            try {
                console.log(this.createDiscountCode);
                const message = await discount_codeService.create(this.createDiscountCode);
                if (message) {
                    showSuccessToast("Bạn đã thêm khuyến mãi thành công");
                    $('#modal-create-discount').modal('hide');
                    await this.fetchDiscountCodes();
                }
            } catch (error) {
                console.error(error);
            }
        },

        btnUpdateDiscount(discount) {
            this.discountCode = discount;
        },

        async updateDiscount() {
            try {
                console.log(this.discountCode);
                const message = await discount_codeService.update(this.discountCode._id, this.discountCode);
                if (message) {
                    showSuccessToast("Bạn đã cập nhật khuyến mãi thành công");
                    $('#modal-update-discount').modal('hide');
                    await this.fetchDiscountCodes();
                }
            } catch (error) {
                console.error(error);
            }
        },

        btnDeleteDiscount(id) {
            this.discountCodeId = id;
        },

        async deleteDiscount() {
            try {
                const message = await discount_codeService.delete(this.discountCodeId);
                if (message) {
                    showSuccessToast("Bạn đã xóa khuyến mãi thành công");
                    $('#modal-delete-discount').modal('hide');
                    await this.fetchDiscountCodes();
                }
            } catch (error) {
                console.error(error);
            }
        }

    },

    async mounted() {
        await this.fetchDiscountCodes();
    }
}

</script>

<style>
.discount-code {
    font-family: 'Courier New', Courier, monospace;
    padding: 25px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: auto;
}

.discount-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.discount-space-right {
    display: flex;
    justify-content: flex-end;
    font-style: italic;
}

.btn-add-discount {
    all: unset;
    background: #008CBA;
    border: 1px solid #008CBA;
    color: white;
    padding: 10px 18px;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-add-discount:hover {
    background-color: #005f6b;
    color: #fff;
    transform: translateY(-3px);
}

.discount-divider {
    margin: 15px 0;
    border: 0.5px solid #ddd;
}

.dis-content {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: flex-start;
}

.content {
    position: relative;
    padding: 25px;
    width: 320px;
    background-color: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin-bottom: 20px;
}

.content:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
}

.content span {
    display: block;
    margin-bottom: 8px;
}

.btn-update-discount {
    position: absolute;
    top: 10px;
    right: 40px;
    border: none;
    background-color: #4CAF50;
    color: white;
    padding: 8px 15px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    display: none;
}

.btn-update-discount:hover {
    background-color: #45a049;
}

.btn-delete-discount {
    background: transparent;
    position: absolute;
    top: 12px;
    right: 10px;
    border: none;
    color: #e74c3c;
    font-size: 22px;
    cursor: pointer;
    display: none;
}

.content:hover .btn-update-discount,
.content:hover .btn-delete-discount {
    display: inline-block;
}

.btn-save-discount {
    background-color: #333;
    color: white;
    border: 1px solid #333;
    padding: 10px 22px;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-save-discount:hover {
    background-color: #111;
    color: white;
    transform: translateY(-2px);
}

.modal-header-update-discount {
    background-color: #008CBA;
    color: white;
}

.close {
    all: unset;
    font-size: 32px;
    width: 30px;
    height: 30px;
    display: inline-block;
    line-height: 30px;
}
</style>