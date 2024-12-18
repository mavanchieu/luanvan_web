import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";


// createApp(App).use(router).mount("#app");
const app = createApp(App);

// Sử dụng router
app.use(router);

// Sử dụng Toast
app.use(Toast);

// Sử dụng bộ màu colorpicker
app.use(Vue3ColorPicker);

// Mount ứng dụng
app.mount("#app");