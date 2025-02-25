<template>

    <div class="modal fade" id="searchBorrowerHistory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-0 border-0">
                <div class="modal-body">
                    <form @submit.prevent="submit()">
                        <div class="form-group mb-3">
                            <label class="form-label">BORROW ID:</label>
                            <input type="text" class="form-control rounded-0" placeholder="Enter borrow id">
                        </div>
                        <div class="form-group">
                            <label class="form-label">:</label>
                            <input type="text" class="form-control rounded-0" placeholder="Enter borrow id">
                        </div>
                        <div class="d-flex justify-content-end mt-3">
                            <button type="submit" class="btn rounded-0 button-color">Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {

}
</script>

<style scoped>
.button-color {
    background-color: #007bff;
    color: #ffffff;
}

.button-color:hover {
    background-color: #3798ff;
    color: #ffffff;
}
</style>