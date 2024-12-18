<template>
    <div class="staff-account">
        <h5 class="font-weight-bold">DANH SÁCH TÀI KHOẢN NHÂN VIÊN BÁN HÀNG</h5>
        <Add_Account />
        <div class="staff-account-divider">
        </div>
        <table class="table mt-2">
            <thead class="thead">
                <tr>
                    <th scope="col" class="text-center">STT</th>
                    <th scope="col">Họ và tên</th>
                    <th scope="col">Tên đăng nhập</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Email</th>
                    <th scope="col" class="text-center">Xem chi tiết</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user._id">
                    <th scope="row" class="text-center">{{ index + 1 }}</th>
                    <td>
                        {{ user.fullname }}
                    </td>
                    <td>
                        {{ user.username }}
                    </td>
                    <td>
                        {{ user.phone }}
                    </td>
                    <td>
                        {{ user.email }}
                    </td>
                    <td class="text-center">
                        <router-link :to="{ name: 'account_detail', params: { id: user._id } }">
                            <i class="fa-solid fa-eye" style="color: #00a2ad;"></i>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import userService from '@/services/user.service';
import { error } from 'jquery';
import Add_Account from './Add_Account.vue';


export default {
    components: {
        Add_Account,
    },

    computed: {
        getUserRole() {
            return localStorage.getItem("role");
        }
    },

    data() {
        return {
            users: [],
        };
    },

    methods: {
        async fetchAllUsers() {
            try {
                this.users = await userService.getAll();
                if (this.users) {
                    this.users = this.users.filter(user => user.role === "staff");
                }
            } catch {
                error("Lỗi trong quá trình nhận dữ liệu");
            }
        }
    },

    mounted() {
        this.fetchAllUsers();
    }
}
</script>

<style scoped>
.staff-account {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
}

.staff-account-divider {
    border: 1px solid black;
}

.thead {
    background-color: rgb(107, 107, 107);
    color: white;
}

.table tbody tr:hover {
    background-color: #dfdfdf;
}
</style>