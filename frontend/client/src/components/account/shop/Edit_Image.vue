<template>
    <div class="edit-image">
        <div class="account-space">
            <span class="image-profile">
                <img v-if="user.image !== ''"
                    style="width: 70px; height: 70px; border-radius: 50px; object-fit: contain; border: 0.5px solid black;"
                    :src="'http://localhost:3005/' + user.image" alt="">
                <img v-else
                    style="width: 70px; height: 70px; border-radius: 50px; object-fit: contain; border: 0.5px solid black;"
                    src="/src/assets/image/homepage/user.png" alt="">
            </span>
            <button type="button" data-toggle="modal" data-target="#modal-edit-image" class="modal-edit-image">Thay đổi
                ảnh</button>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="modal-edit-image" data-backdrop="static" data-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <form action="" @submit.prevent="updateImageProfile">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">THAY ĐỔI ẢNH ĐẠI DIỆN</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="card1">
                                <div v-if="user.image !== ''" class="text-center">
                                    <p>Ảnh hiện tại</p>
                                    <img style="width: 100px; height: 100px; object-fit: contain;"
                                        :src="'http://localhost:3005/' + user.image" alt="" />
                                </div>
                                <div class="top">
                                    <p>Ảnh thay đổi</p>
                                </div>
                                <div class="container1">
                                    <div v-if="image.url" class="image">
                                        <img style="width: 100px; height: 100px; object-fit: contain;" :src="image.url"
                                            alt="" />
                                    </div>
                                </div>
                            </div>
                            <h6 class="font-weight-bold mt-2">Chọn ảnh</h6>
                            <input class="image-torate" name="image" type="file" multiple @change="handleFileUpload" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn-close-update-image"
                                data-dismiss="modal">Hủy</button>
                            <button type="submit" class="btn btn-primary btn-update-image">Cập nhật</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import userService from '@/services/user.service';
import { isThisSecond } from 'date-fns';
import $ from "jquery";
import { showSuccessToast, showErrorToast } from '@/components/shared/Toast.vue';
export default {
    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    data() {
        return {
            image: {},
            user: {},
        };
    },

    methods: {

        async fetchUser() {
            try {
                this.user = await userService.getId(this.getUserId);
            } catch (error) {
                console.error(error);
            }
        },

        handleFileUpload(event) {
            this.image = {};
            const files = event.target.files;
            const file = files[0];
            const reader = new FileReader();

            if (!(file instanceof Blob)) {
                console.error("Selected file is not a Blob");
                return;
            }
            reader.onload = (e) => {
                this.image = {
                    name: file.name,
                    url: e.target.result,
                    file: file
                };
            };
            reader.readAsDataURL(file);
        },

        async updateImageProfile() {
            const formData = new FormData();
            formData.append("image", this.image.file);
            formData.append("userId", this.getUserId);

            const message = await userService.updateImage(formData);
            if (message) {
                showSuccessToast("Bạn đã thay đổi ảnh đại diện thành công!");
                $('#modal-edit-image').modal('hide');
                this.fetchUser();
            }
        }
    },

    async mounted() {
        await this.fetchUser();
    }
}

</script>

<style scoped>
.edit_image {
    font-family: 'Courier New', Courier, monospace;
}

.modal-edit-image {
    border: none;
    background-color: rgb(0, 65, 25);
    color: white;
}

.card1 {
    margin-right: 15px;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
}

.card1 .top {
    text-align: center;
}

.card1 p {
    font-weight: bold;
    font-size: 18px;
    color: rgb(0, 0, 0);
}

.card1 button {
    outline: 0;
    border: 0;
    color: white;
    border-radius: 5px;
    font-weight: 400;
    padding: 8px 13px;
    width: 100%;
    background-color: red;
}

.card1 .drag-area {
    height: 150px;
    border-radius: 5px;
    border: 2px solid black;
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: center;
    margin-top: 10px;
    -webkit-user-select: none;
}

.card1 .select {
    color: blue;
    margin-left: 5px;
    cursor: pointer;
    transition: 0.4s;
}

.card1 .select:hover {
    opacity: 0.6;
}

.card1 .container1 {
    width: 100%;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 8px;
    max-height: 250px;
}

.card1 .container1 .image {
    position: relative;
    margin: 5px;
    height: 500px;
}

.card1 .container1 .image img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    display: block;
}

.card1 input,
.card1 .drag-area .on-drop,
.card1 .drag-area.dragover .visible {
    display: none;
}

.modal-body .image-torate {
    background: transparent;
    all: unset;
}

.btn-close-update-image {
    border: none;
}

.btn-update-image {
    border: none;
    background-color: black;
    color: white;
}

.btn-update-image:hover {
    background-color: grey;
}
</style>