<template>
    <tr>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.id_number }}</span>
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
            <span v-else>{{ item.position }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.office_address }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.address }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.email }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.mobile_number }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <div v-else>
                <router-link :to="`/management/account/${item.id}/edit`" class="btn btn-sm btn-warning rounded-0 me-3">Edit</router-link>
                <button type="button" class="btn btn-sm btn-danger rounded-0" @click="deleteAccount()">Delete</button>
            </div>
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
        async deleteAccount()
            {
                if(!confirm("Are you sure you want to delete?")) return;

                try
                {
                    const response = await apiClient.delete(`/account/${this.item.id}`);
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

span {
    font-size: 1rem;
    font-weight: 600;
}
</style>
