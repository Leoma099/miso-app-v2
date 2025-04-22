<template>
    <div class="row mb-3">
        <div class="col-md-4">
            <router-link :to="'/equipment/list'" style="text-decoration: none;">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="total-number mb-0">{{ totalEquipment }}</span>
                            <p class="indicator-title mb-0">TOTAL EQUIPMENT</p>
                        </div>
                        <i class="bx bx-laptop dashboard-icon"></i>
                    </div>
                </div>
            </router-link>
        </div>
        <!-- <div class="col-md-2">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="total-number mb-0">{{ totalEquipmentAvailability }}</span>
                        <p class="indicator-title mb-0">EQUIPMENT AVAILABILITY</p>
                    </div>
                    <i class="bx bx-select-multiple dashboard-icon"></i>
                </div>
            </div>
        </div> -->
        <div class="col-md-4">
            <router-link :to="'/borrow/list'" style="text-decoration: none;">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="total-number mb-0">{{ totalBorrow }}</span>
                            <p class="indicator-title mb-0">BORROWED EQUIPMENT</p>
                        </div>
                        <i class="bx bx-collection dashboard-icon"></i>
                    </div>
                </div>
            </router-link>
        </div>
        <!-- <div class="col-md-2">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="total-number mb-0">{{ totalPending }}</span>
                        <p class="indicator-title mb-0">BORROWED PENDING</p>
                    </div>
                    <i class="bx bx-collection dashboard-icon"></i>
                </div>
            </div>
        </div> -->
        <!-- <div class="col-md-2">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="total-number mb-0">{{ totalReturned }}</span>
                        <p class="indicator-title mb-0">BORROWED RETURNED</p>
                    </div>
                    <i class="bx bx-collection dashboard-icon"></i>
                </div>
            </div>
        </div> -->
        <div class="col-md-4">
            <router-link :to="'/account/list'" style="text-decoration: none;">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="total-number mb-0">{{ totalUser }}</span>
                            <p class="indicator-title mb-0">TOTAL USER</p>
                        </div>
                        <i class="bx bx-user dashboard-icon"></i>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/index";

export default {
    data() {
        return {
            equipment: [], 
            account: [],
            borrow: []
        };
    },

    computed: {
        totalEquipment() {
            return (this.equipment || []).length;
        },
        totalEquipmentAvailability()
        {
            return this.equipment.filter(item => item.availability == 1).length; // Available
        },
        totalBorrow() {
            return (this.borrow || []).length;
        },
        totalUser() {
            return (this.account || []).length;
        },
        totalPending() {
        return this.borrow.filter(item => item.status == 1).length; // Count pending
        },
        totalReturned() {
            return this.borrow.filter(item => item.status == 3).length; // Count returned
        },
    },

    methods: {
        async loadData() {
            try {
                const equipmentResponse = await apiClient.get('/equipment');
                console.log("Equipment Response:", equipmentResponse.data);
                this.equipment = equipmentResponse.data?.data || [];

                const borrowResponse = await apiClient.get('/borrow');
                console.log("Borrow Response:", borrowResponse.data);
                // If the API doesn't return data as 'data', update this accordingly
                this.borrow = Array.isArray(borrowResponse.data) ? borrowResponse.data : [];

                const userResponse = await apiClient.get('/account');
                console.log("User Response:", userResponse.data);
                this.account = userResponse.data?.data || [];
            } catch (error) {
                console.error("Error loading data:", error);
            }
        }
    },

    created() {
        this.loadData();
    },
};
</script>

<style scoped>
.indicator-title {
    font-size: .80rem;
    font-weight: 600;
}
.total-number {
    font-size: 3rem;
    font-weight: 600;
}
.dashboard-icon {
    font-size: 4rem;
}
</style>
