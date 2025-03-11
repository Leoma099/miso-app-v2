<template>

    <header>

        <div class="left">
            <p class="mb-0">Welcome back, {{ userName }}</p>
        </div>

        <div class="right">

            <div class="icon-badge notification-container" @click="toggleDropdown">

                <i class="bx bxs-bell icon-size"></i>
                <span class="badge">{{ unreadNotificationsCount }}</span>

                <ul v-show="dropdownOpen" class="dropdown" :class="{ 'scrollable': notifications.length >= 20 }">

                    <li v-if="notifications.length === 0" class="empty">No Notifications</li>
                    
                    <li v-for="(notification, index) in notifications" :key="index" @click="markAsRead(notification)">
                        <span :class="{ 'read': notification.is_read }">{{ notification.message }}</span>
                    </li>

                </ul>

            </div>

            <router-link :to="'/my-account'"> 

                <p class="mb-0">{{ userName }}</p>
                
            </router-link>
        </div>
 
    </header>

</template>

<script>
import apiClient from "@/services/index";
export default
{

    data()
    {
        return {
        dropdownOpen: false,
        notifications: [],
        userName: 'Guest',
        page: 1,
        };
    },

    computed:
    {
        unreadNotificationsCount()
        {
            return this.notifications.filter(notification => !notification.is_read).length;
        }
    },

    mounted()
    {
        this.fetchUserName();
        this.fetchNotifications();
        document.addEventListener("click", this.closeDropdown);
    },

    beforeUnmount()
    {
        document.removeEventListener("click", this.closeDropdown);
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
                const response = await apiClient.get(`/notification?page=${this.page}`);
                this.notifications = response.data;
            }
            catch(error)
            {
                console.error(error)
            }
        },

        async markAsRead(notification)
        {
            if (!notification.is_read)
            {
                try
                {
                    const response = await apiClient.post(`/notification/${notification.id}/read`);
                    this.notifications = response.data.is_read;
                }
                catch(error)
                {
                    console.error(error);
                }
            }
        },

        toggleDropdown()
        {
            this.dropdownOpen = !this.dropdownOpen;
            if (this.dropdownOpen && !this.notifications.length)
            {
                this.fetchNotifications();
            }
        },

        closeDropdown(event)
        {
            if (!this.$el.contains(event.target))
            {
                this.dropdownOpen = false;
            }
        },

        loadMore()
        {
            this.fetchNotifications();
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
max-height: auto;
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
</style>
