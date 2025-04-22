<template>

    <div class="card card-body shadow-sm border-0 rounded-0">

        <h3 class="mb-0">Number of Equipment Borrowed</h3>

        <div class="metric-chart">
            <canvas ref="barReport" height="300"></canvas>
        </div>    
    </div>

</template>

<script>
import { Chart, registerables } from "chart.js";
import apiClient from "@/services";
// Register all necessary chart.js components
Chart.register(...registerables);
export default
{
    data()
    {
        return{
            barChart: null,
        }
    },

    methods:
    {

        async numberOfEquipment()
        {
            try
            {
                const response = await apiClient.get("/borrowCountEquipment");
                const data = response.data;

                const labels = data.map(item => item.type);
                const values = data.map(item => item.borrow_count);

                this.createBarChart(labels, values);
            }
            catch(error)
            {
                console.error("Error fetching equipment borrow count", error);
            }
        },

        createBarChart(labels, values)
        {
            if(this.barChart)
            {
                this.barChart.destroy();
            }

            this.barChart = new Chart(this.$refs.barReport.getContext("2d"), {
            type: "bar", // Set the chart type to 'bar'
            data: {
                labels: labels,
                datasets: [
                {
                    label: "Number of Equipment Borrowed",
                    data: values,
                    backgroundColor: "#367096", // Bar color
                    borderColor: "#2c5f7f", // Border color for bars
                    borderWidth: 1, // Border width for bars
                    hoverBackgroundColor: "#2c5f7f", // Hover effect color
                    hoverBorderColor: "#1e3d56", // Hover border color
                },
                ],
            },
            options:
            {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                legend: {
                    position: "bottom", // Position of the legend
                },
                },
                scales: {
                y: {
                    title: {
                    display: true,
                    text: "Number of Equipments", // Y-axis label
                    },
                    beginAtZero: true, // Start Y-axis at zero
                },
                },
            },
            });
        }

    },

    mounted()
    {
        this.numberOfEquipment();
    },

    watch:
    {
        timeFrame()
        {
            this.numberOfEquipment();
        }
    }
}
</script>

<style scoped>
.metric-chart {
  height: 300px;
  padding: 20px;
}
</style>