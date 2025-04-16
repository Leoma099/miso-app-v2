<template>

    <header>

        <div class="left">
            <div class="date">{{ date }} ( {{ day }} )</div>
            <div class="time">{{ time }}</div>
        </div>

        <div class="right">

            <div class="icon-badge notification-container" @click="toggleDropdown">

                <i class="bx bxs-bell icon-size"></i>
                <span class="badge" v-if="notificationCount > 0">{{ notificationCount }}</span>

                <div
                  v-show="dropdownOpen"
                  class="dropdown">

                    <h4 class="mb-0" style="padding-inline: 10px;">Notification</h4>

                    <div v-if="items.length > 0" class="scrollable">
                        <item-component
                            class="notification mt-2"
                            v-for="(item, index) in items"
                            :key="index"
                            :item="item"
                            :selectItem="selectItem"
                            :updateItem="updateItem"/>
                    </div>

                    <div class="notification-box mt-3"
                        v-else>
                        <p class="mb-0 text-center">No notifications</p>
                    </div>


                </div>

            </div>

            <router-link :to="'/my-account'"> 

                <p class="mb-0">{{ userName }}</p>
                
            </router-link>
        </div>
 
    </header>

</template>

<script>
import apiClient from "@/services/index";
import ItemComponent from './content/item';
export default
{
    components:
    {
        ItemComponent,
    },

    data()
    {

        return {
            dropdownOpen: false,
            items: [],
            userName: "Guest",
            isEmpty: false,
            interval: null, // Store interval reference
            selectedItem: {},

            notificationCount: 0,
            notificationCountLoading: false,
            showNotificationCount: true,

            day: "",
            date: "",
            time: "",
        };

    },

    mounted()
    {
        // Check localStorage if the notifications have been marked as read (bell clicked)
        const notificationsRead = localStorage.getItem('notifications_read');
        if (notificationsRead)
        {
            // Reset notification count when page loads
            this.notificationCount = 0;
        }

        this.fetchUserName();
        this.fetchNotifications();
        document.addEventListener("click", this.closeDropdown);
        this.startRealTimeUpdates();
        this.updateDateTime();
        this.timer = setInterval(this.updateDateTime, 1000);
    },

    beforeUnmount()
    {
        document.removeEventListener("click", this.closeDropdown);
        clearInterval(this.interval); // Clear interval on component unmount
    },

    methods:
    {
        fetchUserName()
        {
            const fullName = localStorage.getItem("full_name");
            if (fullName)
            {
                this.userName = fullName;
            }
        },

        async fetchNotifications()
        {
            try
            {
                const response = await apiClient.get('/borrow-notifications');

                // Ensure response data is an array
                if (Array.isArray(response.data.data))
                {
                    this.items = response.data.data;
                    this.notificationCount = this.items.filter(item => !item.is_read).length;
                }
                else
                {
                    this.items = [];  // Set to an empty array if the response isn't an array
                    console.error("Fetched data is not an array:", response.data.data);
                }
            }
            catch(error)
            {
                console.error("Error occured:", error)
            }
        },

        selectItem(item)
        {
            this.selectedItem = item;
        },

        updateItem(updatedData)
        {
            let checkingItem = this.items.find(row => row.id == updatedData.id);

            checkingItem.is_read = updatedData.is_read;
        },

        toggleDropdown()
        {
            this.dropdownOpen = !this.dropdownOpen;

            if (this.dropdownOpen)
            {
                this.markNotificationsAsRead();
            }

            localStorage.setItem('notifications_read', 'true');
        },

        async markNotificationsAsRead()
        {
            try
            {
                await apiClient.post('/mark-notifications-read');
                this.items.forEach(item => item.is_read = 1);
                this.notificationCount = 0; // Reset notification count to 0 when the bell icon is clicked
            }
            catch (error)
            {
                console.error("Failed to mark notifications as read:", error);
            }
        },

        closeDropdown(event)
        {
            if (!this.$el.contains(event.target))
            {
                this.dropdownOpen = false;
            }
        },

        startRealTimeUpdates()
        {
            this.interval = setInterval(() => {
                if (!this.dropdownOpen)
                {
                    this.fetchNotifications(); // Fetch notifications only when the dropdown is closed
                }
            }, 5000); // Fetch every 5 seconds
        },

        updateDateTime()
        {
            const now = new Date();

            const days = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            this.day = days[now.getDay()];

            const options = { month: 'short', day: '2-digit', year: 'numeric' };
            this.date = now.toLocaleDateString('en-US', options);

            this.time = now.toLocaleTimeString('en-US', { hour24: false });
        }
    }
};
</script>


<style scoped>
.icon-badge {
position: relative;
cursor: pointer;
margin-right: 20px;
}

.badge {
position: absolute;
top: 10px;
right: -10px;
background: red;
color: white;
font-size: .5;
padding: 3px;
border-radius: 5px;
}

/* Notification Dropdown */
.notification-container {
position: relative;
}

.dropdown {
position: absolute;
right: 0;
top: 60px;
background: white;
color: black;
width: 300px;
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
border-radius: 5px;
overflow: hidden;
z-index: 1000;
height: auto;
padding: 10px;
}

.dropdown li {
padding: 10px;
border-bottom: 1px solid #ddd;
cursor: pointer;
}

.dropdown li:hover {
background: #f5f5f5;
}

.dropdown .empty {
text-align: center;
padding: 10px;
color: gray;
}

/* Scrollbar when 15+ notifications */
.scrollable {
max-height: 300px; /* Limit height */
overflow-y: auto;
}

/* Custom Scrollbar Styling */
.scrollable::-webkit-scrollbar {
width: 6px;
}

.scrollable::-webkit-scrollbar-track {
background: #f1f1f1;
border-radius: 10px;
}

.scrollable::-webkit-scrollbar-thumb {
background: #888;
border-radius: 10px;
}

.scrollable::-webkit-scrollbar-thumb:hover {
background: #555;
}

.icon-size {
font-size: 1.5rem;
}

.notification
{
    transition: 0.1s ease-in-out;
    padding: 10px;
    border-radius: 5px;
}

.notification:hover
{
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
}

.notification-box
{
    background-color: #e0e0e0;
    padding: 10px;
    border-radius: 5px;
}

.notify-button
{
    transition: 0.1s ease-in-out;
}
.notify-button:hover
{
    background: #e0e0e0;
}
</style>
