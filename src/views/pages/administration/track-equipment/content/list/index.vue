<template>

    <div class="animate animate-fade-in">

        <h1 class="page-title mb-0">LIST OF TRACK EQUIPMENT</h1>

        <div class="mt-3">

            <div class="card card-body shadow-sm border-0 rounded-0">

                <div class="d-flex justify-content-end align-items-center mb-3">
                    <div>
                        <!-- <router-link
                            :to="'/administration/track-equipment/create'"
                            class="btn rounded-0 button-color me-3">
                            Add Track Equipment
                        </router-link> -->
                        <!-- <button
                            type="button"
                            class="btn rounded-0 button-color me-3"
                            @click="exportFile()">
                            Export
                        </button> -->
                    </div>
                    <div class="col-md-3 ">
                        <input type="text" v-model="searchQuery" @input="fetchBorrower" placeholder="Search equipment..."
                            class="form-control rounded-0">
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-bordered mb-0">
                        <thead>
                            <tr>
                                <th class="table-header">BORROWER NAME</th>
                                <th class="table-header">DEPARTMENT</th>
                                <th class="table-header">EQUIPMENT TYPE</th>
                                <th class="table-header">PROPERTY NUMBER</th>
                                <th class="table-header">BRAND</th>
                                <th class="table-header">MODEL</th>
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

                <div class="pagination-container">

                    <span class="entries-info">
                        Showing {{ startEntry }} to {{ endEntry }} of {{ totalEntries }} entries
                    </span>

                    <div class="pagination-buttons">
                        <button @click="goToPage(1)" :disabled="currentPage === 1">«</button>
                        <button @click="prevPage" :disabled="currentPage === 1">‹</button>

                        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
                            :class="{ active: page === currentPage }">
                            {{ page }}
                        </button>

                        <button @click="nextPage" :disabled="currentPage === totalPages">›</button>
                        <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">»</button>
                    </div>

                </div>
            </div>

        </div>

    </div>

</template>

<script>
import apiClient from "@/services/index"
import ItemComponent from "./content/item"
export default
{
    data()
    {
        return {
                items: [], // Your actual data
                searchQuery: "",
                isLoading: false,
                perPage: 6, // Number of items per page
                currentPage: 1,
                totalEntries: 57, // Example total count (update dynamically)
                isEmpty: false,
            };
    },

    components:
    {
        ItemComponent,
    },

    computed:
    {

        totalPages() {
            return Math.ceil(this.totalEntries / this.perPage);
        },

        startEntry() {
            return (this.currentPage - 1) * this.perPage + 1;
        },

        endEntry() {
            return Math.min(this.currentPage * this.perPage, this.totalEntries);
        },

        visiblePages() {
            const pages = [];
            const maxPages = 6;
            let start = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
            let end = Math.min(this.totalPages, start + maxPages - 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        }

    },

    mounted()
    {
        this.fetchBorrower();
    },

    methods:
    {
        async fetchBorrower()
        {
            try {
                this.isLoading = true;
                setTimeout(async () => {
                    const response = await apiClient.get(`/borrow`, {
                        params: {
                            search: this.searchQuery,
                            page: this.currentPage,
                            limit: this.perPage
                        }
                    });

                    console.log("Fetched Borrow Data:", response.data); // Debugging

                    this.items = response.data;
                    this.totalEntries = response.data.total; // Make sure to update this
                    this.isEmpty = this.items.length === 0; // Check if items array is empty
                    this.isLoading = false;
                }, 1000);
            } catch (error) {
                console.error("Error fetching borrow:", error);
            }
        },

        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.fetchBorrower(); // Fetch new data
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchBorrower();
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.fetchBorrower();
            }
        },

        async exportFile()
        {
            try
            {
                const response = await apiClient.get("/export-equipment", {
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
                console.error("Error occured");
            }
        },

        async importFile()
        {}
    },

    watch:
    {
        currentPage() {
            this.fetchBorrower();
        }
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
</style>