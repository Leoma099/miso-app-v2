<template>
    <tr>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.full_name }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.type }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.brand }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.model }}</span>
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
            <span v-else>{{ item.office_name }}</span>
        </td>
    </tr>
</template>

<script>
export default
    {

        props:
        {
            item: Object,
            isLoading: Boolean, // Receive isLoading prop from parent
        },

        methods:
        {
            formatCondition(condition)
            {
                console.log("Item condition:", condition); // Debugging
                const numStatus = parseInt(condition, 10);
                if (numStatus === 1) {
                    return "Good";
                }
                else if (numStatus === 2) {
                    return "Damage";
                }
                else if (numStatus === 3) {
                    return "Lost";
                }
                else {
                    return "n/a";
                }
            },
            formatAvailability(availability) {
                console.log("Item availability:", availability); // Debugging
                const numStatus = parseInt(availability, 10);
                if (numStatus === 1) {
                    return "Available";
                }
                else if (numStatus === 2) {
                    return "Not Available";
                }
                else {
                    return "n/a";
                }
            },
            formatStatus(status) {
                console.log("Item status:", status); // Debugging
                const numStatus = parseInt(status, 10);
                if (numStatus === 1) {
                    return "Active";
                }
                else if (numStatus === 2) {
                    return "Not Active";
                }
                else {
                    return "n/a";
                }
            }
        }
    };
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

span
{
    font-size: 1rem;
    font-weight: 600;
}
</style>
