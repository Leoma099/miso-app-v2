<template>
    <div class="card card-body shadow-sm border-0">
        <div class="d-flex justify-content-between align-items-center">
            <p class="mb-0">BORROWER STATISTIC</p>
            <div>
                <select class="form-select" v-model="timeFrame" @change="fetchData">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
        </div>
        <div class="mt-3">
            <canvas ref="chartCanvas" height="300"></canvas>
        </div>
    </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

export default {
    data() {
        return {
            timeFrame: "daily", // Default timeframe
            myChart: null, // Store chart instance
            apiUrl: "http://127.0.0.1:8000/api/borrow", // Your Laravel API URL
        };
    },

    methods: {
        async fetchData() {
            try {
                const response = await axios.get(`${this.apiUrl}?timeframe=${this.timeFrame}`);
                this.processData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },

        processData(borrowData) {
            let labels = [];
            let data = [];

            if (this.timeFrame === "daily") {
                labels = borrowData.map(item => item.day);
                data = borrowData.map(item => item.total);
            } else if (this.timeFrame === "weekly") {
                labels = borrowData.map(item => `Week ${item.week}`);
                data = borrowData.map(item => item.total);
            } else if (this.timeFrame === "monthly") {
                labels = borrowData.map(item => item.month);
                data = borrowData.map(item => item.total);
            }

            // Ensure the canvas is ready before creating the chart
            this.$nextTick(() => {
                this.createChart(labels, data);
            });
        },

        createChart(labels, values) {
            if (!this.$refs.chartCanvas) {
                console.warn("Chart canvas not yet mounted.");
                return;
            }

            if (this.myChart) {
                this.myChart.destroy(); // Destroy previous chart before creating a new one
            }

            const ctx = this.$refs.chartCanvas.getContext("2d");
            if (!ctx) {
                console.error("Failed to get canvas context.");
                return;
            }

            this.myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Borrowed Equipment",
                            data: values,
                            backgroundColor: "#007bff",
                        }
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: "bottom" },
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: "Number of Requests",
                            },
                            beginAtZero: true,
                        },
                    },
                },
            });
        },
    },

    mounted() {
        this.fetchData(); // Fetch data when component loads
    },
};
</script>
