<template>

    <h1 class="page-title mb-0">MY BORRWER LIST</h1>

    <div class="mt-4">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="col-md-3 ">
                    <input
                        type="text"
                        v-model="searchQuery"
                        @input="fetchBorrower"
                        placeholder="Search equipment..."
                        class="form-control rounded-0">
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th class="table-header">EQUIPMENT TYPE</th>
                            <th class="table-header">STATUS</th>
                            <th class="table-header">DATE BORROWED</th>
                            <th class="table-header">DATE RETURNED</th>
                            <!-- <th class="table-header">DELIVERED BY</th> -->
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

</template>

<script>
import apiClient from "@/services/index"; // Import your API client
import ItemComponent from "./content/item";

export default {
    components: {
        ItemComponent,
    },

    data() {
        return {
            items: [],
            searchQuery: "",
            isLoading: false,
            perPage: 10,
            currentPage: 1,
            totalEntries: 0,
            isEmpty: false,
        };
    },

    computed: {
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

    mounted() {
        this.fetchBorrower();
    },

    methods: {
        async fetchBorrower()
        {
            try {
                this.isLoading = true;
                const response = await apiClient.get(`/borrow`, {
                    params:{
                        search: this.searchQuery
                    }
                });
                console.log("Fetched Borrow Data:", response.data); // Debugging
                this.items = response.data;
                this.isEmpty = this.items.length === 0;
                this.isLoading = false;
            } catch (error) {
                console.error("Error fetching borrow:", error.response?.data || error);
                this.isLoading = false;
            }
        },

        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.fetchBorrower();
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
</style>