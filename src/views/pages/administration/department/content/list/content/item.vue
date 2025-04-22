<template>
    <tr>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.office_name }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.office_address }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.tell_number || "n/a" }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.fax_number || "n/a" }}</span>
        </td>
        <!-- <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <div v-else>
                <router-link :to="`/administration/department/${item.id}`" class="btn btn-sm btn-info rounded-0 me-3">View</router-link>
                <router-link :to="`/administration/department/${item.id}/edit`" class="btn btn-sm btn-warning rounded-0 me-3">Edit</router-link>
                <button class="btn btn-sm btn-danger rounded-0" @click="deleteEquipment()">Delete</button>
            </div>
        </td> -->
    </tr>
</template>

<script>
export default
{
    props:
    {
        item: Object,
        isLoading: Boolean
    }
}
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

span{
    font-size: 1rem;
    font-weight: 600;
}
</style>