<template>
    <tr>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item?.type || 'N/A' }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ formatStatus(item?.status) }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.quantity }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item?.date_borrow || 'N/A' }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item?.date_return || 'N/A' }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item?.agent || 'N/A' }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <div v-else>
                <div v-if="!isRecieved">
                    <button
                        type="button"
                        class="btn btn-primary btn-sm rounded-0"
                        @click="markAsReturned"
                        :disabled="item?.status === 1 || item?.status === 3 || item?.status === 5">
                        Recieved
                    </button>
                </div>
                <div v-else>
                    <p>Marked as Recieved</p>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
import apiClient from "@/services/index";

export default {
    props: {
        item: Object,
        isLoading: Boolean
    },
    data() {
        return {
            isRecieved: this.item?.status === 4 // Check if already recieved
        };
    },
    methods:
    {
        formatStatus(status)
        {
            if (status === null || status === undefined) return "N/A"; // Prevent null/undefined errors
            const numStatus = parseInt(status, 10);
            if (numStatus === 1) return "Pending";
            else if (numStatus === 2) return "Approved";
            else if (numStatus === 3) return "Declined";
            else if (numStatus === 4) return "Recieved";
            else if (numStatus === 5) return "Returned";
            else return "n/a";
        },

        async markAsReturned()
        {
            try {
                const response = await apiClient.put(`/borrow/${this.item.id}/return`);
                if (response.data.message === 'Marked as returned') {
                    this.isReturned = true;
                }
            } catch (error) {
                console.error("Error marking item as returned:", error);
            }
        }
    }
};
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

.table-data:last-child {
    width: 225px;
}
span {
    font-size: 1rem;
    font-weight: 600;
}
</style>
