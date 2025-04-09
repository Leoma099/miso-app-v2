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
            <span v-else>{{ item.serial_number }}</span>
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
            <span v-else>{{ item.equipmentStatus }}</span>
        </td>
    </tr>
</template>

<script>
import apiClient from "@/services/index"
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

            formatAvailability(availability)
            {
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

            async deleteEquipment()
            {
                if(!confirm("Are you sure you want to delete?")) return;

                try
                {
                    const response = await apiClient.delete(`/equipment/${this.item.id}`);
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

            
            getPhotoUrl(photoPath)
            {
                if (!photoPath) {
                    return "/default-avatar.png"; // Fallback image
                }

                // If the photo is already a full URL, return as is
                if (photoPath.startsWith("http")) {
                    return photoPath;
                }

                // Correct storage URL (Laravel serves files via public/storage)
                return `http://127.0.0.1:8000/storage/${photoPath}`;
            },
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
