<template>

    <h1 class="page-title mb-0">View Calendar Reserved</h1>
    <router-link
        :to="'/administration/calendar'">
        Back to page
    </router-link>

    <div class="col-md-5 mx-auto mt-4">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <div class="d-flex align-items-center">
                <h1 class="mb-0 me-3"><strong>Event:</strong></h1>
                <h1 class="mb-0">{{ item.event }}</h1>
            </div>
            <div class="d-flex align-items-center">
                <h1 class="mb-0 me-3"><strong>Place:</strong></h1>
                <h1 class="mb-0">{{ item.place }}</h1>
            </div>
            <div class="d-flex align-items-center">
                <h1 class="mb-0 me-3"><strong>Date:</strong></h1>
                <h1 class="mb-0">{{ item.date }}</h1>
            </div>
            <div class="d-flex align-items-center">
                <h1 class="mb-0 me-3"><strong>Description:</strong></h1>
                <h1 class="mb-0">{{ item.description }}</h1>
            </div>

        </div>

    </div>

</template>

<script>
import apiClient from "@/services/index";
export default
{
    data()
    {
        return {
            item: {}, // Stores fetched calendar event data
        };
    },

    mounted()
    {
        this.fetchCalendar(); // Call the correct method name
    },

    methods:
    {
        async fetchCalendar() // Corrected method name
        {
            try
            {
                const response = await apiClient.get(`/calendar/${this.$route.params.id}`);
                this.item = response.data; // Assign fetched data
            }
            catch (error)
            {
                console.error("Error fetching calendar details:", error);
            }
        },
    }
}
</script>

<style scoped>
.page-title {
    color: #007bff;
}
</style>
