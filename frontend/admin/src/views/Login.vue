<template>
  <div class="header">
    <span class="ml-4 font-weight-bold"> MC - SHOP</span>
  </div>
  <div class="row">
    <div class="col-4 content">
      <h1 class="font-weight-bold">MC - SHOP</h1>
      <h4 class="text-center">Shop bán quần áo, giày dép, phụ kiện </h4>
      <h3 class="font-weight-bold">Chất lượng, Úy Tín, Giá rẻ</h3>
    </div>
    <div class="col-8">
      <div class="login">
        <form @submit.prevent="login" class="form-login">
          <h4 class="text-center font-weight-bold">Đăng Nhập</h4>
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
            <h6 class="forgot-password font-weight-bold">Quên mật khẩu?</h6>
          </div>
          <div class="form-group-btn-signin text-center">
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
  </div>
</template>

<script>
import { showErrorToast } from "@/components/shared/Toast_Notification.vue";
import accessService from "@/services/access.service";
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      username: "",
      password: "",
      messageLogin: "",
      message: "",
      rememberMe: false,
      access: {
        userId: '',
        role: '',
        date: '',
        username: '',
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await UserService.login({
          username: this.username,
          password: this.password,
        });

        const token = response.token;
        const fullname = response.user.fullname;
        const userId = response.user._id;
        const role = response.user.role;
        const password = response.user.password;
        const username = response.user.username;

        console.log(response);

        localStorage.setItem("token", token);
        localStorage.setItem("fullname", fullname);
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);
        localStorage.setItem("password", password);
        localStorage.setItem("username", username);
        if (role == "admin" || role == "staff" || role == "wh_staff") {
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
          await this.$router.push("/profile");
          window.location.reload();
        }
        else {
          const message = "Tài khoản không tồn tại";
          showErrorToast(message);
        }

      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("fullname");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");

        this.messageLogin = "Tên đăng nhập hoặc mật khẩu không dúng!";
      }
    },
  },
};
</script>


<style scoped>
.header {
  display: flex;
  align-items: center;
  font-family: 'Courier New', Courier, monospace;
  height: 40px;
  color: rgb(0, 0, 0);
  font-size: 20px;
  background: linear-gradient(45deg, #ffffff, #35006a);
}

.content {
  background-color: black;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: fixed;
  color: white;
  padding-top: 200px;
}

.login {
  font-family: 'Courier New', Courier, monospace;
  position: relative;
  margin-left: 750px;
}

.form-login {
  margin: 0 auto;
  margin-top: 50px;
  padding: 40px;
  width: 470px;
  border: 0.5px solid black;
  border-radius: 20px;
  box-shadow: 10px 10px 5px rgb(0, 0, 0);
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

.forgot-password {
  text-align: end;
}

.btn-signin {
  background-color: black;
  color: white;
  border-radius: 5px;
}

.btn-signin:hover {
  background-color: rgb(255, 255, 255);
  color: black;
  border-radius: 0px;
  border: 0.5px solid black;
}

.signin-divider {
  border: 0.5px solid rgb(219, 217, 217);
  margin-left: 20px;
  margin-left: 20px;
  margin-top: 15px;
}
</style>