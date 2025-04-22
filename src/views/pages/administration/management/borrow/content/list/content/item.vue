<template>
    <tr>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.type }}</span>
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
            <span v-else>{{ item.mobile_number }}</span>
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
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <div v-else>
                <div v-if="!isApproved && !isDeclined && !isReturned && !isRecieved">
                    <button
                        type="button"
                        class="btn btn-success btn-sm rounded-0 me-3"
                        @click="markAsApproved">
                        <i class="bx bx-check"></i>
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger btn-sm rounded-0"
                        @click="markAsDeclined"
                        :disabled="isProcessing">
                        <i class="bx bx-x"></i>
                    </button>
                </div>
                <div v-else-if="isRecieved && !isReturned">
                    <button
                        type="button"
                        class="btn btn-info btn-sm rounded-0"
                        @click="markAsReturned"
                        :disabled="isProcessing">
                        <i class="bx bx-archive-in"></i>
                    </button>
                </div>
                <div v-else>
                    <p v-if="isApproved">Marked as Approved</p>
                    <p v-if="isDeclined">Marked as Declined</p>
                    <p v-if="isReturned">Marked as Returned</p> <!-- Show "Returned" message -->
                    <p v-if="isProcessing">Processing...</p>
                </div>
            </div>
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

        computed:
        {
            isApproved() {
            return this.item.status === 2;
            },
            isDeclined() {
                return this.item.status === 3;
            },
            isRecieved() {
                return this.item.status === 4;
            },
            isReturned() {
                return this.item.status === 5;
            }
        },

        data()
        {
            return{
                isProcessing: false,
            }
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
            },

            async markAsApproved()
            {
                this.isProcessing = true;
                try
                {
                    const response = await apiClient.put(`/borrowApprove/${this.item.id}`);
                    console.log('Approved successfully:', response.data);
                    this.item.status = 2;
                    alert('Marked as approved successfully!');
                }
                catch (error)
                {
                    console.error('Approval failed:', error);
                    alert('Failed to mark as approved.');
                }
                finally
                {
                    this.isProcessing = false; // reset flag once process completes
                }
            },

            async markAsDeclined()
            {
                this.isProcessing = true;
                try
                {
                    const response = await apiClient.put(`/borrowDecline/${this.item.id}`); // Add endpoint for declining
                    console.log('Declined successfully:', response.data);
                    this.item.status = 3; // Update the item status to declined
                    alert('Marked as declined successfully!');
                }
                catch (error)
                {
                    console.error('Decline failed:', error);
                    alert('Failed to mark as declined.');
                }
                finally
                {
                    this.isProcessing = false;
                }
            },

            async markAsReturned()
            {
                this.isProcessing = true;
                try
                {
                    const response = await apiClient.put(`/borrowReturn/${this.item.id}`); // Add endpoint for declining
                    console.log('Returned successfully:', response.data);
                    this.item.status = 5; // Update the item status to declined
                    alert('Marked as returned successfully!');
                }
                catch (error)
                {
                    console.error('Returned failed:', error);
                    alert('Failed to mark as returned.');
                }
                finally
                {
                    this.isProcessing = false;
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