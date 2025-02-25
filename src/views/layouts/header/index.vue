<template>
    <header>
        <div class="left">
            <p class="mb-0">Welcome back, {{ account?.name || 'Guest' }}</p>
        </div>
        <div class="right">
            <router-link to="/administration/my-account">
                <p class="mb-0">{{ account?.name || 'Guest' }}</p>
            </router-link>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            account: {} // Stores the user account details
        };
    },

    async mounted() {
        this.fetchUserAccount();
    },

    methods: {
        async fetchUserAccount() {
            const userId = localStorage.getItem("user_id"); // Retrieve the logged-in user ID

            if (!userId) {
                console.error("No user ID found in localStorage.");
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}`);
                const data = await response.json();

                if (data.account) {
                    this.account = data.account; // Store account details
                } else {
                    console.error("No account found for this user.");
                }
            } catch (error) {
                console.error("Error fetching account details:", error);
            }
        }
    }
};
</script>

<style>
/* Add styles if needed */
</style>
