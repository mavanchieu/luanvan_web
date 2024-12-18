<template>
  <header>
    <div class="menu">
      <div class="accordion custom-accordion" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <router-link to="/profile" class="menu-link">
                <button class="btn btn-block text-left" type="button">
                  <span class="menu-space">
                    <i class="fa-regular fa-user"></i>
                    <span>Thông tin cá nhân</span>
                  </span>
                </button>
              </router-link>
            </h2>
          </div>
        </div>
        <div class="card" v-if="getUserRole == 'admin'">
          <div class="card-header" id="headingTwo">
            <h2 class="mb-0">
              <button class="btn btn-block text-left collapsed" type="button" data-toggle="collapse"
                data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <span class="menu-space"> <i class="fa-solid fa-list"></i> <span> Quản lý danh
                    mục</span></span>
              </button>
            </h2>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div class="card-body ml-4 ">
              <router-link to="/category/gender" class="menu-link">
                <p> <span><i class="fa-solid fa-venus-mars" style="color: #000000; width: 25px;"></i> Giới
                    tính</span>
                </p>
              </router-link>
              <router-link to="/category/brand" class="menu-link">
                <p> <span><i class="fa-solid fa-b" style="width: 25px;"></i> Nhãn hiệu</span>
                </p>
              </router-link>
              <router-link to="/category/type" class="menu-link">
                <p> <span><i class="fa-solid fa-t" style="width: 25px;"></i> Loại</span></p>
              </router-link>
              <router-link to="/category/type_detail" class="menu-link">
                <p> <span><i class="fa-solid fa-d" style="width: 25px;"></i></span><span> Chi tiết
                    loại</span></p>
              </router-link>
              <router-link to="/category/size" class="menu-link">
                <p> <span><i class="fa-solid fa-up-right-and-down-left-from-center" style="width: 25px;"></i>
                    Size</span></p>
              </router-link>
            </div>
          </div>
        </div>

        <div class="card" v-if="getUserRole == 'admin'">
          <div class="card-header" id="headingThree">
            <h2 class="mb-0">
              <button class="btn btn-block text-left collapsed" type="button" data-toggle="collapse"
                data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <span class="menu-space"> <i class="fa-brands fa-product-hunt"></i>
                  <span>
                    Quản lý sản phẩm</span>
                </span>
              </button>
            </h2>
          </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div class="card-body ml-4">
              <router-link to="/product" class="menu-link">
                <p> <span><i class="fa-solid fa-p" style="width: 25px;"></i> Tất cả sản
                    phẩm</span></p>
              </router-link>
              <router-link to="/product/evaluation" class="menu-link">
                <p> <span><i class="fa-regular fa-comment" style="width: 25px;"></i> Đánh giá sản
                    phẩm</span></p>
              </router-link>
            </div>
          </div>
        </div>


        <div class="card">
          <div class="card-header" id="heading4">
            <h2 class="mb-0">
              <button class="btn btn-block text-left collapsed" type="button" data-toggle="collapse"
                data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                <span class="menu-space"> <i class="fa-solid fa-file-invoice-dollar"></i>
                  <span>Quản lý đơn hàng</span></span>
              </button>
            </h2>
          </div>
          <div id="collapse4" class="collapse" aria-labelledby="heading4" data-parent="#accordionExample">
            <div class="card-body ml-4">
              <router-link to="/order_handle" class="menu-link">
                <p>
                  <span>
                    <i class="fa-solid fa-file-invoice" style="width: 25px;"></i>
                  </span>
                  <span>Đơn hàng chưa xác
                    nhận</span>
                </p>
              </router-link>
              <router-link to="/order_ordered" class="menu-link">
                <p> <span><i class="fa-solid fa-list-check" style="width: 25px;"></i> </span><span>Đơn hàng đã xác
                    nhận</span></p>
              </router-link>
              <router-link to="/order_completed" class="menu-link">
                <p> <span><i class="fa-solid fa-check" style="width: 25px;"></i> </span><span>Đơn hàng
                    đã được lên</span></p>
              </router-link>
              <router-link to="/order_shipping" class="menu-link">
                <p> <span><i class="fa-solid fa-truck-fast" style="width: 25px;"></i> </span><span>Đơn hàng đã vận
                    chuyển</span></p>
              </router-link>
              <router-link to="/category/brand" class="menu-link">
                <p> <span> <i class="fa-solid fa-repeat" style="width: 25px;"></i> </span><span>Đơn hàng đã
                    trả lại</span></p>
              </router-link>
            </div>
          </div>
        </div>

        <div class="card" v-if="getUserRole == 'admin'">
          <div class="card-header" id="headingEight">
            <h2 class="mb-0">
              <router-link to="/discountCodes" class="menu-link"> <button class="btn btn-block text-left" type="button">
                  <span class="menu-space"><i class="fa-solid fa-percent"></i><span>Quản lý khuyến mãi</span></span>
                </button></router-link>
            </h2>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingFive">
            <h2 class="mb-0">
              <router-link to="/statistical" class="menu-link">
                <button class="btn btn-block text-left collapsed" type="button" data-toggle="collapse"
                  data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                  <span class="menu-space"><i class="fa-solid fa-chart-simple"></i> <span> Thống
                      Kê</span></span>
                </button>
              </router-link>
            </h2>
          </div>
        </div>

        <div class="card" v-if="getUserRole == 'admin'">
          <div class="card-header" id="heading6">
            <h2 class="mb-0">
              <button class="btn btn-block text-left collapsed" type="button" data-toggle="collapse"
                data-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                <span class="menu-space"><i class="fa-solid fa-users"></i><span>Quản lý tài
                    khoản</span>
                </span>
              </button>
            </h2>
          </div>
          <div id="collapse6" class="collapse" aria-labelledby="heading6" data-parent="#accordionExample">
            <div class="card-body ml-4">
              <router-link to="/account/staff" class="menu-link">
                <p> <span><i class="fa-solid fa-user" style="width: 25px;"></i>
                  </span><span>Nhân viên bán hàng</span></p>
              </router-link>
              <router-link to="/account/warehouse_staff" class="menu-link">
                <p> <span><i class="fa-regular fa-user" style="width: 25px;"></i> Nhân viên
                    kho</span></p>
              </router-link>
              <router-link to="/account/client" class="menu-link">
                <p> <span><i class="fa-solid fa-users" style="width: 25px"></i> Khách hàng</span>
                </p>
              </router-link>
            </div>
          </div>
        </div>

        <div class="card" v-if="getUserRole == 'admin'">
          <div class="card-header" id="heading15">
            <h2 class="mb-0">
              <button class="btn btn-block text-left collapsed" type="button" data-toggle="collapse"
                data-target="#collapse15" aria-expanded="false" aria-controls="collapse15">
                <span class="menu-space"> <i class="fa-solid fa-pen"></i>
                  <span>Thiết kế</span>
                </span>
              </button>
            </h2>
          </div>
          <div id="collapse15" class="collapse" aria-labelledby="heading15" data-parent="#accordionExample">
            <div class="card-body ml-4">
              <router-link to="/seasonal_collection" class="menu-link">
                <p>
                  <span>
                    <i class="fa-solid fa-tree" style="width: 25px;"></i>
                  </span>
                  <span>
                    Bộ sưu tập theo mùa
                  </span>
                </p>
              </router-link>
              <router-link to="/brand_collection" class="menu-link">
                <p> <span><i style="width: 25px;" class="fa-solid fa-puzzle-piece"></i></span><span> Bộ sưu tập theo
                    nhãn hiệu</span></p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="heading12">
            <h2 class="mb-0">
              <router-link to="/help" class="menu-link"> <button class="btn btn-block text-left" type="button">
                  <span class="menu-space"><i class="fa-solid fa-question"></i><span>Trợ
                      giúp</span></span>
                </button></router-link>
            </h2>
          </div>

        </div>
        <div class="card">
          <div class="card-header" id="heading14">
            <h2 class="mb-0">
              <router-link to="/message" class="menu-link"> <button class="btn btn-block text-left" type="button">
                  <span class="menu-space"><i class="fa-regular fa-message"></i><span>Chat</span></span>
                </button></router-link>
            </h2>
          </div>
        </div>
        <!-- <div class="card">
          <div class="card-header" id="headingSeven">
            <h2 class="mb-0">
              <button @click="clickLogout" class="btn btn-logout  btn-block text-left collapsed" type="button"
                data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                <span class="menu-space"><img style="width: 25px;" src="/src/assets/logout.png" alt=""><span>ĐĂNG
                    XUẤT</span></span>
              </button>
            </h2>
          </div>
        </div> -->

      </div>

    </div>
  </header>
</template>

<script>
import Add_Account from '../account/Add_Account.vue';

export default {
  props: {
    defaultTab: {
      type: String,
      default: "profile",
    },
  },

  components: {
    Add_Account,
  },

  computed: {
    getUserRole() {
      return localStorage.getItem("role");
    }
  },
  methods: {

    clickLogout() {
      const confirmation = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
      if (confirmation) {
        this.logOut();
      }
    },
    async logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("fullname");
      localStorage.removeItem("role");
      await this.$router.push("/");
      window.location.reload();
    },

  }
}
</script>
<style scoped>
header {
  font-family: 'Courier New', Courier, monospace;
}

.menu {
  color: rgb(255, 255, 255);
  /* Màu nền menu */
  position: fixed;
  top: 50px;
  z-index: 100;
  width: 20%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow-y: auto;
  font-family: 'Times New Roman', Times, serif;
}

.name-menu {
  padding-top: 20px;
  padding-left: 20px;
}

.name-menu p {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
}

.menu-space {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-space:hover {
  color: white;
}

.menu-link {
  color: rgb(0, 0, 0);
  /* Đổi màu link */
  text-decoration: none;
  transition: color 0.3s ease-in-out, font-weight 0.3s ease-in-out;
}

.menu-link:hover {
  color: #00b4d8;
  font-weight: bold;
}

.router-link-active .menu-link {
  color: #0096c7;

  font-weight: bold;
}

.custom-accordion .card-header {
  background-color: #e7e6e6;
  /* Màu nền từng mục trong accordion */
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  border-bottom: 1px solid #000000;
}

.card-header h2 button {
  color: rgb(0, 0, 0);
  text-align: left;
  font-weight: bold;
}

.btn-block {
  padding: 12px 15px;
  text-align: left;
  background-color: transparent;
  border: none;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-block:hover {
  background-color: #3d3d3d;
  border-radius: 5px;
}

.btn-block:active {
  background-color: #575757;
}

.custom-accordion .btn:focus {
  box-shadow: none;
  outline: none;
}

.custom-accordion .btn-logout {
  background-color: #ff6b6b;
  color: white;
  font-weight: bold;
}

.custom-accordion .btn-logout:hover {
  background-color: #d43d3d;
}

.card-body p {
  display: flex;
  align-items: center;
  margin: 8px 0;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card-body p:hover {
  background-color: #343434;
  color: #00b4d8;
}

.card-body p img {
  margin-right: 10px;
  width: 25px;
}

.card-body .menu-link {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-body .menu-link:hover {
  text-decoration: none;
  color: #00b4d8;
}

.card-body {
  padding-left: 20px;
}
</style>
