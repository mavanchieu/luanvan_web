<template>
    <div class="update-product">
        <h5>
            <b>CHỈNH SỬA CHI TIẾT SẢN PHẨM THEO MÀU</b>
        </h5>
        <div class="row mt-4">
            <div class="col-3 ml-2">
                <div class="form-group">
                    <label for="name" class="add_pro_name">Tên màu sản phẩm</label>
                    <input class="form-control" type="text" placeholder="Vui lòng nhập tên" v-model="colorItem.name">
                </div>
                <div class="form-group mt-4">
                    <span class="add_pro_space">
                        <span>Chọn màu</span>
                        <span><input type="color" v-model="colorItem.color"></span>
                    </span>
                </div>
                <div class="form-group mt-4">
                    <span class="add_pro_space">
                        <span>Giá</span>
                        <span><input type="number" class="form-control" v-model="colorItem.price"></span>
                    </span>
                </div>
                <div class="form-group mt-4">
                    <span class="size-quantity">Size và Số lượng</span>
                    <div class="mb-2 mt-2" v-for="(size, index) in colorItem.sizes" :key="size._id">
                        <span class="add_pro_space">
                            <span>{{ size.name }}</span>
                            <span>
                                <input class="form-control" type="number" v-model="size.quantity">
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-3">
                Ảnh hiện có
                <div v-for="img in colorItem.images">
                    <img style="width: 200px; height: 220px; object-fit: contain" :src="'http://localhost:3005/' + img"
                        alt="">
                </div>
            </div>

            <div class="col-4">
                Ảnh thay thế
                <div class="card1">
                    <div class="container1">
                        <div v-if="images.length < 1 || images.length > 4">
                            <h6 class="text-danger">Mỗi màu ít nhất 1 ảnh tối đa 4 ảnh</h6>
                        </div>
                        <div class="image" v-for="(image, imgIndex) in images" :key="imgIndex">
                            <span style="cursor: pointer;" class="delete" @click="deleteImage(imgIndex)">&times;</span>
                            <img class="mt-2" style="width: 100px; height: 100px; object-fit: contain;" :src="image.url"
                                alt="" />
                        </div>
                    </div>
                </div>
                <div class="form-group mt-4">
                    <label for="image"><span class="font-weight-bold" style="font-size: 18px;">Chọn ảnh</span></label>
                    <br>
                    <input name="image" type="file" multiple @change="handleFileUpload" />
                </div>
                <div>
                    <button class="btn btn-primary" @click="updateColorItem">Cập nhật</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import colorItemService from '@/services/colorItem.service';

export default {
    props: {
        colorItem: {
            typeof: Object,
            require: true,
        },
    },

    data() {
        return {
            images: [],
        }
    },

    emits: ["updateColorItem"],


    methods: {
        handleFileUpload(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                // Đọc file và lưu URL dưới dạng base64 để hiển thị ảnh
                reader.onload = (e) => {
                    this.images.push({
                        name: file.name,   // Tên file gốc
                        url: e.target.result, // URL base64 để hiển thị ảnh
                        file: file         // File dùng để upload lên server
                    });
                };
                reader.readAsDataURL(file); // Đọc file dưới dạng Data URL
            }
        },

        deleteImage(index) {
            this.images.splice(index, 1);
        },

        async updateColorItem() {
            const formData = new FormData();
            formData.append("name", this.colorItem.name);

            this.images.forEach((image) => {
                formData.append("images", image.file);
            });

            formData.append("sizes", JSON.stringify(this.colorItem.sizes));
            formData.append("color", this.colorItem.color);
            formData.append("price", this.colorItem.price);
            formData.append("productId", this.colorItem.productId);
            // const message = await colorItemService.updateColorItem(this.colorItem._id, formData);
            // console.log(this.colorItem.price);
            this.$emit('updateColorItem', this.colorItem._id, formData);
        },
    },
}

</script>

<style>
.update-product {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.add_pro_space {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>