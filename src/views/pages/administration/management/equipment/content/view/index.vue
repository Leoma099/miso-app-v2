<template>

    <h1 class="page-title mb-0">View Equipment</h1>
    <router-link :to="'/management/equipment'">Back to page</router-link>

    <div class="mt-3">

        <div class="col-3 mx-auto">

            <div class="card card-body shadow-sm border-0 rounded-0">

                <div class="equipment-image mb-3">
                    <img :src="getPhotoUrl(item.photo)" alt="User Photo" v-if="item.photo">
                </div>

                <div class="d-flex align-items-center">
                    <p class="mb-0 me-3"><strong>BRAND:</strong></p>
                    <p class="mb-0">{{ item.type }}</p>
                </div>

                <div class="d-flex align-items-center">
                    <p class="mb-0 me-3"><strong>MODEL:</strong></p>
                    <p class="mb-0">{{ item.serial_number }}</p>
                </div>

                <div class="d-flex align-items-center">
                    <p class="mb-0 me-3"><strong>MODEL:</strong></p>
                    <p class="mb-0">{{ item.property_number }}</p>
                </div>
                

                <div class="d-flex align-items-center">
                    <p class="mb-0 me-3"><strong>BRAND:</strong></p>
                    <p class="mb-0">{{ item.brand }}</p>
                </div>

                <div class="d-flex align-items-center">
                    <p class="mb-0 me-3"><strong>MODEL:</strong></p>
                    <p class="mb-0">{{ item.model }}</p>
                </div>

                <div class="d-flex align-items-center">
                    <p class="mb-0 me-3"><strong>STATUS:</strong></p>
                    <p class="mb-0">{{ item.equipmentStatus }}</p>
                </div>

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
            item: {}, // Stores fetched equipment data
        };
    },

    created()
    {
        this.fetchEquipment();
    },

    methods:
    {
        async fetchEquipment()
        {
            try
            {
                const response = await apiClient.get(`/equipment/${this.$route.params.id}`);
                this.item = response.data; // Assign fetched data
            }
            catch (error)
            {
                console.error("Error fetching equipment details:", error);
            }
        },

        formatCondition(condition)
        {
            console.log("Item condition:", condition); // Debugging
            const numStatus = parseInt(condition, 10);
            if (numStatus === 1)
            {
                return "Good";
            }
            else if (numStatus === 2)
            {
                return "Damage";
            }
            else if (numStatus === 3)
            {
                return "Lost";
            }
            else
            {
                return "n/a";
            }
        },

        formatAvailability(availability)
        {
            console.log("Item availability:", availability); // Debugging
            const numStatus = parseInt(availability, 10);
            if (numStatus === 1)
            {
                return "Available";
            }
            else if (numStatus === 2)
            {
                return "Not Available";
            }
            else
            {
                return "n/a";
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
            return `http://api.miso-backend.loc/storage/${photoPath}`;
        },
    }
};
</script>

<style scoped>
.animation
{
    animation-duration: 1s;
    animation-fill-mode: none;
}
.animation-fade-in
{
    animation-name: fadeIn;
}

@keyframes fadeIn{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
.page-title {
    color: #007bff;
}
.equipment-image {
    width: 380px;
    height: 380px;
    overflow: hidden;
    background: #e0e0e0;
    border: 5px solid #007bff;
}

.equipment-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>