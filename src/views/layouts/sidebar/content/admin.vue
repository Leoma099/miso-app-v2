<template>
  
    <div class="mb-3">

        <li>
            <router-link
                exact-active-class="active"
                :to="'/administration/dashboard'">
                <i class="bx bxs-dashboard me-2"></i>Dashboard
            </router-link>
        </li>

        <li>
            <router-link
                exact-active-class="active"
                :to="'/administration/equipment'">
                <i class="bx bxs-dashboard me-2"></i>Equipment
            </router-link>
        </li>

        <li>
            <router-link
                exact-active-class="active"
                :to="'/administration/track-equipment'">
                <i class="bx bxs-dashboard me-2"></i>Track Equipment
            </router-link>
        </li>

        <li>
            <router-link
                :class="{ 'active': $route.path.includes('/administration/borrow')}"
                :to="'/administration/borrow'">
                <i class="bx bxs-dashboard me-2"></i>Borrow Management
            </router-link>
        </li>

        <li>
            <router-link
                :class="{ 'active': $route.path.includes('/administration/report')}"
                :to="'/administration/report'">
                <i class="bx bxs-dashboard me-2"></i>Report and Analytic
            </router-link>
        </li>

        <li>
            <router-link
                :class="{ 'active': $route.path.includes('/administration/calendar')}"
                :to="'/administration/calendar'">
                <i class="bx bxs-dashboard me-2"></i>Calendar
            </router-link>
        </li>

        <li>
            <router-link
                :class="{ 'active': $route.path.includes('/administration/account')}"
                :to="'/administration/account'">
                <i class="bx bxs-dashboard me-2"></i>User Account
            </router-link>
        </li>

    </div>

</template>

<script>
export default {

}
</script>

<style>

</style>