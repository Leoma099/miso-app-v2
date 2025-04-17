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
                            <th class="table-header">QUANTITY</th>
                            <th class="table-header">DATE BORROWED</th>
                            <th class="table-header">DATE RETURNED</th>
                            <th class="table-header">RELEASED BY</th>
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

export default
{
    components:
    {
        ItemComponent,
    },

    data()
    {
        return {
            items: [],
            previousStatuses: [],
            searchQuery: "",
            isLoading: false,
            isEmpty: false,
            perPage: 10,
            currentPage: 1,
            checkInterval: null
        };
    },

    mounted()
    {
        this.fetchBorrower(true); // initial fetch with saving statuses
        this.startStatusWatcher();
    },
    
    beforeUnmount()
    {
        clearInterval(this.checkInterval);
    },

    methods:
    {
        async fetchBorrower(saveStatus = false) {
            if (this.isLoading) return;
            this.isLoading = true;
            try {
                const response = await apiClient.get(`/borrow`, {
                    params: {
                        search: this.searchQuery,
                        page: this.currentPage,
                        perPage: this.perPage
                    }
                });
                this.items = response.data;
                this.isEmpty = this.items.length === 0;
                if (saveStatus) {
                    this.previousStatuses = this.items.map(item => item.status);
                }
            } catch (error) {
                console.error("Error fetching borrow:", error);
            } finally {
                this.isLoading = false;
            }
        },
        startStatusWatcher() {
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