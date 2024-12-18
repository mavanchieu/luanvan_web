<template>
  <header>
    <div class="homepage-header">
      <div class="row title">
        <router-link to="/" style="color: black; text-decoration: none; margin-left: 60px;">
          <p class="font-weight-bold">MC - SHOP</p>
        </router-link>
        <p style="width: 50%; font-weight: bold; font-family: 'Courier New', Courier, monospace">
          <marquee behavior="" direction="left"><span class="text-danger">12/12</span> SALE NHIỀU MẶT HÀNG KHÁC NHAU
          </marquee>
        </p>
        <p class="mr-4">
          <span>Cửa hàng | </span>
          <router-link to="/help" class="router-help"> <span>Trợ giúp | </span></router-link>

          <span v-if="getUsername"><a href="#" @click="openModalLogout" class="a-logout text-danger"
              style="text-decoration: none;">Đăng Xuất</a></span>
          <!-- <span v-else><a href="#" @click="openModal" class="a-signup">Đăng Ký</a></span> -->
          <span v-else><a href="#" @click="openModal" class="a-signin">Đăng nhập</a></span>
        </p>
      </div>
      <div class="row header">
        <div class="col-2 hello">
          <p v-if="getUsername">Xin chào, <router-link to="/account" style="text-decoration: none;"
              data-toggle="tooltip" data-placement="top" title="Thông tin cá nhân"><b> {{ getUsername
                }}</b></router-link></p>
          <p v-else="getUsername">Xin chào, <b>Bạn</b></p>
        </div>
        <div class="col-8 ">
          <div class="menu">
            <template v-for="gender in genders" :key="gender._id">
              <div class="menu-item" id="women-item">
                <a href="#" class="menu-item-a">{{ gender.name }}</a>
                <div class="dropdown-content">
                  <div class="row ml-4 d-flex text-left">
                    <template v-for="(groupedTypeDetails, typeId) in groupedTypeDetailsByTypeId(gender._id)"
                      :key="typeId">
                      <div class="col-4">
                        <div class="font-weight-bold">
                          <span style="font-size: 14px;">{{ types.find(type => type._id === typeId).name.toUpperCase()
                            }}</span>
                        </div>
                        <template v-for="typeDetail in groupedTypeDetails" :key="typeDetail._id">
                          <router-link style="border: none;"
                            :to="{ name: 'product', query: { name: typeDetail.name, genderId: gender._id, typeDetailId: typeDetail._id } }">
                            <span class="type_detail" style="font-size: 15px;">{{ typeDetail.name }}</span>
                          </router-link>
                          <br>
                        </template>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </template>

            <div class="menu-item" id="sale-item">
              <router-link to="/sale" id="sale-item">Sale</router-link>
            </div>
          </div>
        </div>
        <div class="col-2">
          <p style="margin-left: 110px;">
            <router-link to="/favorite" class="header-favorite"><i class="fa-regular fa-heart fa-lg"></i> </router-link>
            <router-link to="/cart" class="header-cart"><i
                class="fa-solid fa-bag-shopping fa-lg ml-4"></i></router-link>
          </p>
        </div>
      </div>
      <div class="row header-search">
        <div class="col-2"></div>
        <div class="col-8 search justify-center">
          <form class="mt-2 form-inline" @submit.prevent="addSearchName">
            <input v-model="search.searchName" @input="onSearchInput" class="form-control mr-sm-2 " type="search"
              placeholder="Tìm kiếm sản phẩm..." aria-label="Search" />
            <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <ul v-if="searchResults.length > 0" class="search-results">
            <li v-for="(product, index) in searchResults" :key="index" @click="selectProduct(product)">

              <div class="row">
                <div class="col-4">
                  <img width="100px"
                    :src="'http://localhost:3005/' + colorItems.find(colorItem => colorItem.productId === product._id)?.images[0]"
                    alt="">
                </div>
                <div class="col-8">
                  <span style="font-size: 17px; font-weight: bold; " @click="productDetails(product._id)">{{
                    product.name
                  }}</span>
                  <br>
                  <div v-if="product.discount != 0">
                    <span style="font-size: 15px; font-weight: bold;">
                      <span style="color:grey">Giá gốc:</span> <del class="text-danger">{{
                        formatPrice(colorItems.find(colorItem => colorItem.productId === product._id).price) }}
                        vnd</del>
                    </span>

                    <br>

                    <span style="font-size: 15px; font-weight: bold;">
                      <span style="color: grey;"> Giá sau khi giảm:</span> <span class="font-weight-bold"> {{
                        formatPrice(colorItems.find(colorItem => colorItem.productId === product._id).price -
                          (colorItems.find(colorItem => colorItem.productId === product._id).price *
                            product.discount / 100)) }}
                        vnd</span>
                    </span>
                  </div>

                  <span v-else style="font-size: 15px; font-weight: bold; ">
                    <span style="color: grey;">Giá: </span>{{ formatPrice(colorItems.find(colorItem =>
                      colorItem.productId ===
                      product._id).price) }} vnd <br>
                  </span>

                  <span style="color: grey; font-weight: bold; font-size: 15px;">Màu: </span>

                  <br>

                  <span v-for="color in colorItems" :key="color._id">
                    <span v-if="color.productId == product._id">
                      <p :style="{
                        backgroundColor: color.color, padding: '10px',
                        margin: '5px', cursor: 'pointer', width: '25px'
                      }" class="border border-dark ">
                      </p>
                    </span>
                  </span>

                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
  </header>
  <div v-if="isModalVisible" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <span class="close header-modal-close" @click="closeModal">&times;</span>
      <p class="header-name">
        <span :class="{ bold: currentForm === '2' }" v-if="currentForm2 === '0'" @click="signIn">Đăng Nhập</span>
        <span :class="{ bold: currentForm === '1' }" v-if="currentForm1 === '0'" @click="signUp">Đăng Ký</span>
      </p>
      <form v-if="currentForm === '1'" @submit.prevent="createUser">
        <div class="form-group">
          <label for="signup-username" class="mt-4">Tên đăng nhập</label>
          <input style="width: 400px;" type="text" class="form-control" id="signup-username" required
            pattern="^[a-zA-Z0-9]{8,}$" v-model="user.username" placeholder="Ít nhất 8 kí tự">
        </div>
        <div class="form-group">
          <label for="signup-phone">Số điện thoại</label>
          <input style="width: 400px;" type="text" class="form-control" id="signup-phone" v-model="user.phone"
            placeholder="Số điện thoại hợp lệ">
        </div>
        <div class="form-group">
          <label for="signup-password">Mật khẩu</label>
          <input style="width: 400px;" type="password" class="form-control" id="signup-password" v-model="user.password"
            required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$" placeholder="Ít nhất 6 kí tự">
        </div>
        <div class="form-group">
          <label for="signup-repeat-password">Nhập lại mật khẩu</label>
          <input style="width: 400px;" type="password" class="form-control" id="signup-repeat-password"
            v-model="user.repeatPassword" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
            placeholder="Ít nhất 6 kí tự">
        </div>
        <div class="form-group-btn-signup">
          <button type="submit" class="btn btn-signup">Đăng Ký</button>
        </div>
        <p class="text-center"></p>
      </form>
      <form v-if="currentForm === '2'" @submit.prevent="login">
        <div class="form-group">
          <label for="signin-username" class="mt-4">Tên đăng nhập</label>
          <input style="width: 400px;" type="text" class="form-control" id="signin-username" v-model="username">
        </div>
        <div class="form-group">
          <label for="signin-password">Mật khẩu</label>
          <input style="width: 400px;" type="password" class="form-control" id="signin-password" v-model="password">
        </div>
        <p class="text-danger">
          {{ messageLogin }}
        </p>
        <div class="form-group">
          <h6 class="forgot-password">Quên mật khẩu?</h6>
        </div>
        <div class="form-group-btn-signin">
          <button type="submit" class="btn btn-signin">Đăng Nhập</button>
        </div>
        <div class="signin-divider"></div>
        <div class="form-group mt-4">
          <p class="text-center">Hoặc đăng nhập với</p>
          <p class="text-center">
            <img style="width: 30px;" src="/src/assets/image/homepage/facebook.png" alt="">
            <img class="ml-2" style="width: 30px;" src="/src/assets/image/homepage/google.png" alt="">
          </p>
        </div>
      </form>
    </div>
  </div>
  <div v-if="isModalLogoutVisible" class="modal" @click.self="closeModalLogout">
    <div class="modal-content modal-content-logout">
      <form>
        Bạn có chắc chắn đăng xuất?
      </form>
      <p>
        <button class="btn-logout-no" @click="closeModalLogout">Hủy</button>
        <button class="btn-logout-yes" @click="logOut()">Đồng ý</button>
      </p>
    </div>
  </div>
</template>

<script>

import accessService from '@/services/access.service';
import genderService from '@/services/gender.service';
import productService from '@/services/product.service';
import searchService from '@/services/search.service';
import typeService from '@/services/type.service';
import type_detailService from '@/services/type_detail.service';
import UserService from '@/services/user.service';
import { error } from 'jquery';
import { debounce } from "lodash";
import colorItemService from '@/services/colorItem.service';
import { showErrorToast, showSuccessToast } from './shared/Toast.vue';
import * as yup from 'yup';
export default {
  data() {
    return {
      isModalVisible: false,
      isModalLogoutVisible: false,
      currentForm1: '0',
      currentForm2: '0',
      currentForm: '2',
      user: {
        username: '',
        phone: '',
        password: '',
        repeatPassword: '',
        role: "client",
        date: "",
      },
      signinUsername: '',
      signinPassword: '',
      message: '',
      username: '',
      password: '',
      messageLogin: '',
      usernameLogin: '',
      search: {
        searchName: '',
        userId: '',
      },
      getAllSearchName: typeof (Object),
      getAllSearchUserId: typeof (Object),

      // access
      access: {
        userId: '',
        date: '',
      },

      types: [],
      typeDetails: [],
      genders: [],

      products: [],
      colorItems: [],
      searchResults: [],
    };
  },

  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat().format(price);
    },

    async fetchProducts() {
      try {
        this.products = await productService.getAll();
        this.colorItems = await colorItemService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    async onSearchInput() {
      console.log('1');
      await this.debouncedSearch();
      console.log(this.searchResults);
    },

    // Phương thức tìm kiếm với debounce (giảm tần suất gọi API)
    debouncedSearch: debounce(async function () {
      const searchQuery = this.search.searchName.trim();
      if (searchQuery) {
        this.searchResults = await this.filterData(searchQuery);
        console.log(this.searchResults.length);
      } else {
        this.searchResults = [];
      }
    }, 300),

    async filterData(query) {
      await this.fetchProducts();
      return this.products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    },

    async productDetails(id) {

      await this.$router.push({ name: 'product/detail', params: { 'id': id } });
      this.search.searchName = "";
      this.searchResults = "";
    },

    groupedTypeDetailsByTypeId(genderId) {
      return this.typeDetails
        .filter(typeDetail => typeDetail.genderId === genderId)
        .reduce((acc, typeDetail) => {
          if (!acc[typeDetail.typeId]) {
            acc[typeDetail.typeId] = [];
          }
          acc[typeDetail.typeId].push(typeDetail);
          return acc;
        }, {});
    },
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    signUp() {
      this.currentForm = '1';
    },
    signIn() {
      this.currentForm = '2';
    },
    openModalLogout() {
      this.isModalLogoutVisible = true;
    },
    closeModalLogout() {
      this.isModalLogoutVisible = false;
    },

    async addSearchName() {
      // Gán userId và searchName
      this.getAllSearchName = null;
      this.getAllSearchUserId = null;
      this.search.searchName = this.search.searchName.toLowerCase();
      if (this.search.searchName === '') {
        showErrorToast("Vui lòng nhập thông tin tìm kiếm!");
        return;
      }
      try {
        this.search.userId = this.getuserId;
        this.getAllSearchName = await searchService.getAll();
        this.getAllSearchUserId = this.getAllSearchName.filter(search => search.userId === this.getuserId);
        if (this.getAllSearchUserId) {
          this.getAllSearchUserId = this.getAllSearchUserId.map(item => ({
            ...item,
            searchName: item.searchName.toLowerCase()
          }));
          const result = this.getAllSearchUserId.filter(search => search.searchName === this.search.searchName);
          if (result.length > 0) {
            this.$router.push({ name: 'search', query: { search: this.search.searchName } });
            return;
          }
          else {
            const message = await searchService.create(this.search);
            this.$router.push({ name: 'search', query: { search: this.search.searchName } });
            console.log(message);
          }
        }
        else {
          const message = await searchService.create(this.search);
          this.$router.push({ name: 'search', query: { search: this.search.searchName } });
          if (message) {
            console.log(message);
          }
        }
      } catch {
        error(error);
      }

    },

    async createUser() {
      const currentDate = new Date();

      const year = currentDate.getFullYear();         // Lấy năm hiện tại
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Lấy tháng (thêm 1 vì tháng bắt đầu từ 0) và đảm bảo có 2 chữ số
      const day = String(currentDate.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      this.user.date = formattedDate;
      if (this.user.password !== this.user.repeatPassword) {
        showErrorToast("Mật khẩu không khớp!");
        return;
      }
      try {
        const message = await UserService.create(this.user);
        this.message = "Bạn đã đăng ký thành công, vui lòng đăng nhập để sử dụng";
        if (message)
          showSuccessToast(this.message);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async login() {
      try {
        const response = await UserService.login({
          username: this.username,
          password: this.password,
        });

        const token = response.token;
        const username = response.user.username;
        const userId = response.user._id;
        const role = response.user.role;
        const password = response.user.password;

        // console.log(response);

        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId);
        localStorage.setItem("password", password);
        if (userId) {
          this.access.userId = userId;
          const currentDate = new Date();

          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const day = String(currentDate.getDate()).padStart(2, '0');
          const hours = String(currentDate.getHours()).padStart(2, '0');
          const minutes = String(currentDate.getMinutes()).padStart(2, '0');
          const seconds = String(currentDate.getSeconds()).padStart(2, '0');

          const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          this.access.date = formattedDateTime;
          const message = await accessService.create(this.access);
        }
        await this.$router.push("/");

        this.isModalVisible = false;
        window.location.reload();


      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.removeItem("password");

        this.messageLogin = "Tên đăng nhập hoặc mật khẩu không dúng!";
      }
    },
    async logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("password");
      await this.$router.push("/");
      window.location.reload();
    },

    async fetchTypes() {
      try {
        this.types = await typeService.getAll();
      } catch (error) {
        console.error(error);
      }
    },

    async fetchTypeDetails() {
      try {
        this.typeDetails = await type_detailService.getAll();
      } catch (error) {
        console.error(error);
      }
    },

    async fetchGenders() {
      try {
        this.genders = await genderService.getAll();
      } catch (error) {
        console.error(error);
      }
    }
  },

  async mounted() {
    await this.fetchTypes();
    await this.fetchTypeDetails();
    await this.fetchGenders();
    await this.fetchProducts();
  },

  computed: {
    getuserId() {
      return localStorage.getItem("userId");
    },
    getUsername() {
      return localStorage.getItem("username");
    },
    hasToken() {
      return localStorage.getItem("token") !== null;
    }
  },
}
</script>


<style scoped>
.homepage-header {
  position: fixed;
  z-index: 100;
  max-width: 100%;
  width: 100%;
}


.router-help {
  color: black;
}

.router-help:hover {
  color: black;
  text-decoration: none;
}

.menu {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.menu-item {
  position: relative;
  z-index: 101;
}

.menu-item a {
  text-decoration: none;
  color: black;
  font-size: 18px;
  display: inline-block;
  transition: border-bottom 0.3s ease;
  font-family: 'Courier New', Courier, monospace;

}

.menu-item a:hover {
  font-weight: bold;
  text-decoration: none;
  border-bottom: 2px solid black;
}

.menu .menu-item .dropdown-content {
  text-align: left;

}

.header-search {
  background-color: rgb(255, 255, 255);
  padding-bottom: 25px;
}

.a-signup {
  text-decoration: none;
  color: black;
  font-weight: normal;
}

.a-signup:hover {
  text-decoration: none;

}

.a-signin {
  text-decoration: none;
  color: black;
  font-weight: normal;
}

.a-signin:hover {
  text-decoration: none;

}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 100;
  font-size: 14;
  font-weight: 200;
  width: 700px;
}

.menu-item:hover .dropdown-content {
  display: block;
}

.dropdown-content p:hover {
  font-weight: bold;
}


/* Style cho phần chung */
.title {
  display: flex;
  justify-content: space-between;
  background-color: rgb(238, 237, 237);
  height: 30px;
  line-height: 30px;
  font-size: 10;
  font-family: 'Times New Roman', Times, serif;
}

#sale-item:hover {
  color: red;
}

.hello {
  font-weight: normal;
  font-family: 'Courier New', Courier, monospace;
  padding-left: 20px;
}

.header {
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 10;
  font-weight: bold;
  background-color: rgb(255, 255, 255);
}

.header-cart,
.header-favorite {
  color: black;
}

.seacrh {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.form-inline {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-control {
  margin-right: 10px;
  border-radius: 10px;
}

.btn {
  margin: 0;
  border-radius: 100px;
}

.modal {
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  right: -100px;
  width: 50%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: transform 0.6s ease-in-out;
  transform: translateX(100%);
  font-family: 'Courier New', Courier, monospace;
}

.modal.show {
  transform: translateX(0);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.modal-content-logout {
  background-color: #fff;
  padding: 20px;
  width: 100%;
  max-width: 350px;
  height: 40%;
  max-height: 150px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.close {
  position: absolute;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  top: 10px;
  right: 20px;
  bottom: 10px;

}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

.header-name {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 20px;
}

.bold {
  font-weight: bold;
  border-bottom: 2px solid black;
}

.btn-signup,
.btn-signin {
  background-color: black;
  color: white;
  border-radius: 5px;
  position: absolute;
  text-align: center;
}

.btn-signup:hover,
.btn-signin:hover {

  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 0px;

}

.header-modal-close {
  text-align: end;
  color: black;
}


.form-group-btn-signup,
.form-group-btn-signin {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

.forgot-password {
  text-align: end;
  margin-right: 20px;
  font-style: italic;
}

.forgot-password:hover {
  font-weight: bold;
}

.signin-divider {
  margin-top: 50px;
  border: 0.2px solid rgb(208, 206, 206);
}


.modal-content-logout p {
  padding-top: 10px;
  display: flex;
  gap: 20px;
  text-align: end;
}

.btn-logout-no {
  border: 0.5px solid black;
  background-color: white;
}

.btn-logout-no:hover {
  border: 0.5px solid black;
  background-color: rgb(79, 79, 79);
  color: white;
}

.btn-logout-yes {
  border: 0.5px solid rgb(0, 0, 0);
  background-color: rgb(0, 0, 0);
  color: white;
}

.btn-logout-yes:hover {
  border: 0.5px solid rgb(0, 0, 0);
  background-color: rgb(0, 89, 37);
  color: rgb(255, 255, 255);
}

/* Phong cách cho ô tìm kiếm */
.search-input {
  width: 100%;
  position: relative;
}

/* Danh sách kết quả tìm kiếm */
.search-results {
  position: absolute;
  width: 50%;
  padding-left: 0;
  background: #fff;
  border: 1px solid #000000;
  border-radius: 4px;
  list-style: none;
  max-height: 300px;
  overflow-x: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Courier New', Courier, monospace;
}

/* Mục trong danh sách */
.search-results li {
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
}

/* Hiệu ứng hover */
.search-results li:hover {
  background-color: #e3e3e3;
}
</style>