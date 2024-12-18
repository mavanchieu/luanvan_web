<template>
    <div class="account">
        <h5 class="font-weight-bold">TÀI KHOẢN</h5>
        <div class="account-row">
            <div class="account-staff mt-2">
                <div class="icon-staff">
                    <i class="fa-solid fa-user" style="color: #ffffff;"></i>
                </div>
                <div class="mt-2 ml-2">
                    <span class="text-white">Tài khoản nhân viên</span>
                    <br>
                    <span class="number-of-employ text-white">20</span>
                </div>
            </div>
            <div class="account-client mt-2">
                <div class="icon-client">
                    <i class="fa-solid fa-user" style="color: #ffffff;"></i>
                </div>
                <div class="mt-2 ml-2">
                    <span class="text-white">Tài khoản khách hàng</span>
                    <br>
                    <span class="number-of-client text-white">300</span>
                </div>
            </div>
            <div class="add-account mt-2">
                <div>
                    <button class="btn" data-toggle="modal" data-target="#exampleModal">
                        Thêm tài khoản nhân viên
                        <i class=" fa-solid fa-plus"></i>
                    </button>
                </div>
                <div>
                    <button class="btn">
                        Thêm tài khoản khách hàng
                        <i class=" fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="divider-account">
        </div>
        <div class="account-table mt-4">
            <h5>Tài khoản nhân viên</h5>
            <table class="table">
                <thead class="thead">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên đăng nhập</th>
                        <th scope="col">Mật khẩu</th>
                        <th scope="col">Ngày sinh</th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col" class="text-center"><i class="fa-solid fa-eye" style="color: #ffffff;"></i></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">2</th>
                        <td>chieuma</td>
                        <td>********</td>
                        <td>18/03/2002</td>
                        <td>Nam</td>
                        <td>0369951760</td>
                        <td>chieub2005665@student.ctu.edu.vn</td>
                        <td><a href="/account/detail" class="see-details">Xem Chi Tiết</a></td>
                    </tr>

                </tbody>
            </table>
        </div>
        <!-- Modal  tạo tài khoản -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title font-weight-bold" id="exampleModalLabel">TẠO TÀI KHOẢN</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
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
                            <input type="text" id="username">
                        </div>
                        <div class="mt-4">
                            <label for="phone">Số điện thoại</label>
                            <br>
                            <input type="number" id="phone">
                        </div>
                        <div class="mt-4">
                            <label for="pass1">Mật khẩu</label>
                            <br>
                            <input type="text" id="pass1">
                        </div>
                        <div class="mt-4">
                            <label for="pass2">Nhập lại mật khẩu</label>
                            <br>
                            <input type="text" id="pass2">
                        </div>
                    </div>
                    <div class="modal-footer text-center">
                        <button type="button" class="btn btn-add-account">Đăng Ký</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.account {
    font-family: 'Courier New', Courier, monospace;
    padding: 10px;
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

.add-account .btn {
    width: 270px;
    height: 40px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    font-size: 14px;
}

.add-account .btn i {
    margin-top: 0;
    color: rgb(0, 0, 0);
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