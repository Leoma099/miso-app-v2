<template>
    <h1 class="page-title mb-0">LIST OF EQUIPMENT</h1>

    <div class="mt-3">
        <div class="card card-body shadow-sm border-0 rounded-0">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <router-link :to="'/management/equipment/create'" class="btn rounded-0 button-color me-3">
                        <i class="bx bx-plus me-2"></i> Add Equipment
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
                    <input type="text" v-model="searchQuery" @input="fetchEquipment" placeholder="Type your search here"
                        class="form-control rounded-0">
                </div>
            </div>

            <div class="table-responsive table-scrollable">
                <table class="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th class="table-header">EQUIPMENT TYPE</th>
                            <th class="table-header">PROPERTY NUMBER</th>
                            <th class="table-header">SERIAL NUMBER</th>
                            <th class="table-header">BRAND</th>
                            <th class="table-header">MODEL</th>
                            <th class="table-header">QTY</th>
                            <th class="table-header">STATUS</th>
                            <th class="table-header">ACTION</th>
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
import apiClient from "@/services/index"
import ItemComponent from "./content/item"

export default {
    components: {
        ItemComponent,
    },

    data() {
        return {
            items: [],
            searchQuery: "",
            isLoading: false,
            isEmpty: false,
            perPage: 10,
            currentPage: 1
        };
    },

    mounted() {
        this.fetchEquipment();
    },

    methods: {
        async fetchEquipment() {
            try {
                this.isLoading = true;
                const response = await apiClient.get(`/equipment`, {
                    params: {
                        search: this.searchQuery,
                        page: this.currentPage,
                        perPage: this.perPage
                    }
                });

                console.log("Fetched Equipment Data:", response.data); // Debugging

                this.items = response.data.data;
                this.isEmpty = this.items.length === 0;
                this.isLoading = false;
            } catch (error) {
                console.error("Error fetching equipment:", error);
                this.isLoading = false;
                this.isEmpty = true;
            }
        },

        async exportFile() {
            try {
                const response = await apiClient.get("/export-equipment", {
                    responseType: 'blob'
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'equipment-list.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error("Error occured");
            }
        },

        async importFile() {
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
                    const response = await apiClient.post('/import-equipment', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    alert(response.data.message || "Import successful!");
                    this.fetchEquipment();
                } catch (error) {
                    console.error("Import failed:", error);
                    alert("Import failed. Please check the file and try again.");
                }
            };
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
