<template>
    <tr>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.type }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.agent }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.office_name }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.date }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.full_name }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>
                <router-link
                    :to="`/administration/equipment-release/${this.item.id}/edit`"
                    class="btn btn-sm btn-info rounded-0 me-3">
                    Edit
                </router-link>
                <!-- <button
                    class="btn btn-sm btn-danger rounded-0"
                    @click="deleteAgent()">
                    Delete
                </button> -->
            </span>
        </td>
    </tr>
</template>

<script>
import apiClient from "@/services/index";
export default
{
    props:
    {
        item: Object,
        isLoading: Boolean,
    },

    methods:
    {
        async deleteAgent()
        {
            if (!this.item.id) {
                alert("Invalid item ID");
                return;
            }

            if (!confirm("Are you sure you want to delete?")) return;

            try {
                const response = await apiClient.delete(`/deliver-rider/${this.item.id}`);
                console.log("Delete success:", response.data);
                alert("Deleted successfully!");
                window.location.reload();
            } catch (error) {
                console.error("Error deleting:", error);
                alert("Failed to delete");
            }
        }

    }
}
</script>

<style scoped>
.table-data {
    font-size: 0.80rem;
    font-weight: 400;
    padding: 10px;
    position: relative;
    text-transform: uppercase;
}

/* Shimmer Loader */
.shimmer-loader {
    height: 16px;
    width: 100%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}

.button-manage {
    background-color: #007bff;
    font-size: 0.80rem;
    font-weight: 500;
    padding: 10px;
    color: #ffffff;
}

.equipment-image {
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: #e0e0e0;
}

.equipment-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

span
{
    font-size: 1rem;
    font-weight: 600;
}
</style>