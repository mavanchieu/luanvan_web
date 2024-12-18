<template>
    <span class="account-space">
        <span class="font-weight-bold account-address">
            Địa chỉ
        </span>
        <span>
            <button class="account-btn-add-address" data-toggle="modal" data-target="#modal-add-address">Thêm địa
                chỉ</button>
        </span>
    </span>
    <div class="overflow-auto mt-2" style="height: 300px;">
        <div class="content" v-for="address in allAddesses">
            <div class="row mt-4">
                <div class="col-8">
                    <div class="account-info-address">
                        <div>
                            <span class="font-weight-bold">{{ address.fullname }}</span>
                            <p class="account-address-phone">{{ address.phone }}</p>
                            <span class="">{{ address.address }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-4 account-btn-default">
                    <button v-if="address.status == true" class="btn-default" disabled>Đã đặt</button>
                    <button v-if="address.status == false" class="btn-default"
                        @click="confirmDefaultAddress(address)">Mặc định</button>
                    <button class="btn-delete-address mt-2" data-target="#deleteAddressModal" data-toggle="modal"
                        @click="btnDeleteAddress(address._id)">Xóa</button>
                </div>
            </div>
            <div class="account-divider">
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-add-address" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        style="font-family: 'Courier New', Courier, monospace;">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title font-weight-bold" id="exampleModalLabel">THÊM ĐỊA CHỈ</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form action="">
                    <div class="modal-body">
                        <div class="modal-title">
                            <h5 class="text-center font-weight-bold">
                                Điền Thông Tin
                            </h5>
                            <div class="modal-divider">
                            </div>
                        </div>
                        <div>
                            <label for="modal-fullname">Họ và tên</label>
                            <br>
                            <input type="text" id="modal-fullname" v-model="address.fullname">
                        </div>
                        <div class="mt-4">
                            <label for="modal-phone">Số điện thoại</label>
                            <br>
                            <input type="text" id="modal-phone" v-model="address.phone">
                        </div>
                        <div class="mt-4">
                            <label for="modal-address">Địa chỉ</label>
                            <br>
                            <textarea name="modal-address" id="modal-address" cols="30" rows="3"
                                v-model="address.address">
                                </textarea>
                        </div>
                        <div class="modal-footer text-center">
                            <button type="submit" class="btn modal-btn-add-address" @click="addAddress">Thêm</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" style="font-family: 'Courier New', Courier, monospace;" id="deleteAddressModal"
        data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body text-center font-weight-bold">
                    Bạn có chắc chắn xóa địa chỉ nhận hàng này?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                    <button type="submit" class="btn btn-primary" @click="deleteAddress">Đồng ý</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import receiving_addressService from '@/services/receiving_address.service';
import { error } from 'jquery';
import $ from 'jquery';
import { showSuccessToast, showErrorToast } from '@/components/shared/Toast.vue';
export default {
    data() {
        return {
            allAddesses: [],

            //add address
            address: {
                userId: "",
                fullname: "",
                phone: "",
                address: "",
                status: false,
            },

            defaultAddress: typeof (Object),

            addressId: "",
        };
    },

    methods: {
        async fetchAllAddresses() {
            try {
                this.allAddesses = await receiving_addressService.getAll();
                this.allAddesses = this.allAddesses.filter(address => address.userId === this.getUserId);
            } catch {
                error(error);
            }
        },

        async addAddress() {
            try {
                this.address.userId = this.getUserId;
                const message = await receiving_addressService.create(this.address);
                if (message) {
                    showSuccessToast("Thêm địa chỉ thành công");
                }
            } catch {
                error(error);
            }
        },

        btnDeleteAddress(id) {
            this.addressId = id;
        },

        async deleteAddress() {
            try {
                const message = await receiving_addressService.delete(this.addressId);
                if (message) {
                    alert(message.message);
                    $('#deleteAddressModal').modal('hide');
                    this.fetchAllAddresses();
                }
            } catch {
                error(error);
            }
        },

        async confirmDefaultAddress(address) {
            this.defaultAddress = address;
            this.defaultAddress.status = true;


            try {
                const message = await receiving_addressService.update(this.defaultAddress._id, this.defaultAddress);
                if (message) {
                    showSuccessToast("Đặt làm mặc định thành công");
                    await this.fetchAllAddresses();

                    for (const addr of this.allAddresses) {
                        if (addr._id !== this.defaultAddress._id) {
                            console.log(addr.status);
                            if (addr.status === true) {
                                addr.status = false;
                                console.log(addr.status);
                                await receiving_addressService.update(addr._id, addr);
                                await this.fetchAllAddresses();
                            }
                        }
                    }
                }
            } catch {
                console.error(error);
            }
        }
    },

    computed: {
        getUserId() {
            return localStorage.getItem("userId");
        }
    },

    mounted() {
        this.fetchAllAddresses();
    }
}
</script>


<style>
/* address */
.account-address {
    font-size: 18px;
}

.account-btn-add-address {
    background-color: rgb(0, 81, 53);
    padding: 5px;
    border: none;
    color: white;
}

.account-btn-default {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: end;
    margin-bottom: 10px;
}

.btn-default {
    background-color: orange;
    color: white;
    border: 0.5px solid rgb(238, 95, 0);
}

.btn-default:hover {
    background-color: rgb(172, 113, 3);
    color: white;
    border: 0.5px solid rgb(238, 95, 0);
}

.account-address-phone {
    font-weight: bold;
    color: grey;
}

.account-divider {
    border: 0.5px solid rgb(168, 168, 168);
    margin-top: 10px;
    margin-bottom: 10px;
}

.account-edit-pass {
    color: green;
    font-weight: bold;
}

.btn-delete-address {
    background-color: white;
    border: 0.5px solid black;
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

.modal-body textarea {
    width: 100%;
    max-width: 100%;
    border: 0.5px solid black;
}

.modal-footer {
    justify-content: center;
}

.modal-btn-add-address {
    background-color: black;
    color: white;
}

.modal-btn-add-address:hover {
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
</style>