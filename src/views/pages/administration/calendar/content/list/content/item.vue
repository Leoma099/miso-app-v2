<template>
    <tr>
        <td>{{ item.event }}</td>
        <td>{{ item.place }}</td>
        <td>{{ formatDate }}</td>
        <td>{{ formatTimeFrom }}</td>
        <td>{{ formatTimeTo }}</td>
        <td>{{ item.description }}</td>
    </tr>
</template>

<script>
export default {
    props: {
        item: Object,
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
td
{
    font-size: 1rem;
    font-weight: 600;
}
</style>
