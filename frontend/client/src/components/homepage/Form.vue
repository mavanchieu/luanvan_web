<template>
  <div v-if="isModalVisible" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <span class="close header-modal-close" @click="closeModal">&times;</span>
      <p class="header-name">
        <span :class="{ bold: currentForm === '1' }" v-if="currentForm1 === '0'" @click=signUp()>Đăng Ký</span>
        <span :class="{ bold: currentForm === '2' }" v-if="currentForm2 === '0'" @click=signIn()>Đăng Nhập</span>
      </p>
      <form v-if="currentForm === '1'">
        <div class="form-group">
          <label for="signup-username" class="mt-4">Tên đăng nhập</label>
          <input style="width: 400px;" type="text" class="form-control" id="signup-username">
        </div>
        <div class="form-group">
          <label for="signup-phone">Số điện thoại</label>
          <input style="width: 400px;" type="text" class="form-control" id="signup-phone">
        </div>
        <div class="form-group">
          <label for="signup-password">Mật khẩu</label>
          <input style="width: 400px;" type="password" class="form-control" id="signup-password">
        </div>
        <div class="form-group">
          <label for="signup-repeat-password">Nhập lại mật khẩu</label>
          <input style="width: 400px;" type="password" class="form-control" id="signup-repeat-password">
        </div>
        <div class="form-group-btn-signup">
          <button type="submit" class="btn btn-signup">Đăng Ký</button>
        </div>
        <p class=" text-center"></p>
      </form>
      <form v-if="currentForm === '2'">
        <div class="form-group">
          <label for="signup-username" class="mt-4">Tên đăng nhập</label>
          <input style="width: 400px;" type="text" class="form-control" id="signup-username">
        </div>

        <div class="form-group">
          <label for="signup-password">Mật khẩu</label>
          <input style="width: 400px;" type="password" class="form-control" id="signup-password">
        </div>
        <div class="form-group">
          <h6 class="forgot-password">Quên mật khẩu?</h6>
        </div>
        <div class="form-group-btn-signin">
          <button type="submit" class="btn btn-signin">Đăng Nhập</button>
        </div>
        <div class="signin-divider">
        </div>
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
</template>

<script>
export default {

  data() {
    return {
      isModalVisible: false,
      isModalLogoutVisible: false,
      currentForm1: '0',
      currentForm2: '0',
      currentForm: '1',

    };
  },
  methods: {
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
    }
    ,
    openModalLogout() {
      this.isModalLogoutVisible = true;
    },
    closeModalLogout() {
      this.isModalLogoutVisible = false;
    },
  }
};
</script>