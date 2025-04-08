<template>

    <h1 class="page-title mb-0">LIST OF RIDER</h1>

    <div class="mt-3">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <router-link
                        :to="'/administration/delivery/create'"
                        class="btn rounded-0 button-color">Add New Rider
                    </router-link>
                </div>
                <div class="col-md-3 ">
                    <input type="text" v-model="searchQuery" @input="fetchBorrower" placeholder="Search item"
                        class="form-control rounded-0">
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th class="table-header">NAME</th>
                            <th class="table-header">EMAIL</th>
                            <th class="table-header">MOBILE NO.</th>
                            <th class="table-header">ADDRESS</th>
                            <th class="table-header">ACTION</th>
                        </tr>
                    </thead>
                    <tbody v-if="!isEmpty">
                        <item-component
                            v-for="(item, index) in items"
                            :key="index"
                            :item="item"/>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="8" class="text-center">No Data Record</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>

</template>

<script>
import ItemComponent from "./content/item.vue"
export default
{
    data()
    {
        return{
            items: [],
            isEmpty: true,
        }
    },

    components:
    {
        ItemComponent
    }
}
</script>

<style scoped>
.page-title
{
    color: #007bff;
}
.button-color
{
    background-color: #007bff;
    color: #ffffff;
}
.button-color:hover
{
    background-color: #3798ff;
    color: #ffffff;
}
.table-header
{
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #007bff;
    color: #ffffff;
}
</style>