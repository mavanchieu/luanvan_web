<template>
  <div class="message">

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">UserID</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Email</th>
          <th scope="col" class="text-center">Chat</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="mess in messages" :key="_id">
          <template v-for="user in users" :key="_id">
            <tr v-if="user._id == mess.userId">
              <th scope="row">{{ user.username }}</th>
              <td>{{ user.phone }}</td>
              <td>{{ user.email }}</td>
              <td class="text-center"><button @click="toggleModal(mess.userId)"
                  style="border: none; background: transparent;"><i class="fa-regular fa-bell"></i></button></td>
            </tr>
          </template>

        </template>
      </tbody>
    </table>
    <!-- Nút để mở modal -->


    <!-- Modal hiển thị tin nhắn -->
    <transition name="fade">
      <div v-if="isModalVisible" class="message-modal">
        <span class="d-flex-header"><span class="text-danger">Cửa hàng</span><span><button
              @click="closeModal">Đóng</button></span></span>

        <!-- Danh sách tin nhắn -->
        <div ref="messageList" class="message-list">
          <div v-for="(msg, index) in messagesByUserId" :key="index"
            :class="['message-item', msg.status === '0' ? 'left' : 'right']">
            {{ msg.content }}
          </div>
        </div>

        <!-- Ô nhập tin nhắn với nút gửi bên trong -->
        <div class="input-container">
          <input type="text" v-model="data.content" class="message-input" placeholder="Nhập tin nhắn..." />
          <button @click="sendMessage" class="send-btn">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import messageService from "@/services/message.service";
import userService from "@/services/user.service";
import { data } from "jquery";
import io from 'socket.io-client';
import { showErrorToast } from "../shared/Toast_Notification.vue";

export default {
  computed: {
    getUserId() {
      return localStorage.getItem("userId");
    },
  },
  data() {
    return {
      isModalVisible: false,
      messages: [],
      messagesByUserId: [],
      users: [],
      data: {
        'status': '1',
        'userId': '',
        'content': '',
      },
    };
  },
  methods: {
    async fetchUsers() {
      try {
        this.users = await userService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    closeModal() {
      this.isModalVisible = false;
    },

    toggleModal(userId) {
      this.isModalVisible = !this.isModalVisible;
      this.data.userId = userId;
      this.fetchMessageByUserId(userId);
    },

    async sendMessage() {
      if (this.data.content.trim() === "") {
        showErrorToast("Vui lòng nhập tin nhắn!");
        return;
      }
      try {
        await messageService.create(this.data);
        await this.fetchMessage();
        await this.fetchMessageByUserId(this.data.userId);
        this.data.content = "";
        this.scrollToBottom(); // Cuộn xuống dưới cùng
      } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error);
      }
    },

    async fetchMessageByUserId(userId) {
      try {
        this.messagesByUserId = this.messages.find(
          (mess) => mess.userId === userId
        )?.message || [];
        this.$nextTick(() => {
          this.scrollToBottom(); // Cuộn xuống sau khi tin nhắn được tải
        });
      } catch (error) {
        console.error("Lỗi khi tải tin nhắn:", error);
      }
    },

    async fetchMessage() {
      try {
        this.messages = await messageService.getAll();
      } catch (error) {
        console.error("Lỗi khi tải tin nhắn:", error);
      }
    },

    scrollToBottom() {
      const messageList = this.$refs.messageList;
      if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
      }
    },
  },


  mounted() {
    const socket = io('http://localhost:3005');
    socket.on('createMessage', async (data) => {
      console.log(data);
      await this.fetchUsers();
      await this.fetchMessage();
      await this.fetchMessageByUserId(this.data.userId);
    });
  },

  async created() {
    await this.fetchMessage();
    await this.fetchUsers();
  },
};
</script>

<style scoped>
.message {
  font-family: 'Courier New', Courier, monospace;
  padding: 10px;
}

/* Nút hiển thị modal */
.message-button {
  position: fixed;
  z-index: 300;
  right: 20px;
  bottom: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* Modal */
.message-modal {
  position: fixed;
  z-index: 400;
  right: 20px;
  bottom: 80px;
  background-color: white;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Danh sách tin nhắn */
.message-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Tin nhắn */
.message-item {
  display: inline-block;
  margin: 5px 0;
  padding: 10px 15px;
  border-radius: 12px;
  word-wrap: break-word;
  word-break: break-word;
  max-width: 70%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  line-height: 1.5;
}

/* Tin nhắn căn phải */
.message-item.right {
  background-color: #d1ecf1;
  color: #000000;
  margin-left: auto;
  text-align: left;
  border: 1px solid #bee5eb;
}

/* Tin nhắn căn trái */
.message-item.left {
  background-color: #ffffff;
  color: #000000;
  margin-right: auto;
  text-align: left;
  border: 1px solid #f5c6cb;
}

/* Chứa input và nút gửi bên trong */
.input-container {
  position: relative;
  width: 100%;
}

/* Ô nhập tin nhắn */
.message-input {
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  /* Để không bị che khuất bởi nút gửi */
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
}

.message-input:focus {
  border-color: #007bff;
  /* Đổi màu border khi focus */
}

/* Nút gửi tin nhắn */
.send-btn {
  position: absolute;
  right: 10px;
  top: 40%;
  transform: translateY(-50%);
  /* Căn giữa theo chiều dọc */
  background-color: transparent;
  color: #007bff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
}

/* Thêm hiệu ứng cho icon */
.send-btn i {
  font-size: 18px;
  /* Chỉnh kích thước icon */
}

/* Hiệu ứng fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.d-flex-header {
  display: flex;
  justify-content: space-between;
}

.d-flex-header button {
  color: black;
  background: transparent;
  border: none;
}

.d-flex-header button:hover {
  color: black;
  background: transparent;
  background-color: #ccc;
}
</style>
