<template>
  
    <div class="mb-3">

        <li>
            <router-link
                exact-active-class="active"
                :to="'/administration/dashboard'">
                <i class="bx bx-category me-2"></i>Dashboard
            </router-link>
        </li>

        <li>
            <router-link
                exact-active-class="active"
                :to="'/administration/equipment'">
                <i class="bx bx-box me-2"></i>Equipment
            </router-link>
        </li>

        <li>
            <router-link
                exact-active-class="active"
                :to="'/administration/track-equipment'">
                <i class="bx bx-search-alt-2 me-2"></i>Track Equipment
            </router-link>
        </li>

        <li>
            <router-link
                exact-active-class="active"
                :to="'/administration/equipment-release'">
                <i class="bx bx-send me-2"></i>Equipment Release
            </router-link>
        </li>

        <li>
            <router-link
                :class="{ 'active': $route.path.includes('/administration/borrow')}"
                :to="'/administration/borrow'">
                <i class="bx bx-archive me-2"></i>Borrow Management
            </router-link>
        </li>

        <li>
            <router-link
                :class="{ 'active': $route.path.includes('/administration/report')}"
                :to="'/administration/report'">
                <i class="bx bx-line-chart me-2"></i>Report and Analytic
            </router-link>
        </li>

        <li>
            <router-link
                :class="{ 'active': $route.path.includes('/administration/calendar')}"
                :to="'/administration/calendar'">
                <i class="bx bx-calendar me-2"></i>Calendar
            </router-link>
        </li>

        <li>
            <router-link
                :class="{ 'active': $route.path.includes('/administration/account')}"
                :to="'/administration/account'">
                <i class="bx bx-group me-2"></i>User Account
            </router-link>
        </li>

        <li>
            <router-link
                :class="{ 'active': $route.path.includes('/administration/department')}"
                :to="'/administration/department'">
                <i class="bx bx-building me-2"></i>Department Category
            </router-link>
        </li>

        <li>
            <router-link
                :class="{ 'active': $route.path.includes('/administration/delivery')}"
                :to="'/administration/delivery'">
                <i class="bx bx-cart me-2"></i>Delivery Category
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