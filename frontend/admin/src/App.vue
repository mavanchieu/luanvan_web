<template>
  <div id="app">
    <div v-if="getuserId">
      <AppHeader />
      <div class="action">
        <router-view />
      </div>
      <!-- Hiển thị Menu với Profile mặc định nếu có userId -->
      <Menu :defaultTab="defaultTab" />
    </div>
    <div v-else>
      <div class="">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/homepage/AppHeader.vue";
import Menu from "@/components/homepage/Menu.vue";

export default {
  components: {
    AppHeader,
    Menu,
  },
  data() {
    return {
      userId: localStorage.getItem("userId"), // Lấy userId từ localStorage khi trang được tải
      defaultTab: "profile", // Mặc định tab Profile nếu có userId
    };
  },
  computed: {
    getuserId() {
      return this.userId;
    },
  },
  mounted() {
    window.addEventListener("storage", this.handleStorageChange); // Lắng nghe sự thay đổi trong localStorage
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.handleStorageChange); // Hủy lắng nghe khi component bị hủy
  },
  methods: {
    handleStorageChange(event) {
      // Kiểm tra sự thay đổi trên localStorage (khi userId bị thay đổi)
      if (event.key === "userId") {
        this.userId = localStorage.getItem("userId"); // Cập nhật lại trạng thái đăng nhập
        if (!this.userId) {
          this.$router.push({ name: "login" }); // Nếu không còn userId, điều hướng tới trang đăng nhập
        }
      }
    },
  },
};
</script>

<style>
  .action {
    padding-top: 50px;
    padding-left: 20%;
  }
</style>
