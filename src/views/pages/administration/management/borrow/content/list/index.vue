<template>

    <h1 class="page-title mb-0">MANAGE BORROWED</h1>

    <div class="mt-4">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <router-link :to="'/management/borrow/create'" class="btn rounded-0 button-color me-3">
                        <i class="bx bx-plus me-2"></i> Add Borrower
                    </router-link>
                    <button
                        class="btn button-color rounded-0 me-3"
                        @click="exportFile()">
                        <i class="bx bx-upload me-2"></i> Export
                    </button>
                    <button
                        class="btn button-color rounded-0 me-3"
                        @click="importFile()">
                        <i class="bx bx-download me-2"></i> Import
                    </button>
                </div>
                <div class="col-md-4">
                    <input type="text" v-model="searchQuery" @input="fetchBorrower" placeholder="Type your search here"
                        class="form-control rounded-0">
                </div>
            </div>

            <div class="table-responsive table-scrollable">
                <table class="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th class="table-header">EQUIPMENT TYPE</th>
                            <th class="table-header">BORROWER NAME</th>
                            <th class="table-header">DEPARTMENT</th>
                            <th class="table-header">CONTACT #</th>
                            <th class="table-header">DATE BORROWED</th>
                            <th class="table-header">DATE RETURNED</th>
                            <!-- <th class="table-header">ACTION</th> -->
                            <th class="table-header">STATUS</th>
                            <th class="table-header">PERMISSION</th>
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
                items: [],
                previousStatuses: [],
                searchQuery: "",
                isLoading: false,
                isEmpty: false,
                perPage: 10,
                currentPage: 1,
                checkInterval: null
            }
        },

        mounted() {
            this.fetchBorrower(true);
            this.startStatusWatcher();
        },

        beforeUnmount()
        {
            clearInterval(this.checkInterval);
        },

        methods:
        {
            async fetchBorrower(saveStatus = false)
            {
                if (this.isLoading) return;
                this.isLoading = true;
                try
                {
                    const response = await apiClient.get(`/borrow`, {
                        params: {
                            search: this.searchQuery,
                            page: this.currentPage,
                            perPage: this.perPage
                        }
                    });

                    console.log("Fetched Borrow Data:", response.data); // Debugging

                    this.items = response.data;
                    this.isEmpty = this.items.length === 0;

                    if (saveStatus)
                    {
                        this.previousStatuses = this.items.map(item => item.status);
                    }

                    this.isLoading = false;
                }
                catch (error)
                {
                    console.error("Error fetching borrow:", error);
                }
                finally
                {
                    this.isLoading = false;
                }
            },

            startStatusWatcher()
            {
                this.checkInterval = setInterval(async () => {
                    try {
                        const response = await apiClient.get(`/borrow`, {
                            params: {
                                search: this.searchQuery,
                                page: this.currentPage,
                                perPage: this.perPage
                            }
                        });

                        const newItems = response.data;
                        const newStatuses = newItems.map(item => item.status);

                        const hasStatusChanged = newStatuses.some(
                            (status, index) => status !== this.previousStatuses[index]
                        );

                        if (hasStatusChanged) {
                            this.items = newItems;
                            this.previousStatuses = newStatuses;
                        }
                    } catch (error) {
                        console.error("Error checking status updates:", error);
                    }
                }, 5000);
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
                    link.setAttribute('download', 'borrow-list.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                catch(error)
                {
                    console.error("Error occured");
                }
            },

            async importFile()
            {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.csv, .xlsx';
                input.click();

                input.onchange = async () => {
                    const file = input.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append('file', file);

                    try {
                        const response = await apiClient.post('/borrowImport', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });

                        alert(response.data.message || "Import successful!");
                        this.fetchBorrower();
                    } catch (error) {
                        console.error("Import failed:", error);
                        alert("Import failed. Please check the file and try again.");
                    }
                };
            }
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