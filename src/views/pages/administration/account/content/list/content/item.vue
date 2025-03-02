<template>
    <tr>
        <td class="table-data">
            <router-link :to="`/administration/equipment/view?id=${item?.id}`">
                <div v-if="isLoading" class="shimmer-loader"></div>
                <span v-else>{{ item.full_name }}</span>
            </router-link>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.email }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.mobile_number }}</span>
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
</style>
