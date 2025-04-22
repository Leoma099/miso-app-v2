<template>
    <h1 class="page-title mb-0">CALENDAR</h1>

    <div class="mt-4">

        <div class="row">

            <div class="col-md-4">

                <div class="card card-body shadow-sm border-0 rounded-0 mb-3">
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
                            <h4 class="mb-0">Description:</h4>
                            <textarea name="" id="" cols="30" rows="5" class="form-control form-control-sm rounded-0" v-model="form.description"></textarea>
                        </div>

                        <div class="text-end mt-3">
                            <button type="submit" class="btn rounded-0 button-color">ADD CALENDAR</button>
                        </div>
                    </form>
                </div>

                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div ref="calendar" class="calendar"></div>
                </div>

            </div>

            <div class="col-md-8">

                <div class="card card-body shadow-sm border-0 rounded-0">

                    <div class="d-flex justify-content-end align-items-center mb-3">
                        <div class="col-md-3 ">
                            <input type="text" v-model="searchQuery" @input="fetchCalendar" placeholder="Type your seach here"
                                class="form-control rounded-0">
                        </div>
                    </div>

                    <div class="table-responsive table-scrollable">
                        <table class="table table-bordered mb-0">
                            <thead>
                                <tr>
                                    <th class="table-header">Title</th>
                                    <th class="table-header">Place</th>
                                    <th class="table-header">Date</th>
                                    <th class="table-header">Description</th>
                                    <th class="table-header">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="!isEmpty">
                                <item-component
                                    v-for="(item, index) in isLoading ? new Array(items.length || perPage).fill(null) : items"
                                    :key="item?.id || index" :item="item" :isLoading="isLoading" />
                            </tbody>

                            <tbody v-else>
                                <tr>
                                    <td colspan="8" class="text-center">No Data Record</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- Pagination is here -->
                    <div class="pagination-container">
                        <div class="entries-info">
                            Showing {{ (currentPage - 1) * perPage + 1 }} to {{ currentPage * perPage }} of {{ items.length }} records
                        </div>
                        <div class="pagination-buttons">
                            <!-- Pagination buttons here -->
                        </div>
                    </div>
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
                description: "",
            },
            showModals: false, // Control the modal visibility
            selectedEvent: {}, // Store the event details for the modal
            searchQuery: "",
            isLoading: false,
            isEmpty: false,
            perPage: 10,
            currentPage: 1
        };
    },

    components:
    {
        ItemComponent
    },

    mounted() {
        this.initCalendar();

        this.fetchCalendar();
    },

    methods:
    {
        async fetchCalendar()
        {
            try
            {
                this.isLoading = true;
                setTimeout(async () => {
                    const response = await apiClient.get('/calendar', 
                        {
                            params:
                            {
                                search: this.searchQuery,
                                page: this.currentPage,
                                perPage: this.perPage
                            }
                        }
                    );
                    console.log(response.data);
                    
                    this.items = response.data; // Store events in items
                    this.isEmpty = this.items.length === 0; // Check if items array is empty
                    this.isLoading = false;

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
                }), 1000;
            }
            catch (error)
            {
                console.error("Error fetching calendar events:", error);
                this.isLoading = false;
                this.isEmpty = true; // Assume empty on error
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
                const { event, date, place, description } = this.form;

                if (!event || !date || !place || !description) {
                    alert("Event name, date, and place are required.");
                    return;
                }

                // Send data to API
                const response = await apiClient.post('/calendarWalkin', {
                    event,
                    date,
                    place,
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
                            description
                        }
                    });

                    // Reset the form fields
                    this.form = {
                        event: "",
                        place: "",
                        date: this.getCurrentDate(),
                        description: "",
                    };

                    alert("Event added to the calendar!");
                    this.$router.go(0);
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
.page-title{
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