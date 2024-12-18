<template>
  <header>
    <div class="header">
      <span class="font-weight-bold">MC - SHOP</span>
      <div class="dropdown mr-4">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle d-flex align-items-center" type="button"
            data-toggle="dropdown" aria-expanded="false">
            <span class="mr-2"> Xin chào, <b>{{ getUsername }}</b></span>
          </button>
          <div class="dropdown-menu">
            <button class="dropdown-item" @click="logOut">Đăng xuất</button>
          </div>
        </div>

      </div>
    </div>

  </header>
</template>

<script>
export default {
  computed: {
    getUsername() {
      return localStorage.getItem("username");
    }
  },

  methods: {
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
.header {
  background-color: black;
  position: fixed;
  z-index: 100;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 70px;
  color: rgb(0, 0, 0);
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  background: linear-gradient(45deg, #ffffff, #35006a);
  display: flex;
  justify-content: space-between;
}

.btn-username {
  background-color: white;
  color: black;
}

.menu {
  background-color: #f0f0f0;
  position: fixed;
  top: 50px;
  z-index: 100;
  width: 20%;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
}
</style>
