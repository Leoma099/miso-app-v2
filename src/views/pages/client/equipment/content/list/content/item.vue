<template>

    <div class="col-md-3 mb-3">
        <div class="card card-body shadow-sm border-0 rounded-0">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <label class="form-label mb-0">EQUIPMENT TYPE:</label>
                <input type="text" class="form-control input-field border-0" :value="item.type" disabled>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
                <label class="form-label mb-0">BRAND:</label>
                <input type="text" class="form-control input-field border-0" :value="item.brand" disabled>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <label class="form-label mb-0">MODEL:</label>
                <input type="text" class="form-control input-field border-0" :value="item.model" disabled>
            </div>
            <router-link :to="`/client/borrow/create?id=${item?.id}`" class="btn button-signin w-100 mt-3">VIEW DETAILS</router-link>
        </div>
    </div>

</template>

<script>
export default
{
    props:
    {
        item: Object,
    },
};
</script>

<style scoped>
.button-signin {
    border: 2px solid #007bff;
    color: #007bff;
    transition: all 0.2s ease-in-out;
}
.button-signin:hover {
    background: #007bff;
    color: #ffffff;
    font-weight: 600;
}
.input-field {
    width: 60%;
}
</style>
