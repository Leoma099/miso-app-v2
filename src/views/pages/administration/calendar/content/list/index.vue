<template>
    <p class="page-title mb-0">CALENDAR</p>

    <div class="mt-4">
        <div class="row">
            <div class="col-md-4">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <form @submit.prevent="submit()">
                        <div class="form-group mb-3">
                            <h4 class="mb-0">Title:</h4>
                            <input type="text" class="form-control form-control-sm rounded-0" v-model="form.event">
                        </div>

                        <div class="form-group mb-3">
                            <h4 class="mb-0">Place:</h4>
                            <input type="text" class="form-control form-control-sm rounded-0" v-model="form.place">
                        </div>

                        <div class="form-group mb-3">
                            <h4 class="mb-0">Date:</h4>
                            <input type="date" class="form-control form-control-sm rounded-0" v-model="form.date">
                        </div>

                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col-md-6">
                                    <h4>Time from:</h4>
                                    <input type="time" class="form-control form-control-sm rounded-0" v-model="form.time_from">
                                </div>
                                <div class="col-md-6">
                                    <h4>Time to:</h4>
                                    <input type="time" class="form-control form-control-sm rounded-0" v-model="form.time_to">
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <h4 class="mb-0">Description:</h4>
                            <textarea name="" id="" cols="30" rows="5" class="form-control form-control-sm rounded-0" v-model="form.description"></textarea>
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

    <div v-if="showModals" class="modal fade show" tabindex="-1" style="display: block;" aria-labelledby="eventModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="eventModalLabel">Event Details</h5>
                    <button type="button" class="btn-close" @click="showModals = false" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Event:</strong> {{ selectedEvent.title }}</p>
                    <p><strong>Place:</strong> {{ selectedEvent.extendedProps?.place || "N/A" }}</p>
                    <p><strong>Date:</strong> {{ formatDate(selectedEvent.start) }}</p>
                    <p><strong>Time From:</strong> {{ selectedEvent.extendedProps?.time_from || "N/A" }}</p>
                    <p><strong>Time To:</strong> {{ selectedEvent.extendedProps?.time_to || "N/A" }}</p>
                    <p><strong>Description:</strong> {{ selectedEvent.extendedProps?.description || "N/A" }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showModals = false">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-4">
        <div class="card card-body shadow-sm border-0 rounded-0">
            <div class="table-responsive">
                <table class="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th class="table-header">Title</th>
                            <th class="table-header">Place</th>
                            <th class="table-header">Date</th>
                            <th class="table-header">Time from</th>
                            <th class="table-header">Time to</th>
                            <th class="table-header">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <item-component 
                            v-for="(item, index) in items"
                            :key="index"
                            :item="item"/>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import apiClient from "@/services/index";
import ItemComponent from "./content/item.vue";
export default {
    data() {
        return {
            calendar: null, // Store the calendar instance
            items: [],
            form: {
                event: "",
                place: "",
                date: this.getCurrentDate(),
                time_from: "",
                time_to: "",
                description: "",
            },
            showModals: false, // Control the modal visibility
            selectedEvent: {}, // Store the event details for the modal
        };
    },

    components:
    {
        ItemComponent
    },

    mounted() {
        this.initCalendar();

        this.form.time_from = this.getCurrentTime(); // ✅ Set initial time
        setInterval(() => {
        this.form.time_from = this.getCurrentTime(); // ✅ Update every second
        }, 1000);

        this.fetchCalendar();
    },

    methods:
    {
        async fetchCalendar()
        {
            try {
                const response = await apiClient.get('/calendar');
                console.log(response.data);
                
                this.items = response.data; // Store events in items

                // Clear old events and add new ones to FullCalendar
                this.calendar.getEvents().forEach(event => event.remove());

                response.data.forEach(event => {
                    this.calendar.addEvent({
                        title: event.event,
                        start: event.date,
                        extendedProps: {
                            place: event.place,
                            time_from: event.time_from,
                            time_to: event.time_to,
                            description: event.description
                        }
                    });
                });

            } catch (error) {
                console.error("Error fetching calendar events:", error);
            }
        },

        getCurrentTime() {
            const now = new Date();
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
            return `${hours}:${minutes} ${ampm}`;
        },


        formatDate(date) {
            if (!date) return "";
            return new Date(date).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
            });
        },
        
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
            const clickedDate = info.dateStr;
            const event = this.calendar.getEvents().find(event => event.startStr === clickedDate);

            if (event) {
                this.selectedEvent = {
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    extendedProps: event.extendedProps // ✅ Get additional data
                };
                this.showModals = true;
            } else {
                alert("No event scheduled for this date.");
            }
        },

        async submit() {
            try {
                const { event, date, place, time_from, time_to, description } = this.form;

                if (!event || !date || !place || !time_from || !time_to || !description) {
                    alert("Event name, date, and place are required.");
                    return;
                }

                // Send data to API
                const response = await apiClient.post('/calendar', {
                    event,
                    date,
                    place,
                    time_from,
                    time_to,
                    description
                });

                if (response.status === 201) { // Adjust the status check if needed
                    // ✅ Store extra data inside `extendedProps`
                    this.calendar.addEvent({
                        title: event,
                        start: date,
                        end: date,
                        extendedProps: {
                            place,
                            time_from,
                            time_to,
                            description
                        }
                    });

                    // Reset the form fields
                    this.form = {
                        event: "",
                        place: "",
                        date: this.getCurrentDate(),
                        time_from: this.getCurrentTime(),
                        time_to: "",
                        description: "",
                    };

                    alert("Event added to the calendar!");
                } else {
                    alert("Failed to add event. Please try again.");
                }
            } catch (error) {
                console.error("Error adding event:", error);
                alert("An error occurred while adding the event.");
            }
        }


    },
};
</script>

<style scoped>
p {
    font-weight: 600;
    font-size: 2rem;
    color: #007bff;
}
.button-color {
    background-color: #007bff;
    color: #ffffff;
}

.button-color:hover {
    background-color: #3798ff;
    color: #ffffff;
}
.calendar {
    height: 600px;
}

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
.table-header {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #007bff;
    color: #ffffff;
}
</style>