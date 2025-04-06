<template>

    <div class="card card-body shadow-sm border-0 rounded-0">

        <p class="mb-0">Equipment Availability</p>

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
                const response = await apiClient.get("/equipment-availability");
                const availabilityData = response.data;
                // this.available = availabilityData.available;
                // this.notAvailable = availabilityData.notAvailable;

                // Create the chart with real data
                this.createDoughnutChart(availabilityData.available, availabilityData.notAvailable);
            }
            catch (error)
            {
                console.error("Error fetching equipment availability data:", error);
            }
        },

        createDoughnutChart(available, notAvailable)
        {
            if (this.doughnutChart)
            {
                this.doughnutChart.destroy();
            }

            // const total = available + notAvailable;
            // const percentValue = total === 0 ? 0 : Math.round((available / total) * 100);
            // this.percent = percentValue;

            // const centerTextPlugin =
            // {
            //     id: "centerText",
            //     beforeDraw(chart)
            //     {
            //         const { width, height, ctx } = chart;
            //         ctx.save();

            //         const text = `${percent}%`;
            //         ctx.font = "bold 28px sans-serif"; // Bigger and bold
            //         ctx.fillStyle = "#555"; // Dark gray color
            //         ctx.textAlign = "center";
            //         ctx.textBaseline = "middle";
            //         ctx.fillText(text, width / 2, height / 2);

            //         ctx.restore();
            //     },
            // };


            const data =
            {
                labels: ["Available", "Not Available"],
                datasets: [
                {
                    data: [available, notAvailable], // Real data values
                    backgroundColor: ["#367096", "#64adc4"],
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
                plugins: {
                legend: {
                    position: "bottom", // Legend positioned on the right
                },
                tooltip: {
                    callbacks: {
                    label: function (tooltipItem) {
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
