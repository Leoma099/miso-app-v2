<template>

    <div class="d-flex justify-content-between align-items-center">
        <p class="page-title mb-0">REPORT AND ANALYTIC</p>
        <button type="button" class="btn rounded-0 button-color" data-bs-toggle="modal" data-bs-target="#searchBorrowerHistory">FILTER SEARCH</button>
    </div>

    <filter-modal />

    <div class="mt-4">

        <div class="card card-body shadow-sm border-0 rounded-0" v-if="!isRecordShow">
            <p class="table-header mb-0">NO RECORD FOUND</p>
        </div>

        <div class="table-responsive" v-else>
            <table class="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th class="table-header">BORROWER NAME</th>
                        <th class="table-header">EQUIPMENT TYPE</th>
                        <th class="table-header">BRAND</th>
                        <th class="table-header">MODEL</th>
                        <!-- CONDITION: GODD, DAMAGE -->
                        <th class="table-header">CONDITION</th>
                        <!-- STATUS: RETURNED, LATE, LOST -->
                        <th class="table-header">STATUS</th>
                        <th class="table-header">DATE BORROWED</th>
                        <th class="table-header">DATE RETURNED</th>
                        <!-- ONLT VIEW BUTTON -->
                        <th class="table-header">ACTION</th>
                    </tr>
                </thead>

                <tbody>
                    <item-component
                        v-for="(item, index) in items"
                        :key="index"
                        :item="item"
                        />
                </tbody>

            </table>
        </div>

    </div>

</template>

<script>
import FilterModal from "./components/modals/filter.vue";
export default
{
    components:
    {
        FilterModal
    },

    data()
    {
        return{
            isRecordShow: false,
        }
    }
};
</script>

<style scoped>
p {
    font-weight: 600;
    font-size: 2rem;
    color: #793A91;
}
.button-color {
    background-color: #734F79;
    color: #ffffff;
}
.button-color:hover {
    background-color: #793A91;
    color: #ffffff;
}
.table-header {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    border-left: 5px solid #ff0000;
    background-color: #ff6242;
    color: #ffffff;
}
</style>