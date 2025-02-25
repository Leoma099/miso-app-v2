<template>
    <div class="row mb-3">
        <div class="col-md-4">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <div class="d-flex justify-content-between align-items-center">
                    <p class="indicator-title mb-0">TOTAL EQUIPMENT</p>
                    <span class="total-number mb-0">{{ totalEquipment }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <div class="d-flex justify-content-between align-items-center">
                    <p class="indicator-title mb-0">TOTAL BORROW</p>
                    <span class="total-number mb-0">{{ totalBorrow }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <div class="d-flex justify-content-between align-items-center">
                    <p class="indicator-title mb-0">TOTAL USER</p>
                    <span class="total-number mb-0">{{ totalUser }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

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
            return this.equipment.length;
        },
        totalBorrow() {
            return this.borrow.length;
        },
        totalUser() {
            return this.account.length;
        }
    },

    created() {
        this.loadData();
    },

    methods: {
        async loadData() {
            try {
                // Fetch Equipment Data
                const equipmentResponse = await axios.get('http://127.0.0.1:8000/api/equipment');
                this.equipment = equipmentResponse.data.data;

                // Fetch Borrow Data
                const borrowResponse = await axios.get('http://127.0.0.1:8000/api/borrow');
                this.borrow = borrowResponse.data.data;

                // Fetch User Data
                const userResponse = await axios.get('http://127.0.0.1:8000/api/account');
                this.account = userResponse.data.data;
            } catch (error) {
                console.error("Error loading data:", error);
            }
        }
    }
};
</script>

<style scoped>
.indicator-title {
    font-size: 1.5rem;
    font-weight: 600;
}
.total-number {
    font-size: 2rem;
    font-weight: 600;
}
</style>
