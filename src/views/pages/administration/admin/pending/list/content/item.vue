<template>
    <tr>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.type }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.property_number }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.full_name }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.office_name }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.date_borrow }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.date_return }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span :class="formatStatus(item.status).badgeClass" v-else>
                {{ formatStatus(item.status).label }}
            </span>
        </td>
    </tr>
</template>

<script>
import apiClient from '@/services';

export default
    {
        props:
        {
            item: Object,
            isLoading: Boolean
        },

        methods:
        {
            formatStatus(status)
            {
                const statuses =
                {
                    1: { label: "Pending", badgeClass: "badge text-bg-light" },  // Yellow
                    2: { label: "Approved", badgeClass: "badge text-bg-primary" }, // Blue
                    3: { label: "Declined", badgeClass: "badge text-bg-success" }, // Green
                    4: { label: "Recieved", badgeClass: "badge text-bg-warning" }, // Red
                    5: { label: "Returned", badgeClass: "badge text-bg-info" } // Red
                };
                return statuses[status] || { label: "n/a", badgeClass: "badge bg-secondary" };
            },

            async deleteBorrow()
            {
                if(!confirm("Are you sure you want to delete?")) return;

                try
                {
                    const response = await apiClient.delete(`/borrow/${this.item.id}`);
                    console.log("delete sucess:", response.data);
                    alert("Deleted successfully!")
                    window.location.reload();
                }
                catch(error)
                {
                    console.error("Error deleteing:", error);
                    alert("Failed to delete")
                }
            }
        }
    }
</script>

<style scoped>
.table-data {
    font-size: 0.70rem;
    font-weight: 400;
    padding: 10px;
}

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

span
{
    font-size: 1rem;
    font-weight: 600;
}
</style>