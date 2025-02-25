<template>

    <h1 class="page-title mb-0">VIEW EQUIPMENT</h1>

    <div class="mt-3">

        <div class="row">

            <div class="col-md-4">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="equipment-image mb-3">
                        <img src="" class="img-fluid">
                    </div>
                    <div class="equipment-details">
                        <h2 class="mb-0 text-center">{{ item.equipment_type }}</h2>
                        <div class="mt-3">
                            <router-link
                                :to="'/administration/equipment/edit'"
                                class="btn btn-outline-primary w-100">
                                UPDATE
                            </router-link>
                            <router-link
                                class="btn btn-outline-danger w-100 mt-2">
                                DELETE
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-8">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-0">BRAND:</p>
                                <p class="mb-0"><strong>{{ item.brand }}</strong></p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-0">MODEL:</p>
                                <p class="mb-0"><strong>{{ item.model }}</strong></p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-0">SERIAL NUMBER:</p>
                                <p class="mb-0"><strong>{{ item.serial_number }}</strong></p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-0">REGISTERED DATE:</p>
                                <p class="mb-0"><strong>{{ item.registered_date }}</strong></p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-0">CONDITION:</p>
                                <p class="mb-0"><strong>{{ formatCondition(item.condition) }}</strong></p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-0">AVAILABILITY:</p>
                                <p class="mb-0"><strong>{{ formatAvailability(item.availability) }}</strong></p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-0">STATUS:</p>
                                <p class="mb-0"><strong>{{ formatStatus(item.status) }}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    </div>

</template>

<script>
import axios from "axios";
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
                const response = await axios.get(`http://127.0.0.1:8000/api/equipment/${this.$route.query.id}`);
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
        formatStatus(status)
        {
            console.log("Item status:", status); // Debugging
            const numStatus = parseInt(status, 10);
            if (numStatus === 1)
            {
                return "Active";
            }
            else if (numStatus === 2)
            {
                return "Not Active";
            }
            else
            {
                return "n/a";
            }
        }
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
</style>