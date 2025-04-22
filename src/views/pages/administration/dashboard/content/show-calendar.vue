<template>
  
    <div class="card card-body shadow-sm rounded-0 border-0">
        <router-link
            :to="'/administration/calendar'"
            style="text-decoration: none;">
            <div ref="calendar" class="calendar"></div>
        </router-link>
    </div>

</template>

<script>
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
export default
{
    data()
    {
        return{
            calendar: null, // Store the calendar instance
        }
    },

    mounted() {
        this.initCalendar();
    },

    methods:
    {

        initCalendar() {
            const calendarEl = this.$refs.calendar;

            this.calendar = new Calendar(calendarEl, {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: "dayGridMonth",
                events: [],
                dateClick: this.handleDateClick,
            });

            this.calendar.render();
        }

    }
}
</script>

<style scoped>
::v-deep(.fc-toolbar-title){
    color: #007bff !important;
    font-size: 3rem;
}

::v-deep(.fc-daygrid-day a),
::v-deep(.fc-event a),
::v-deep(.fc-col-header-cell a) {
    text-decoration: none !important;
    color: inherit !important;
    font-size: 1.2rem;
    font-weight: bold;
}
.card {
    height: 500px;
}
</style>