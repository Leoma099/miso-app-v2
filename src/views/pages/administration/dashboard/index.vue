<template>

    <div class="animation animation-fade-in">

        <h1 class="page-title mb-0">DASHBOARD</h1>

        <div class="mt-3">

            <key-perfomance-indicator class="mb-4" />

            <div class="row">

                <div class="col-md-8">
                    <div class="mb-4">
                        <equipment-count/>
                    </div>

                    <div>
                        <department-count />
                    </div>
                </div>

                <div class="col-md-4">

                    <div class="mb-4">
                        <show-calendar />
                    </div>

                    <div class="mb-4">
                        <borrower-statistic />
                    </div>

                </div>

            </div>
            
        </div>

    </div>

</template>

<script>
import KeyPerfomanceIndicator from "./content/key-performance-indicator.vue";
import BorrowerStatistic from "./content/borrower_statistic.vue";
import ShowCalendar from "./content/show-calendar.vue";
import EquipmentCount from "./content/equipment_count.vue";
import DepartmentCount from "./content/department_count.vue";
export default
{
    components:
    {
        KeyPerfomanceIndicator,
        BorrowerStatistic,
        ShowCalendar,
        EquipmentCount,
        DepartmentCount
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