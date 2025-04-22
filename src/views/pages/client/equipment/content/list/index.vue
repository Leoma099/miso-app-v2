<template>

    <div class="d-flex justify-content-between align-items-centrer">
        <h1 class="page-title mb-0">EQUIPMENT LIST</h1>
        <div class="col-4">
            <input
                type="input"
                class="form-control form-control-sm rounded-0"
                placeholder="Search equipment"
                v-model="searchQuery"
                @input="fetchEquipment"/>
        </div>
    </div>

    <div class="mt-3">
        <div class="row">

            <item-component
                v-for="(item, index) in items"
                :key="index"
                :item="item"/>

        </div>
    </div>

</template>

<script>
import apiClient from "@/services/index"
import ItemComponent from "./content/item.vue";
export default
{
    components:
    {
        ItemComponent
    },

    data()
    {
        return {
            items: [], // Your actual data
            searchQuery: "",
            isLoading: false,
        };
    },

    mounted()
    {
        this.fetchEquipment();
    },

    methods:
    {
        async fetchEquipment()
        {
            try
            {
                const response = await apiClient.get(`/equipment`, {
                    params: {
                        search: this.searchQuery
                    }
                });

                console.log("Fetched Equipment Data:", response.data);

                this.items = response.data.data;
            }
            catch (error)
            {
                console.error("Error fetching equipment:", error);
            }
        },
    },

};
</script>

<style scoped>
.page-title {
    color: #007bff;
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
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
</style>