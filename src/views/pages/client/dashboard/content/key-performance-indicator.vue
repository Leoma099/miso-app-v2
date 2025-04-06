<template>

    <div class="row mb-3">
        <div class="col-md-6">
            <div class="card card-body shadow-sm rounded-0 border-0 ">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="total-number mb-0">{{ totalReturnedEquipment }}</span>
                        <p class="mb-0">RETURNED EQUIPMENT</p>
                    </div>
                    <i class="bx bx-collection dashboard-icon"></i>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card card-body shadow-sm rounded-0 border-0 ">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="total-number mb-0">{{ totalBorrowEquipment }}</span>
                        <p class="mb-0">BORROWED EQUIPMENT</p>
                    </div>
                    <i class="bx bx-laptop dashboard-icon"></i>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import apiClient from "@/services/index";
export default
{
    data()
    {
        return{
            borrow: [],
            totalReturnedEquipment: 0,
        }
    },

    computed:
    {
        totalBorrowEquipment()
        {
            return this.borrow.length;
        }
    },

    created()
    {
        this.loadData();
    },

    methods:
    {

        async loadData()
        {

            try
            {
                const ticketResponse = await apiClient.get('/borrow');
                this.borrow = ticketResponse.data;

                const statusResponse = await apiClient.get('/status');
                this.totalReturnedEquipment = statusResponse.data.returned;
            }
            catch(error)
            {
                console.error("Error loading data:", error);
            }

        }

    }
}
</script>

<style scoped>
.total-number {
    font-size: 3rem;
    font-weight: 600;
}
.dashboard-icon {
    font-size: 4rem;
}
p
{
    font-size: 1.5rem;
    font-weight: 600;
}
</style>