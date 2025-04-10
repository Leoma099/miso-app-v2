<template>
    <tr>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.event }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.place }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ formatDate }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>{{ item.description }}</span>
        </td>
        <td class="table-data">
            <div v-if="isLoading" class="shimmer-loader"></div>
            <span v-else>
                <router-link
                    :to="`/administration/calendar/${this.item.id}`"
                    class="btn btn-sm btn-info rounded-0">
                    View
                </router-link>
            </span>
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

    computed: {
        formatDate() {
            const date = new Date(this.item.date);
            return date.toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
            });
        },
        formatTimeFrom() {
            return this.formatTime(this.item.time_from);
        },
        formatTimeTo() {
            return this.formatTime(this.item.time_to);
        }
    },
    methods: {
        formatTime(time) {
            if (!time) return "";
            const [hours, minutes] = time.split(":");
            let h = parseInt(hours, 10);
            const ampm = h >= 12 ? "PM" : "AM";
            h = h % 12 || 12;
            return `${h}:${minutes} ${ampm}`;
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
