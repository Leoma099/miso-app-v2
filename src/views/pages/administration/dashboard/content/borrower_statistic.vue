<template>

    <div class="card card-body shadow-sm border-0 rounded-0">

        <p class="mb-0">Borrower Status</p>

        <div class="metric-chart">
            <canvas ref="doughnutChart" height="300"></canvas>
        </div>
    </div>
    
</template>

<script>
import { Chart, registerables } from "chart.js";
import apiClient from "@/services/index"; // Your API client (axios)
Chart.register(...registerables);

export default
{
    data()
    {
        return {
            doughnutChart: null,
        };
    },

    methods:
    {
        async fetchAvailabilityData()
        {
            try
            {
                const response = await apiClient.get("/borrow-statistics");
                const borrowStatus = response.data;

                this.createDoughnutChart(borrowStatus.pending, borrowStatus.approved, borrowStatus.declined, borrowStatus.recieved, borrowStatus.returned);
            }
            catch (error)
            {
                console.error("Error fetching equipment availability data:", error);
            }
        },

        createDoughnutChart(pending, approved, declined, recieved, returned)
        {
            if (this.doughnutChart)
            {
                this.doughnutChart.destroy();
            }

            const data =
            {
                labels: ["Pending", "Approved", "Declined", "Recieved", "Returned"],
                datasets:
                [
                    {
                        data: [pending, approved, declined, recieved, returned], // Real data values
                        backgroundColor: ["#FFA500", "#3CB371", "#D9534F", "#5F9EA0", "#B0B0B0"],
                        hoverOffset: 10, // Adds hover effect
                    },
                ],
            };

            const options =
            {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "70%",
                borderRadius: "5",
                plugins:
                {
                    legend:
                    {
                        position: "right", // Legend positioned on the right
                    },
                    tooltip:
                    {
                        callbacks:
                        {
                            label: function (tooltipItem)
                            {
                                let dataset = tooltipItem.dataset;
                                let dataIndex = tooltipItem.dataIndex;
                                let label = data.labels[dataIndex];
                                let value = dataset.data[dataIndex];
                                return `${label}: ${value}`;
                            },
                        },
                    },
                },
            };

            this.doughnutChart = new Chart(this.$refs.doughnutChart.getContext("2d"), {
                type: "doughnut",
                data: data,
                options: options,
                // plugins: [centerTextPlugin],
            });
        },
    },

    mounted()
    {
        this.fetchAvailabilityData(); // Fetch the data when the component is mounted
    },
};
</script>

<style scoped>
.metric-chart {
  height: 300px;
  padding: 20px;
}
</style>
