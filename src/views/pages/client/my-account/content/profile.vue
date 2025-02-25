<template>
    <div class="col-md-4">
        <div class="card card-body shadow-sm border-0 rounded-0">
            <p class="mb-0"><strong class="me-3">Username:</strong> {{ accountUser.name || 'Loading...' }}</p>
            <p class="mb-0"><strong class="me-3">Email:</strong> {{ accountUser.email || 'Loading...' }}</p>
            <p class="mb-0"><strong class="me-3">Mobile Number:</strong> {{ accountUser.mobile || 'Loading...' }}</p>
            <div class="mt-2 mb-2">
                <button type="button" class="btn btn-outline-primary w-100">UPDATE</button>
            </div>
            <div>
                <button type="button" class="btn btn-outline-warning w-100">CHANGE PASSWORD</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            account: {}, // Stores account data from API
            user: null // Stores logged-in user's ID
        };
    },

    computed: {
        accountUser() {
            return this.account;
        }
    },

    mounted() {
        this.getUserId();
        if (this.user) {
            this.fetchAccount();
        }
    },

    methods: {
        getUserId() {
            const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
            if (user && user.id) {
                this.userId = user.id;
            } else {
                console.error("User ID not found in localStorage");
            }
        },

        async fetchAccount() {
            if (!this.userId) return;

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/account/${this.userId}`);
                const data = await response.json();
                this.account = data; // Store API response in `account`
            } catch (error) {
                console.error("Error fetching account data:", error);
            }
        }
    }
};
</script>

<style>
/* You can add styles here if needed */
</style>
