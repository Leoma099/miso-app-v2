<template>
    <p class="page-title mb-0">CALENDAR</p>

    <div class="mt-4">
        <div class="row">
            <div class="col-md-4">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <form @submit.prevent="submit()">
                        <div class="form-group mb-2">
                            <label for="" class="form-label">EVENT:</label>
                            <input type="text" class="form-control rounded-0" placeholder="ex. MAYOR MEETING" v-model="form.event">
                        </div>

                        <div class="form-group mb-2">
                            <label for="" class="form-label">PLACE:</label>
                            <input type="text" class="form-control rounded-0" placeholder="ex. MAYOR MEETING" v-model="form.place">
                        </div>

                        <div class="form-group">
                            <label for="" class="form-label">DATE:</label>
                            <input type="date" class="form-control rounded-0" v-model="form.date">
                        </div>

                        <div class="text-end mt-3">
                            <button type="submit" class="btn rounded-0 button-color">ADD CALENDAR</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="col-md-8">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div ref="calendar" class="calendar"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for displaying event details -->
    <div v-if="showModal" class="modal fade show" tabindex="-1" style="display: block;" aria-labelledby="eventModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="eventModalLabel">Event Details</h5>
                    <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Event:</strong> {{ selectedEvent.title }}</p>
                    <p><strong>Place:</strong> {{ selectedEvent.place }}</p>
                    <p><strong>Date:</strong> {{ selectedEvent.start }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
    data() {
        return {
            calendar: null, // Store the calendar instance
            form: {
                event: "",
                place: "",
                date: this.getCurrentDate(),
            },
            showModal: false, // Control the modal visibility
            selectedEvent: {}, // Store the event details for the modal
        };
    },

    mounted() {
        this.initCalendar();
    },

    methods: {
        getCurrentDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },

        initCalendar() {
            const calendarEl = this.$refs.calendar;

            this.calendar = new Calendar(calendarEl, {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: "dayGridMonth",
                events: [],
                dateClick: this.handleDateClick,
            });

            this.calendar.render();
        },

        handleDateClick(info) {
            // Show the event details in a modal when the date is clicked
            const clickedDate = info.dateStr;
            const event = this.calendar.getEvents().find(event => event.startStr === clickedDate);

            if (event) {
                this.selectedEvent = event;
                this.showModal = true;
            } else {
                alert("No event scheduled for this date.");
            }
        },

        submit() {
            const { event, date, place } = this.form;

            if (!event || !date || !place) {
                alert("Event name, date, and place are required.");
                return;
            }

            // Add the event to the calendar
            this.calendar.addEvent({
                title: event,
                start: date,
                place: place, // Add the place as additional info
            });

            // Reset the form fields
            this.form = {
                event: "",
                place: "",
                date: this.getCurrentDate(),
            };

            alert("Event added to the calendar!");
        },
    },
};
</script>

<style scoped>
p {
    font-weight: 600;
    font-size: 2rem;
    color: #793A91;
}
.button-color {
    background-color: #734F79;
    color: #ffffff;
}
.button-color:hover {
    background-color: #793A91;
    color: #ffffff;
}
</style>