<template>
    <div class="d-flex justify-content-between">
        <h1 class="page-title mb-0">REPORT AND ANALYTICS</h1>
        <div class="col-4">
            <div class="card card-body shadow-sm rounded-0 border-0">
                <form @submit.prevent="searchRecord()">
                    <div class="mb-3">
                        <h5 class="mb-0 me-3">Date:</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <input type="date" class="form-control form-control-sm rounded-0" v-model="filters.date_borrow">
                            </div>
                            <div class="col-md-6">
                                <input type="date" class="form-control form-control-sm rounded-0" v-model="filters.date_return">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <h5 class="mb-0 me-3">Department:</h5>
                        <div class="col-md-12">
                            <select class="form-select form-select-sm rounded-0" v-model="filters.office_name">
                                <option value="" selected>All Department</option>
                                <option v-for="(department, index) in departments" :key="index" :value="department.office_name">
                                    {{ department.office_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <h5 class="mb-0 me-3">Accountable Person:</h5>
                        <div class="col-md-12">
                            <select class="form-select form-select-sm rounded-0" v-model="filters.full_name">
                                <option value="" selected>All User</option>
                                <option v-for="(client, index) in clients" :key="index" :value="client.full_name">
                                    {{ client.full_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <h5 class="mb-0 me-3">Property Number:</h5>
                        <div class="col-md-12">
                            <input
                                type="text"
                                class="form-control form-control-sm rounded-0"
                                placeholder="Enter property number"
                                v-model="filters.property_number">
                        </div>
                    </div>
                    <div class="text-end">
                        <button type="submit" class="btn btn-sm button-color rounded-0 me-3">Search</button>
                        <button type="button" class="btn btn-sm button-color rounded-0" @click="exportFile()">Excel Export</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="mt-4">

        <statistic-department />

    </div>

    <div class="mt-4">
        <div class="card card-body shadow-sm border-0 rounded-0" v-if="!isRecordShow"></div>
        <div class="card card-body shadow-sm border-0" v-else>
            <div class="table-responsive">
                <table class="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th class="table-header">BORROWER NAME</th>
                            <th class="table-header">EQUIPMENT TYPE</th>
                            <th class="table-header">BRAND</th>
                            <th class="table-header">MODEL</th>
                            <th class="table-header">CONDITION</th>
                            <th class="table-header">STATUS</th>
                            <th class="table-header">DATE BORROWED</th>
                            <th class="table-header">DATE RETURNED</th>
                            <th class="table-header">OFFICE NAME</th>
                        </tr>
                    </thead>
                    <tbody>
                        <item-component v-for="(item, index) in items" :key="index.id" :item="item" />
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/index";
import ItemComponent from "./content/item.vue"
import StatisticDepartment from "./content/statistic-department.vue";
export default
{
    components:
    {
        ItemComponent,
        StatisticDepartment
    },

    data() {
        return {
            isRecordShow: false,
            clients: [],
            departments: [],
            items: [],
            filters: {
                date_borrow: "",
                date_return: "",
                office_name: "",
                full_name: "",
                property_number: "",
            },
        };
    },
    mounted()
    {
        this.fetchClient();
        this.fetchDepartment();
    },

    methods:
    {
        async fetchDepartment()
        {
            try
            {
                const response = await apiClient.get("/department");
                this.departments = response.data;
                console.log("Department fetched successfully:", response.data);
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        },

        async fetchClient()
        {
            try
            {
                const response = await apiClient.get("/accountClient");
                this.clients = response.data;
            }
            catch (error)
            {
                console.error("Error fetching clients:", error);
            }
        },

        async searchRecord() {
            try {
                const response = await apiClient.get(`/borrowRecord?date_borrow=${this.filters.date_borrow}&date_return=${this.filters.date_return}&office_name=${this.filters.office_name}&full_name=${this.filters.full_name}&property_number=${this.filters.property_number}`);
                console.log("API Response:", response.data); // Debugging
                this.items = response.data.data; // Adjust based on API response
                this.isRecordShow = this.items.length > 0;
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        },

        async exportFile()
        {
            try
            {
                const response = await apiClient.get("/borrowExport", {
                    responseType: 'blob'
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'equipment-list.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        },

    },
};
</script>

<style scoped>
.page-title {
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
