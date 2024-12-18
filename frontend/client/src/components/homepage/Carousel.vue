<template>
  <div class="carousel">
    <div id="carouselExampleControlsNoTouching" class="carousel slide" data-touch="false" data-interval="false">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img style="width: 400px; height: 400px;" src="/src/assets/image/homepage/air_max.jpg" class="d-block mx-auto"
            alt="...">
          <div class="carousel-caption d-none d-md-block" style="padding-left: 15%;padding-right: 15%;">
            <h5>Đa dạng mẫu mã</h5>
            <p class="text-danger font-weight-bold">Với nhiều màu sắc và kích cỡ, cho phép khách hàng có nhiều lựa chọn
            </p>
          </div>

        </div>
        <div class="carousel-item">
          <img style="width: 400px; height:400px; object-fit: contain;" src="/src/assets/image/homepage/banner.jpg"
            class="d-block mx-auto" alt="...">

        </div>
        <div class="carousel-item">
          <img style="width: 400px; height: 400px; object-fit: contain;" src="/src/assets/image/homepage/banner_1.jpg"
            class="d-block mx-auto" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" id="next" type="button" data-target="#carouselExampleControlsNoTouching"
        data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </button>
      <button class="carousel-control-next" id="next" type="button" data-target="#carouselExampleControlsNoTouching"
        data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </button>
    </div>
  </div>

</template>

<style scoped>
#next,
#prev {
  color: black;
  background-color: rgb(173, 171, 171);
}

.carousel {
  font-family: 'Courier New', Courier, monospace;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 50px;
}



.carousel-control-prev-icon {
  color: black;
}
</style>

<!-- <template>
  <div class="speech-recognition">
    <h1>Voice Search</h1>
    <input type="text" v-model="transcript" placeholder="Your search will appear here" readonly />
    <button @click="toggleRecognition" :class="{ listening: isListening }">
      <i class="fas fa-microphone"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recognition: null, // Đối tượng SpeechRecognition
      isListening: false, // Trạng thái lắng nghe
      transcript: "", // Văn bản sau khi nhận diện
    };
  },
  methods: {
    initializeRecognition() {
      // Kiểm tra trình duyệt hỗ trợ Web Speech API
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert("Your browser does not support Web Speech API.");
        return;
      }

      // Khởi tạo SpeechRecognition
      this.recognition = new SpeechRecognition();
      this.recognition.lang = "vi-VN"; // Ngôn ngữ Tiếng Việt
      this.recognition.interimResults = false; // Không lấy kết quả tạm thời

      // Xử lý sự kiện khi có kết quả
      this.recognition.addEventListener("result", (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        this.transcript = transcript;
      });

      // Khi kết thúc nhận diện, thực hiện tìm kiếm
      this.recognition.addEventListener("end", () => {
        this.isListening = false;
        this.performSearch(); // Gọi hàm tìm kiếm
      });
    },
    toggleRecognition() {
      if (!this.recognition) return;

      if (this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      } else {
        this.recognition.start();
        this.isListening = true;
      }
    },
    performSearch() {
      // Gửi transcript để tìm kiếm
      if (this.transcript.trim()) {
        alert(`Searching for: "${this.transcript}"`);
        // Thực hiện tìm kiếm (ví dụ: gọi API hoặc điều hướng)
      } else {
        alert("No input detected. Please try again.");
      }
    },
  },
  mounted() {
    this.initializeRecognition();
  },
};
</script>

<style scoped>
.speech-recognition {
  text-align: center;
  margin-top: 50px;
}

input {
  width: 80%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
}

button {
  background-color: #f04e30;
  border: none;
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
}

button.listening {
  background-color: #ff7f50;
}

button i {
  font-size: 24px;
}
</style> -->
