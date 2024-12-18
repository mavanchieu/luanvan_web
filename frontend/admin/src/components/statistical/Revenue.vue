<template>
  <div>
    <!-- Dropdown chọn năm -->
    <span style="font-weight: bold; font-size: 18px">Biểu đồ thống kê doanh thu theo năm</span>
    <br>
    <label for="selectedYear">Chọn năm</label>
    <select class="ml-4" id="selectedYear" v-model="selectedYear" @change="filterRevenueByYear">
      <option v-for="year in years" :key="year" :value="year">
        {{ year }}
      </option>
    </select>

    <!-- Biểu đồ doanh thu -->
    <div style="width: 700px; height: 500px;">
      <canvas id="revenueChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import orderService from "@/services/order.service";

export default {
  data() {
    return {
      orders: [],
      shipping: [],
      totalByMonth: {},
      selectedYear: new Date().getFullYear(), // Mặc định chọn năm hiện tại
      years: [],   // Danh sách các năm
    };
  },
  async mounted() {
    await this.fetchOrders();
    this.filterRevenueByYear();
  },
  methods: {

    async fetchOrders() {
      try {
        this.orders = await orderService.getAll();
        this.shipping = this.orders.filter(order => order.status == '2');

        // Lấy danh sách các năm có trong dữ liệu // lọc trùng năm
        this.years = [...new Set(this.shipping.map(order => new Date(order.toDate).getFullYear()))];

      } catch (error) {
        console.log(error);
      }
    },

    // Hàm tính tổng doanh thu theo tháng-năm
    calculateTotalByMonth(orders) {
      const totalByMonth = {};

      orders.forEach(order => {
        const toDate = new Date(order.toDate);
        const monthYear = `${toDate.getFullYear()}-${toDate.getMonth() + 1}`;

        if (totalByMonth[monthYear]) {
          totalByMonth[monthYear] += parseFloat(order.totalPrice);
        } else {
          totalByMonth[monthYear] = parseFloat(order.totalPrice);
        }
      });

      return totalByMonth;
    },

    // Lọc doanh thu theo năm được chọn
    filterRevenueByYear() {
      // Lọc các đơn hàng theo năm được chọn
      const filteredOrders = this.shipping.filter(order => {
        const orderYear = new Date(order.toDate).getFullYear();
        return orderYear === parseInt(this.selectedYear);
      });

      // Tính lại tổng doanh thu theo tháng cho năm đã chọn
      this.totalByMonth = this.calculateTotalByMonth(filteredOrders);

      this.renderChart();
    },

    // Vẽ biểu đồ doanh thu
    renderChart() {
      // Lấy các tháng-năm và doanh thu từ totalByMonth
      const labels = Object.keys(this.totalByMonth);
      const data = Object.values(this.totalByMonth);

      // Sắp xếp các tháng-năm theo thứ tự thời gian tăng dần
      const sortedData = Object.entries(this.totalByMonth)
        .sort((a, b) => {
          // Lấy tháng và năm từ chuỗi "YYYY-MM"
          const [yearA, monthA] = a[0].split('-');
          const [yearB, monthB] = b[0].split('-');

          // Sắp xếp theo thứ tự năm và tháng
          return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
        });

      // Cập nhật lại labels và data sau khi sắp xếp
      const sortedLabels = sortedData.map(entry => entry[0]);
      const sortedValues = sortedData.map(entry => entry[1]);

      const ctx = document.getElementById("revenueChart").getContext("2d");

      // Kiểm tra xem biểu đồ đã được khởi tạo hay chưa, nếu có thì hủy biểu đồ cũ
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Tạo mới biểu đồ
      this.chartInstance = new Chart(ctx, {
        type: "bar",  // Loại biểu đồ
        data: {
          labels: sortedLabels, // Cập nhật các tháng-năm đã sắp xếp
          datasets: [
            {
              label: "Doanh thu (VNĐ)",
              data: sortedValues, // Cập nhật doanh thu đã sắp xếp
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              barThickness: 50,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `Doanh thu: ${tooltipItem.raw.toLocaleString()} VNĐ`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value.toLocaleString();
                },
              },
            },
          },
        },
      });
    }

  }
};
</script>

<style>
.Toastify__toast {
  font-size: 13px !important;
}
</style>
