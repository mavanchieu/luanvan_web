<template>
    <div class="info">
        <span style="display: flex; justify-content: space-between; align-items: center;">
            <h5 class="font-weight-bold">HỒ SƠ CÁ NHÂN</h5>
            <button class="btn btn-danger" data-target="#modalDeleteAccount" data-toggle="modal">Xóa Tài Khoản</button>
        </span>
        <div class="row info-detail">
            <div class="col-4 mt-2">
                <form action="" @submit.prevent="updateUser">
                    <h6 class="username" style="color: grey;">Tên đăng nhập</h6>
                    <input class="font-weight-bold form-control" type="text" placeholder="Vd: chieuma"
                        v-model="user.username" disabled>
                    <h6 class="name" style="color: grey;">Tên đầy đủ</h6>
                    <input class="font-weight-bold form-control" type="text" placeholder="Vd: Mã Văn Chiều"
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
                    <h6 style="color: grey;">Ngày sinh</h6>
                    <p v-if="user.birth" class="mt-2 space"><span class="gender">{{ user.birth }}</span>
                        <span>
                            <input type="date">
                        </span>
                    </p>
                    <p v-else class="mt-2 space"><span class="gender text-danger">Trống</span>
                        <span>
                            <input type="date">
                        </span>
                    </p>
                    <h6 style="color: grey;">Số điện thoại</h6>
                    <p class="mt-2"><span><input class="form-control font-weight-bold" type="text"
                                placeholder="Vd: 0369951760" v-model="user.phone"></span></p>
                    <h6 class="Email" style="color: grey;">Email</h6>
                    <input class="form-control font-weight-bold" type="text" placeholder="Vd: chieu@gmail.com"
                        v-model="user.email">
                    <p v-if="getUserRole != 'staff' || getUserRole != 'staff_wh'" class="text-center btn-save-profile">
                        <button class="btn btn-profile" type="submit">
                            <span>Lưu</span>
                            <span style="padding-top: 3px;">
                                <i class="fa-solid fa-caret-right"></i>
                            </span>
                        </button>
                    </p>
                </form>

            </div>
            <div v-if="user.role === 'client'" class="col-4 mt-2">
                <h5 class="font-weight-bold">Thống kê</h5>
                <p class="account-datail-space"><span>Số lần truy cập hệ thống</span><span class="count">{{
                    access.length }}</span></p>
                <p class="account-datail-space"><span>Số đơn hàng chờ xác nhận</span><span class="count">{{
                    handle.length
                        }}</span></p>
                <p class="account-datail-space"><span>Số đơn hàng đã xác nhận</span><span class="count">{{
                    ordered.length
                        }}</span></p>
                <p class="account-datail-space"><span>Số đơn hàng đã vận chuyển</span><span class="count">{{
                    shipping.length
                        }}</span></p>
            </div>

            <div v-if="getUserRole != 'staff'" class="col-4 mt-2">
                <p class="text-center">Để bảo mật thông tin cá nhân, bạn nên thường xuyên thay đổi mật khẩu.</p>
                <p class="text-center">
                    <button type="button" class="btn-edit-password-account-detail" data-toggle="modal"
                        data-target="#modal-update-password">
                        <p class="text-center text-edit-pass">Thay đổi mật khẩu?</p>
                    </button>
                </p>

                <!-- Modal cập nhật mật khẩu -->
                <div class="modal fade" id="modal-update-password" tabindex="-1" aria-labelledby="exampleModalLabel"
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
                                        <button type="button"
                                            class="btn btn-secondary btn-close-modal-edit-password-account-detail"
                                            data-dismiss="modal">Hủy</button>
                                        <button type="submit"
                                            class="btn  btn-confirm-modal-edit-password-account-detail">Thay
                                            đổi</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="modalDeleteAccount">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form action="" @submit.prevent="deleteAccount">
                        <div class="modal-body text-center">
                            <p>Bạn có chắc chắn xóa tài khoản này?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            <button type="submit" class="btn btn-dark">Đồng ý</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import accessService from '@/services/access.service';
import genderService from '@/services/gender.service';
import userService from '@/services/user.service';
import $ from "jquery";
import { error } from 'jquery';
import { showErrorToast, showSuccessToast } from '../shared/Toast_Notification.vue';
import orderService from '@/services/order.service';
export default {
    props: ['id'],

    data() {
        return {
            access: [],
            user: typeof (Object),
            userPassword: {
                password: '',
            },
            genders: typeof (Object),
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',

            handle: [],
            ordered: [],
            shipping: [],
            orderByUserId: [],
        }
    },
    computed: {
        userId() {
            return this.id;
        },

        getUserRole() {
            console.log(localStorage.getItem('role'));
            return localStorage.getItem("role");
        }
    },
    methods: {

        async fetchOneUser() {
            if (this.id) {
                this.user = await userService.getId(this.id);
            }
        },

        async fetchGenders() {
            this.genders = await genderService.getAll();
        },

        async updateUser() {
            const message = await userService.update(this.id, this.user);
            if (message) {
                showSuccessToast(message.message);
            }
        },

        async updatePassword() {
            try {
                if (this.oldPassword.length === 0 || this.newPassword1.length === 0 || this.newPassword2.length === 0) {
                    ("Các trường mật khẩu không được trống");
                } else {
                    if (this.oldPassword !== this.user.password) {
                        showErrorToast("Mật khẩu cũ không đúng");
                    } else {
                        if (this.newPassword1 === this.newPassword2) {
                            this.userPassword.password = this.newPassword1;
                            const message = await userService.update(this.id, this.userPassword);
                            if (message) {
                                showSuccessToast("Mật khẩu đã được cập nhật thành công!");
                                $('#modal-update-password').modal('hide');
                                this.fetchOneUser();
                            }
                        } else {
                            $('#modal-update-password').modal('hide');
                            showErrorToast("Mật khẩu mới và nhập lại mật khẩu không hợp lệ!");
                        }
                    }
                }
            } catch {
                error(error);
            }
        },

        //Lọc theo id người dùng
        async fetchAccess() {
            try {
                this.access = await accessService.getAll();
                this.access = this.access.filter(acc => acc.userId === this.id);
            } catch {
                error(error);
            }
        },

        async deleteAccount() {
            try {
                const message = await userService.deleteOne(this.id);
                if (message) {
                    $('#modalDeleteAccount').modal('hide');
                    showSuccessToast("Xóa tài khoản thành công");
                }
            } catch (error) {
                $('#modalDeleteAccount').modal('hide');
                showErrorToast(error.response.data.message);
            }
        },

        async fetchOrderByUserId() {
            try {
                this.orderByUserId = await orderService.getAllByUserId(this.id);
                this.handle = this.orderByUserId.filter(order => order.status == "0");
                this.ordered = this.orderByUserId.filter(order => order.status == "1");
                this.shipping = this.orderByUserId.filter(order => order.status == "2");
                // alert(this.orderByUserId.length);
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.fetchGenders();
        this.fetchOneUser();
        this.fetchAccess();
        this.fetchOrderByUserId();
    }
};
</script>

<style>
.info {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.info-detail {
    padding-left: 10px;
}

input {
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

.phone {
    width: 150px;
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

.account-datail-space {
    display: flex;
    justify-content: space-between;
}

.count {
    color: rgb(6, 180, 6);
    font-weight: bold;
}

.text-edit-pass {
    color: rgb(0, 153, 107);
    font-style: italic;
    font-weight: bold;
}

.btn-edit-password-account-detail {
    background-color: white;
    border: none;
    color: rgb(0, 75, 0);
}

.btn-close-modal-edit-password-account-detail {
    background-color: white;
    color: black;
    border: 0.5px solid black;
}

.btn-confirm-modal-edit-password-account-detail {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border: 0.5px solid rgb(0, 88, 57);
}

.btn-confirm-modal-edit-password-account-detail:hover {
    background-color: rgb(0, 102, 71);
    color: rgb(255, 255, 255);
    border: 0.5px solid rgb(0, 88, 57);
}

.close {
    all: unset;
    font-size: 32px;
    width: 30px;
    height: 30px;
    display: inline-block;
    line-height: 30px;
}

.close:hover {
    color: red;
}
</style>