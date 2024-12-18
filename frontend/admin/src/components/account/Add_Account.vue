<template>
    <div class="" v-if="getUserRole != 'staff'">
        <button class=" add-account" data-toggle="modal" data-target="#exampleModal">
            <span> Thêm tài khoản
            </span>
        </button>
    </div>

    <div class="divider-account">
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title font-weight-bold" id="exampleModalLabel">TẠO TÀI KHOẢN</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form action="" @submit.prevent="createUser">
                    <div class="modal-body">
                        <div class="title">
                            <h5 class="text-center font-weight-bold">
                                Điền Thông Tin
                            </h5>
                            <div class="divider-2">
                            </div>
                        </div>
                        <div>
                            <label for="username">Tên đăng nhập</label>
                            <br>
                            <input class="form-control" type="text" id="username" v-model="user.username"
                                @input="validator('username')">
                            <span class="text-danger">{{ errors.username }}</span>
                        </div>
                        <div class="mt-4">
                            <label for="phone">Số điện thoại</label>
                            <br>
                            <input class="form-control" type="text" id="phone" v-model="user.phone"
                                @input="validator('phone')">
                            <span class="text-danger">{{ errors.phone }}</span>
                        </div>
                        <div class="mt-4">
                            <label for="pass1">Mật khẩu</label>
                            <br>
                            <input class="form-control" type="password" id="pass1" v-model="user.password"
                                @input="validator('password')">
                            <span class="text-danger">{{ errors.password }}</span>
                        </div>
                        <div class="mt-4">
                            <label for="pass2">Nhập lại mật khẩu</label>
                            <br>
                            <input class="form-control" type="password" id="pass2" v-model="user.password2"
                                @input="validator('password2')">
                            <span class="text-danger">{{ errors.password2 }}</span>
                        </div>
                        <div class="mt-4">
                            <label for="role">Chọn Role</label>
                            <select class="ml-4" name="role" id="role" v-model="user.role" @change="handleRole">
                                <option value="client">Khách hàng</option>
                                <option value="staff">Nhân viên bán hàng</option>
                                <option value="wh_staff">Nhân viên kho</option>
                            </select>
                            <span class="text-danger">{{ errors.role }}</span>
                        </div>
                    </div>
                    <div class="modal-footer text-center">
                        <button type="submit" class="btn btn-add-account font-weight-bold">Đăng Ký</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import userService from '@/services/user.service';
import * as yup from 'yup';
import { showSuccessToast } from '../shared/Toast_Notification.vue';
export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
                password2: '',
                phone: '',
                role: '',
                date: '',
            },
            errors: {
            },
        };
    },

    computed: {
        getUserRole() {
            return localStorage.getItem("role");
        }
    },
    methods: {
        handleRole() {
            this.validator('role');
        },
        async validator(field) {
            this.user.password = this.user.password.trim();
            this.user.password2 = this.user.password2.trim();

            const schema = yup.object().shape({
                username: yup.string().min(6, 'Tên đăng nhập ít nhất 6 kí tự').required('Tên đăng nhập không được để trống'),
                phone: yup.string().matches(/^\d{10}$/, 'Số điện thoại phải có 10 chữ số').required('Số điện thoại không được để trống'),
                password: yup.string().min(6, 'Mật khẩu ít nhất 6 kí tự').required('Mật khẩu không được để trống'),
                password2: yup.string().min(6, 'Mật khẩu ít nhất 6 kí tự').required('Mật khẩu không được để trống'),
                role: yup.string().required('Vui lòng chọn role'),
            });
            try {
                const value = { [field]: this.user[field] };
                await schema.validateAt(field, value);
                this.errors[field] = null;
            } catch (error) {
                this.errors[field] = error.message
            }
        },

        async createUser() {
            console.log(this.user.password, this.user.password2);

            this.errors = {};
            await this.validator('username');
            await this.validator('phone');
            await this.validator('password');
            await this.validator('password2');
            await this.validator('role');

            const hasErrors = Object.keys(this.errors).some(field => this.errors[field] !== null);

            if (hasErrors) {
                console.log('Có lỗi:', this.errors);
                return;
            }
            if (this.user.password !== this.user.password2) {
                this.errors.password2 = 'Mật khẩu không khớp';
                console.log('Mật khẩu không khớp');
                return;
            }

            const currentDate = new Date();

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            this.user.date = formattedDate;
            try {
                const message = await userService.create(this.user);
                this.message = "Bạn đã đăng ký thành công!";
                if (message) {
                    showSuccessToast(this.message);
                }
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>

<style>
.account {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.add-account {
    display: flex;
    border: 1px solid black;
    padding: 7px;
    border-radius: 5px;
}

.add-account:hover {
    background-color: rgb(1, 92, 80);
    border: 1px solid rgb(0, 134, 121);
    padding: 7px;
    border-radius: 5px;
    color: white;
}

.account-row {
    display: flex;
    gap: 20px;
}

.account-staff,
.account-client {
    width: 280px;
    height: 100px;
    background-color: black;
    display: flex;
    align-items: center;

}

.icon-staff,
.icon-client {
    width: 70px;
    height: 100px;
    background-color: rgb(59, 59, 59);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;

}

.account-staff p,
.account-client p {
    color: white;
}

.number-of-employ,
.number-of-client {
    font-size: 40px;
}

.add-account {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}



.divider-account {
    padding-top: 20px;
    border-bottom: 1px solid black;
    width: 100%;
}

.thead {
    background-color: black;
    color: white;
}

.table tbody tr:hover {
    background-color: #dfdfdf;
}

.see-details {
    color: black;
    text-decoration: none;
}

.see-details:hover {
    color: blue;
    text-decoration: none;

}

/* Modal */
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

.modal-footer {
    justify-content: center;
}

.btn-add-account {
    background-color: black;
    color: white;
}

.btn-add-account:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
}

.title {
    font-weight: bold;
    margin-bottom: 20px;
}

.divider-2 {
    border-bottom: 2px solid black;
    width: 40%;
    margin: 0 auto;
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