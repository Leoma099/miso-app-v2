<template>
    <div class="card card-body shadow-sm border-0 rounded-0">
        <p class="mb-0">Borrow Statistics</p>
        <div class="metric-chart">
            <canvas ref="lineReport" height="300"></canvas>
        </div>
    </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import apiClient from "@/services/index"; // Your API client (axios)

Chart.register(...registerables);

export default {
    data() {
        return {
            lineChart: null,
        };
    },

    methods: {
        async fetchBorrowStatistics() {
            try {
                const response = await apiClient.get('/borrow-statistics');
                const borrowStats = response.data;
                
                // Mapping numeric status to labels
                const labels = ["Pending", "Approved", "Returned"];
                const data = [
                    borrowStats.pending,  // Corresponds to status 1 (Pending)
                    borrowStats.approved, // Corresponds to status 2 (Approved)
                    borrowStats.returned  // Corresponds to status 3 (Returned)
                ];

                // Create the chart with real data
                this.createLineChart(labels, data);
            } catch (error) {
                console.error("Error fetching borrow statistics:", error);
            }
        },

        createLineChart(labels, values) {
            if (this.lineChart) {
                this.lineChart.destroy();
            }

            this.lineChart = new Chart(this.$refs.lineReport.getContext("2d"), {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Borrow Status",
                            data: values,
                            fill: true,
                            borderColor: "#367096", // Line color
                            backgroundColor: "rgba(2, 61, 84, 0.2)", // Area fill color
                            tension: 0.4, // Smooth curve
                            pointRadius: 3, // Remove point markers
                        },
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "bottom",
                        }
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: "Number of Borrows"
                            },
                            beginAtZero: true,
                        }
                    },
                }
            });
        }
    },

    mounted() {
        this.fetchBorrowStatistics(); // Fetch the data when component is mounted
    },

    watch: {
        timeFrame() {
            this.fetchBorrowStatistics(); // Refetch data if timeFrame changes
        },
    }
};
</script>

<style scoped>
.metric-chart {
    height: 300px;
    padding: 20px;
}
</style>
