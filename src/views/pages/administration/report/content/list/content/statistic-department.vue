<template>
    <div class="card card-body shadow-sm border-0 rounded-0">
      <h3 class="mb-0">Number of Department Borrow</h3>
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
  
  export default {
    data() {
      return {
        barChart: null, // Storing the bar chart instance
      };
    },
  
    methods: {
      // Fetch data and create the chart
      async numberOfDepartment() {
        try {
          // Fetch data from the API (you've already set up apiClient)
          const response = await apiClient.get("/borrowCountDepartment");
          const data = response.data;
  
          // Prepare data for the chart
          const labels = data.map(item => item.office_name); // Office names (department names)
          const values = data.map(item => item.borrow_count); // Borrow count values
  
          // Create the bar chart
          this.createBarChart(labels, values);
        } catch (error) {
          console.error("Error fetching department borrow data", error);
        }
      },
  
      // Create or update the bar chart
      createBarChart(labels, values) {
        if (this.barChart) {
          this.barChart.destroy(); // Destroy the previous chart instance if it exists
        }
  
        // Create a new chart instance
        this.barChart = new Chart(this.$refs.barReport.getContext("2d"), {
          type: "bar", // Set the chart type to 'bar'
          data: {
            labels: labels,
            datasets: [
              {
                label: "Number of Department Borrowed",
                data: values,
                backgroundColor: "#367096", // Bar color
                borderColor: "#2c5f7f", // Border color for bars
                borderWidth: 1, // Border width for bars
                hoverBackgroundColor: "#2c5f7f", // Hover effect color
                hoverBorderColor: "#1e3d56", // Hover border color
              },
            ],
          },
          options: {
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
                  text: "Number of Borrows", // Y-axis label
                },
                beginAtZero: true, // Start Y-axis at zero
              },
            },
          },
        });
      },
    },
  
    mounted() {
      // Fetch and display the chart data when the component is mounted
      this.numberOfDepartment();
    },
  
    watch: {
      // Refetch data if timeFrame (or any other reactive property) changes
      timeFrame() {
        this.numberOfDepartment();
      },
    },
  };
  </script>
  
  <style scoped>
  .metric-chart {
    height: 300px;
    padding: 20px;
  }
  </style>
  