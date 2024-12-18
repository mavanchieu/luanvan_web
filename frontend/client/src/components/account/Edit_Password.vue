<template>
    Thay đổi mật khẩu
    <h6 class="text-center mt-2 font-italic">Để bảo mật thông tin cá nhân. Khách hàng vui lòng thường xuyên thay đổi mật
        khẩu.</h6>

    <p class="text-center">
        <button type="button" class="btn-edit-password" data-toggle="modal" data-target="#exampleModal">
            <p class="text-center text-edit-pass">Thay đổi mật khẩu?</p>
        </button>
    </p>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <div class="modal-footer text-right">
                            <button type="button" class="btn btn-secondary btn-close-modal-edit-password"
                                data-dismiss="modal">Hủy</button>
                            <button type="submit" class="btn  btn-confirm-modal-edit-password">Thay đổi</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import userService from '@/services/user.service';
import { error } from 'jquery';
import { showSuccessToast, showErrorToast } from '@/components/shared/Toast.vue';
export default {
    data() {
        return {
            userPassword: {
                password: '',
            },
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',
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

        async logOut() {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            localStorage.removeItem("password")
            await this.$router.push("/");
            window.location.reload();
        },

    },
}
</script>

<style>
.account-edit-password {
    display: flex;
    justify-content: center;
}

.account-btn-edit-password {
    background-color: white;
    border: none;
    font-weight: bold;
}

.text-edit-pass {
    color: green;
}

.account-btn-edit-password:hover {
    background-color: rgb(204, 238, 193);
}

.modal-dialog {
    display: flex;
    width: 400px;
    justify-content: center;
    align-items: center;

}

.modal-body {
    display: flex;
    flex-direction: column;
}

.modal-body input {
    width: 100%;
    height: 35px;
    max-width: 100%;
    border-radius: 10px;
    border: 0.5px solid black;
}

.modal-btn-edit-password {
    background-color: black;
    color: white;
}

.modal-btn-edit-password:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
}

.modal-title {
    font-weight: bold;
    margin-bottom: 20px;
}

.modal-divider {
    border-bottom: 2px solid black;
    width: 40%;
    margin: 0 auto;
}

.btn-edit-password {
    background-color: white;
    border: none;
}

.btn-edit-password:hover {
    background-color: white;
    border: none;
    color: green;
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
</style>