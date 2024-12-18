<template>
  <div class="message">
    <!-- Nút để mở modal -->
    <button class="message-button" @click="toggleModal">💬</button>

    <!-- Modal hiển thị tin nhắn -->
    <transition name="fade">
      <div v-if="isModalVisible" class="message-modal">
        <h6 class="font-weight-bold" style="border-bottom: 1px solid black; margin-bottom: 10px; padding-bottom: 10px;">
          Chat với cửa hàng</h6>

        <!-- Danh sách tin nhắn -->
        <div ref="messageList" class="message-list">
          <div v-for="(msg, index) in messages" :key="index"
            :class="['message-item', msg.status === '0' ? 'right' : 'left']">
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
import { data } from "jquery";
import io from 'socket.io-client';

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
      data: {
        'status': '0',
        'userId': '',
        'content': '',
      },
    };
  },
  methods: {
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    async sendMessage() {
      if (this.data.content.trim() === "") {
        alert("Vui lòng nhập tin nhắn!");
        return;
      }

      this.data.userId = this.getUserId;

      try {
        await messageService.create(this.data);
        await this.fetchMessage();
        this.data.content = "";
        this.scrollToBottom(); // Cuộn xuống dưới cùng
      } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error);
      }
    },
    async fetchMessage() {
      try {
        const allMessages = await messageService.getAll();
        this.messages = allMessages.find(
          (mess) => mess.userId === this.getUserId
        )?.message || [];
        this.$nextTick(() => {
          this.scrollToBottom(); // Cuộn xuống sau khi tin nhắn được tải
        });
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
      await this.fetchMessage();
    });
  },

  async created() {
    await this.fetchMessage();
  },
};
</script>

<style scoped>
.message {
  font-family: 'Courier New', Courier, monospace;
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
  color: #0c5460;
  margin-left: auto;
  text-align: left;
  border: 1px solid #bee5eb;
}

/* Tin nhắn căn trái */
.message-item.left {
  background-color: #f8d7da;
  color: #721c24;
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
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
}

.message-input:focus {
  border-color: #007bff;
}

/* Nút gửi tin nhắn */
.send-btn {
  position: absolute;
  right: 10px;
  top: 40%;
  transform: translateY(-50%);
  background-color: transparent;
  color: #007bff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
}


.send-btn i {
  font-size: 18px;
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
</style>
