<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Hàm hiển thị thông báo thành công
export function showSuccessToast(message) {
  toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    theme: "light",
  });
}

// Hàm hiển thị thông báo lỗi
export function showErrorToast(message) {
  toast.error(message, {
    position: "top-right",
    autoClose: 1500,
    theme: "dark",
  });
}

</script>

<style>
.Toastify__toast {
  font-size: 13px !important;
}
</style>