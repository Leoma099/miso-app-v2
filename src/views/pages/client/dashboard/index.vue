<template>

    <div class="animation animation-fade-in">

        <div class="d-flex justify-content-between align-items-center">
            <h1 class="page-title mb-0">DASHBOARD</h1>
        </div>

        <div class="mt-3">

            <key-perfomance-indicator />

            <!-- <div class="row mb-3">

                <div class="col-md-6">
                    <borrower-statistic />
                </div>

                <div class="col-md-6">
                    <equipment-statistic />
                </div>

            </div>

            <div class="row mb-3">

                <div class="col-md-7">
                    <user-list />
                </div>

                <div class="col-md-5">
                    <key-performance-equipment />
                </div>

            </div>

            <div class="row">

                <div class="col-md-6">
                    <equipment-list />
                </div>

                <div class="col-md-6">
                    <overdue-equipment />
                </div>

            </div> -->
            
        </div>

    </div>

</template>

<script>
import KeyPerfomanceIndicator from "./content/key-performance-indicator.vue";
// import UserList from "./content/user-list.vue";
// import KeyPerformanceEquipment from "./content/key-performance-equipment.vue";
// import OverdueEquipment from "./content/overdue-equipment.vue";
// import EquipmentList from './content/equipment-list.vue';

// import BorrowerStatistic from "./content/borrower_statistic.vue";
// import EquipmentStatistic from "./content/equipment_statistic.vue";
export default
{
    components:
    {
        KeyPerfomanceIndicator,
        // UserList,
        // KeyPerformanceEquipment,
        // OverdueEquipment,
        // EquipmentList,

        // BorrowerStatistic,
        // EquipmentStatistic,
    }
}
</script>

<style scoped>
.animation
{
    animation-duration: 1s;
    animation-fill-mode: none;
}
.animation-fade-in
{
    animation-name: fadeIn;
}

@keyframes fadeIn{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
.page-title{
    color: #007bff;
}
</style>