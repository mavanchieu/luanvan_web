<template>
    <div>
        <span style="font-weight: bold; font-size: 18px">Biểu đồ thống kê số lượng truy cập của khách hàng theo
            năm</span>
        <br>
        <label for="selectedYear">Chọn năm</label>
        <select class="ml-4" id="selectedYear" v-model="selectedYear" @change="filterAccessByYear">
            <option v-for="year in years" :key="year" :value="year">
                {{ year }}
            </option>
        </select>

        <div style="width: 700px; height: 500px;">
            <canvas id="accessChart" width="400" height="200"></canvas>
        </div>

    </div>
</template>

<script>
import Chart from "chart.js/auto";
import accessService from "@/services/access.service";
import userService from "@/services/user.service";

export default {
    data() {
        return {
            accesses: [],            // Dữ liệu truy cập
            totalByMonth: {},        // Thống kê truy cập theo tháng-năm
            selectedYear: new Date().getFullYear(), // Mặc định chọn năm hiện tại
            years: [],               // Danh sách các năm
            users: [],
        };
    },

    async mounted() {

        await this.fetchAccessData();
    },

    methods: {
        // Lấy dữ liệu truy cập từ server

        async fetchUsers() {
            try {
                this.users = await userService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async fetchAccessData() {
            try {
                await this.fetchUsers();
                this.accesses = await accessService.getAll();  // Lấy tất cả dữ liệu truy cập
                // Lấy danh sách các năm có trong dữ liệu
                this.accesses = this.accesses.filter(acc =>
                    this.users.some(user => user._id === acc.userId && user.role === "client")
                );

                console.log("ACC", this.accesses);


                console.log("ACC", this.accesses);

                this.years = [...new Set(this.accesses.map(access => new Date(access.date).getFullYear()))];

                // Thống kê dữ liệu theo tháng và năm
                this.totalByMonth = this.calculateTotalByMonth(this.accesses);

                // Vẽ biểu đồ cho năm mặc định
                this.renderChart();
            } catch (error) {
                console.log(error);
            }
        },

        // Hàm tính tổng truy cập theo tháng-năm
        calculateTotalByMonth(accesses) {
            const totalByMonth = {};

            accesses.forEach(access => {
                const date = new Date(access.date); // Lấy ngày từ trường date
                const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

                if (totalByMonth[monthYear]) {
                    totalByMonth[monthYear] += 1;  // Cộng thêm 1 cho mỗi truy cập
                } else {
                    totalByMonth[monthYear] = 1;   // Nếu chưa có, khởi tạo bằng 1
                }
            });

            return totalByMonth;
        },

        // Lọc truy cập theo năm được chọn
        filterAccessByYear() {
            // Lọc các truy cập theo năm được chọn
            const filteredAccesses = this.accesses.filter(access => {
                const accessYear = new Date(access.date).getFullYear();
                return accessYear === parseInt(this.selectedYear);
            });

            // Tính lại tổng truy cập theo tháng cho năm đã chọn
            this.totalByMonth = this.calculateTotalByMonth(filteredAccesses);

            // Vẽ lại biểu đồ thống kê cho năm đã chọn
            this.renderChart();
        },

        // Vẽ biểu đồ thống kê truy cập
        // Vẽ biểu đồ thống kê truy cập
        renderChart() {
            // Lấy các khóa (tháng-năm) và sắp xếp chúng theo thứ tự tăng dần
            const labels = Object.keys(this.totalByMonth).sort((a, b) => {
                const [yearA, monthA] = a.split('-').map(Number);
                const [yearB, monthB] = b.split('-').map(Number);
                if (yearA === yearB) {
                    return monthA - monthB;  // Sắp xếp theo tháng nếu năm giống nhau
                }
                return yearA - yearB;  // Sắp xếp theo năm
            });

            // Lấy dữ liệu tương ứng với các tháng đã sắp xếp
            const data = labels.map(label => this.totalByMonth[label]);

            const ctx = document.getElementById("accessChart").getContext("2d");

            // Kiểm tra xem biểu đồ đã được khởi tạo hay chưa, nếu có thì hủy biểu đồ cũ
            if (this.chartInstance) {
                this.chartInstance.destroy();
            }

            // Tạo mới biểu đồ
            this.chartInstance = new Chart(ctx, {
                type: "bar",  // Loại biểu đồ
                data: {
                    labels,
                    datasets: [
                        {
                            label: "Số lần truy cập",
                            data,
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                            barThickness: 50,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: true,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return `Số lần truy cập: ${tooltipItem.raw}`;
                                },
                            },
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value.toLocaleString(); // Hiển thị số theo định dạng có dấu phân cách
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