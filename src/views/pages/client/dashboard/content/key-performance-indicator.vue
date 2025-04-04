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
                        <span class="total-number mb-0">{{ totalBorrowedEquipment }}</span>
                        <p class="mb-0">BORROWED EQUIPMENT</p>
                    </div>
                    <i class="bx bx-laptop dashboard-icon"></i>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default
{
    data()
    {
        return{
            totalReturnedEquipment: 0,
            totalBorrowedEquipment: 0,
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