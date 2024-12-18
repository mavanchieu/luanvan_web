<template>
    <div class="info">
        <h5 class="font-weight-bold">HỒ SƠ CÁ NHÂN</h5>
        <div class="row info-detail">
            <div class="col-4 mt-2">
                <form action="" @submit.prevent="updateUser">
                    <h6 class="username" style="color: grey;">Tên đăng nhập</h6>
                    <input class="font-weight-bold form-control" type="text" placeholder="Vd: chieuma"
                        v-model="user.username" disabled>
                    <h6 class="name" style="color: grey;">Tên đầy đủ</h6>
                    <input class="form-control font-weight-bold" type="text" placeholder="Vd: Mã Văn Chiều"
                        v-model="user.fullname">
                    <h6 class="name" style="color: grey;">Giới tính</h6>
                    <p v-if="user.gender" class="mt-2 space"><span class="gender">{{ user.gender }}</span>
                        <span>
                            <select name="" id="" style="" v-model="user.gender">
                                <option value="Nam">
                                    Nam
                                </option>
                                <option value="Nữ">
                                    Nữ
                                </option>
                                <option value="Khác">
                                    Khác
                                </option>
                            </select>
                        </span>
                    </p>
                    <p v-else class="mt-2 space"><span class="gender"><span class="text-danger">Trống</span></span>
                        <span>
                            <select name="input-profile" id="" style="" v-model="user.gender">
                                <option value="Nam">
                                    Nam
                                </option>
                                <option value="Nữ">
                                    Nữ
                                </option>
                                <option value="Khác">
                                    Khác
                                </option>
                            </select>
                        </span>
                    </p>
                    <h6 style="color: grey;">Ngày sinh</h6>
                    <p v-if="user.birth" class="mt-2 space"><span class="gender">{{ user.birth }}</span>
                        <span>
                            <input class="input-profile" type="date" v-model="user.birth">
                        </span>
                    </p>
                    <p v-else class="mt-2 space"><span class="gender"><span class="text-danger">Trống</span></span>
                        <span>
                            <input class="input-profile" type="date" v-model="user.birth">
                        </span>
                    </p>
                    <h6 style="color: grey;">Số điện thoại</h6>
                    <p class="mt-2"><span><input class="form-control font-weight-bold" type="text"
                                placeholder="Vd: 0369951760" v-model="user.phone"></span></p>
                    <h6 class="Email" style="color: grey;">Email</h6>
                    <input type="text" class="form-control font-weight-bold" placeholder="Vd: chieu@gmail.com"
                        v-model="user.email">
                    <p class="text-center btn-save-profile">
                        <button class="btn btn-profile"><span>Lưu</span><span style="padding-top: 3px;">
                                <i class="fa-solid fa-caret-right"></i></span>
                        </button>
                    </p>
                </form>

            </div>
            <div class="col-4 mt-2 " id="container-image">
                <div class="image-profile">
                    <div>
                        <img v-if="user.image !== ''"
                            style="width: 70px; height: 70px; border-radius: 50px; object-fit: contain; border: 0.5px solid black;"
                            :src="'http://localhost:3005/' + user.image" alt="">
                        <img v-else
                            style="width: 70px; height: 70px; border-radius: 50px; object-fit: contain; border: 0.5px solid black;"
                            src="/src/assets/user.png" alt="">
                    </div>
                    <p class="text-center mt-4   btn-save-image">
                        <button class="btn btn-image" data-toggle="modal" data-target="#modal-edit-image">
                            <span>Cập nhật</span>
                            <span style="padding-top: 3px;"><i class="fa-solid fa-caret-right"></i></span>
                        </button>
                    </p>
                </div>

            </div>
            <div class="col-4 mt-2">
                <p class="text-center">Để bảo mật thông tin cá nhân, bạn nên thường xuyên thay đổi mật khẩu.</p>

                <p class="text-center">
                    <button type="button" class="btn-edit-password" data-toggle="modal" data-target="#exampleModal">
                        <p class="text-center text-edit-pass">Thay đổi mật khẩu?</p>
                    </button>
                </p>
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title font-weight-bold" id="exampleModalLabel">THAY ĐỔI MẬT KHẨU</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <h5 class="font-weight-bold text-center">Điền Thông Tin</h5>
                                <div class="border-title-divider">
                                </div>
                                <form action="" @submit.prevent="updatePassword">
                                    <div class="form-group mt-4">
                                        <label for="password1" class="text-left">Mật khẩu cũ</label>
                                        <input type="password" class="form-control" name="password1"
                                            placeholder="Vui lòng nhập mật khẩu cũ" v-model="oldPassword">
                                    </div>
                                    <div class="form-group mt-4">
                                        <label for="password2">Mật khẩu mới</label>
                                        <input type="password" class="form-control" name="password2"
                                            placeholder="Vui lòng nhập mật khẩu mới" v-model="newPassword1">
                                    </div>
                                    <div class="form-group mt-4">
                                        <label for="password3">Nhập lại mật khẩu mới</label>
                                        <input type="password" class="form-control" name="password3"
                                            placeholder="Vui lòng nhập lại mật khẩu mới" v-model="newPassword2">
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary btn-close-modal-edit-password"
                                            data-dismiss="modal">Hủy</button>
                                        <button type="submit" class="btn  btn-confirm-modal-edit-password">Thay
                                            đổi</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
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
import { error } from 'jquery';
import $ from 'jquery';
import { showErrorToast, showSuccessToast } from '../shared/Toast_Notification.vue';

export default {
    data() {
        return {
            user: typeof (Object),
            userPassword: {
                password: '',
            },
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',

            image: {},
        };
    },
    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        },
        getPassword() {
            return localStorage.getItem("password");
        }
    },
    methods: {
        async fetchUser() {
            try {
                this.user = await userService.getId(this.getUserId);
            } catch {
                error(error);
            }
        },

        async updateUser() {
            const message = await userService.update(this.getUserId, this.user);
            if (message) {
                showSuccessToast(message.message);
            }
        },

        async updatePassword() {
            try {
                if (this.oldPassword.length === 0 || this.newPassword1.length === 0 || this.newPassword2.length === 0) {
                    showErrorToast("Các trường mật khẩu không được trống");
                } else {
                    if (this.oldPassword !== this.getPassword) {
                        showErrorToast("Mật khẩu cũ không đúng");
                    } else {
                        if (this.newPassword1 === this.newPassword2) {
                            this.userPassword.password = this.newPassword1;
                            const message = await userService.update(this.getUserId, this.userPassword);
                            if (message) {
                                showSuccessToast("Cập nhật mật khẩu thành công, vui lòng đăng nhập lại!");
                                this.logOut();
                            }
                        } else {
                            showErrorToast("Mật khẩu mới và nhập lại mật khẩu không hợp lệ!");
                        }
                    }
                }
            } catch {
                error(error);
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
                showSuccessToast("Bạn đã thay đổi ảnh đại diện thành công.");
                $('#modal-edit-image').modal('hide');
                this.fetchUser();
            }
        },

        async logOut() {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            localStorage.removeItem("fullname");
            localStorage.removeItem("role");
            localStorage.removeItem("password")
            await this.$router.push("/");
            window.location.reload();
        },

    },
    mounted() {
        this.fetchUser();
    }
}
</script>

<style>
.info {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.info-detail {
    padding-left: 10px;
}

.input-profile {
    border-radius: 5px;
    height: 40px;
    border: 0.5px solid black;
}

.name {
    padding-top: 20px;
}

.space {
    align-items: center;
    display: flex;
    justify-content: space-between;
}

.gender {
    color: rgb(0, 153, 107);
    font-weight: bold;
}

.btn-save-profile {
    padding-top: 40px;
    display: flex;
    justify-content: center;
}

.btn-profile {
    display: flex;
    width: 200px;
    color: white;
    background-color: black;
    justify-content: space-between;
    background-color: black;
    align-items: center;


}

.btn-profile span {
    padding-left: 15px;
    padding-right: 15px;
}

.btn-profile:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
}

#container-image {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(223, 255, 255);
    border-radius: 20px;
    box-shadow: 4px 4px 4px rgba(89, 209, 222, 0.994);
    height: 400px;
    width: 20%;
}

.image-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}


.avatar {
    width: 70px;
    height: 70px;
    border-radius: 50px;
    background-color: black;
}


.btn-save-image {
    display: flex;
    justify-content: center;
}

.btn-image {
    display: flex;
    width: 200px;
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;


}

.btn-image span {
    padding-left: 15px;
    padding-right: 15px;
}

.btn-image:hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
}


.text-edit-pass {
    color: rgb(0, 153, 107);
    font-style: italic;
    font-weight: bold;
}

.border-title-divider {
    margin-left: 140px;
    margin-right: 140px;
    border-bottom: 2px solid black;
}

.btn-edit-password {
    text-align: center;
    border: none;
}

.btn-close-modal-edit-password,
.btn-confirm-modal-edit-password {
    background-color: white;
    color: black;
}

.btn-confirm-modal-edit-password {
    border: 0.5px solid rgb(0, 91, 74);
}

.btn-confirm-modal-edit-password:hover {
    background-color: rgb(0, 91, 74);
    color: rgb(255, 255, 255);
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

.close {
    all: unset;
    font-size: 32px;
    width: 30px;
    height: 30px;
    display: inline-block;
    line-height: 30px;
}
</style>