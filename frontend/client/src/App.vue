<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import Message from "@/components/message/Message.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
    Message
  },

  computed: {
    getUserId() {
      return localStorage.getItem('userId');
    }
  }
};
</script>

<template>
  <div id="app">
    <AppHeader />
    <div class="action">
      <router-view />
    </div>
    <div v-if="getUserId">
      <Message />
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.action {
  padding-top: 130px;
}
</style>
