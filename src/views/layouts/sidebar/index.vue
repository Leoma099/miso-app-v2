<template>
    <div class="sidebar">
        <div class="sidebar-logo">
            <img src="@/assets/images/sbma.png" alt="">
        </div>

        <ul class="sidebar-nav ps-0">
            <!-- Show AdminAccount component if role is 1 (admin) -->
            <admin-account v-if="role === 1" />

            <!-- Show UserAccount component if role is 2 (user) -->
            <user-account v-if="role === 2" />

            <li>
                <a @click="logout"><i class="bx bx-log-out me-2"></i>Logout</a>
            </li>
        </ul>
    </div>
</template>

<script>
import AdminAccount from "./content/admin.vue";
import UserAccount from "./content/user.vue";
export default
{
    components:
    {
        AdminAccount,
        UserAccount
    },

    data()
    {
        return {
            // Get role from localStorage as an integer (parse it)
            role: parseInt(localStorage.getItem('role')) || 0, // Default to 0 (guest) if role not found
        };
    },

    methods:
    {
        logout()
        {
            // Clear the localStorage
            localStorage.removeItem('role');
            localStorage.removeItem('access_token');  // If token is stored as well
            localStorage.removeItem('user_id');  // If token is stored as well

            // ACCOUNT INFO
            localStorage.removeItem('account');
            localStorage.removeItem('full_name');
            localStorage.removeItem('id_number');
            localStorage.removeItem('office_name');
            localStorage.removeItem('office_address');
            localStorage.removeItem('position');
            localStorage.removeItem('mobile_number');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('address');

            window.location.href = '/signin';
        }
    }
};
</script>

<style>
</style>
