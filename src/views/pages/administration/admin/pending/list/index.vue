<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="page-title mb-0">LIST OF PENDING</h1>
        <div class="col-md-4">
            <input type="text" v-model="searchQuery" @input="fetchBorrower" placeholder="Type your search here"
                class="form-control rounded-0">
        </div>
    </div>

    <div class="mt-4">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <div class="table-responsive table-scrollable">
                <table class="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th class="table-header">EQUIPMENT TYPE</th>
                            <th class="table-header">PROPERTY NUMBER</th>
                            <th class="table-header">BORROWER NAME</th>
                            <th class="table-header">DEPARTMENT</th>
                            <th class="table-header">DATE BORROWED</th>
                            <th class="table-header">DATE RETURNED</th>
                            <th class="table-header">STATUS</th>
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
            <!-- Pagination is here -->
            <div class="pagination-container">
                <div class="entries-info">
                    Showing {{ (currentPage - 1) * perPage + 1 }} to {{ currentPage * perPage }} of {{ items.length }} records
                </div>
                <div class="pagination-buttons">
                    <!-- Pagination buttons here -->
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import apiClient from "@/services/index";
import ItemComponent from "./content/item"
export default
    {

        components:
        {
            ItemComponent,
        },

        data() {
            return {

                items: [], // Your actual data
                searchQuery: "",
                isLoading: false,
                isEmpty: false,
                perPage: 10,
                currentPage: 1

            }
        },

        mounted() {
            this.fetchBorrower();
        },

        methods:
        {
            async fetchBorrower() {
                try {
                    this.isLoading = true;
                    setTimeout(async () => {
                        const response = await apiClient.get(`/borrowPending`, {
                            params: {
                                search: this.searchQuery,
                                page: this.currentPage,
                                perPage: this.perPage
                            }
                        });

                        console.log("Fetched Borrow Data:", response.data.data); // Debugging

                        this.items = response.data.data;
                        this.totalEntries = response.data.total; // Make sure to update this
                        this.isEmpty = this.items.length === 0; // Check if items array is empty
                        this.isLoading = false;
                    }, 1000);
                } catch (error) {
                    console.error("Error fetching borrow:", error);
                }
            },

        }

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

.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    font-size: 14px;
}

.entries-info {
    color: #666;
}

.pagination-buttons {
    display: flex;
    gap: 5px;
}

.pagination-buttons button {
    background: white;
    border: 1px solid #ddd;
    padding: 6px 10px;
    cursor: pointer;
    transition: 0.3s;
}

.pagination-buttons button:hover {
    background: #f0f0f0;
}

.pagination-buttons button.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
}

.pagination-buttons button:disabled {
    background: #eee;
    cursor: not-allowed;
}
.table-scrollable
{
    max-height: 500px;
    overflow: hidden; /* Hidden by default */
}
.table-scrollable:hover
{
    overflow-y: auto; /* Show scrollbar when hovering */
}
</style>