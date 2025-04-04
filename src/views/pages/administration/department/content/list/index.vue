<template>

    <h1 class="page-title mb-0">DEPARTMENT LIST</h1>

    <div class="mt-3">
        
        <div class="card card-body shadow-sm border-0 rounded-0">

            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <router-link
                        :to="'/administration/department/create'"
                        class="btn rounded-0 button-color">Add New Department
                    </router-link>
                </div>
                <div class="col-md-3">
                    <input
                        type="text"
                        v-model="searchQuery"
                        @input="fetchDepartment"
                        placeholder="Search department"
                        class="form-control form-control-sm rounded-0">
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th class="table-header">OFFICE NAME</th>
                            <th class="table-header">OFFICE ADDRESS</th>
                            <th class="table-header">TELL NO.</th>
                            <th class="table-header">FAX NO.</th>
                            <!-- <th class="table-header">ACTION</th> -->
                        </tr>
                    </thead>

                    <tbody v-if="!isEmpty">
                        <item-component
                        v-for="(item, index) in isLoading ? new Array(items.length || perPage).fill(null) : items"
                        :key="item?.id || index" :item="item" :isLoading="isLoading" />
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
import ItemComponent from "./content/item.vue";
import apiClient from "@/services/index.js";
export default
{
    name: "Department",

    data()
    {
        return{

            items: [], // Your actual data
            searchQuery: "",
            isLoading: false,
            isEmpty: false,

        }
    },

    components:
    {
        ItemComponent
    },

    mounted()
    {
        this.fetchDepartment();
    },

    methods:
    {
        async fetchDepartment()
        {
            try
            {
                this.isLoading = true,
                setTimeout(async () => {
                    const response = await apiClient.get('/department');
                    console.log("Fetch department successfully:", response.data);
                    this.items = response.data; // Ensure correct data structure
                    this.isEmpty = this.items.length === 0;
                    this.isLoading = false;
                }, 1000);
            }
            catch(error)
            {
                console.error("Error occurred:", error);
                this.isLoading = false;
                this.isEmpty = true;
            }
        },
    },
}
</script>

<style scoped>
.page-title{
    color: #007bff;
}
.button-color {
    background-color: #007bff;
    color: #ffffff;
}

.button-color:hover {
    background-color: #3798ff;
    color: #ffffff;
}

.table-header {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #007bff;
    color: #ffffff;
}
</style>