<template>

    <form action="">

        <div>

            <h1 class="page-title mb-3">BORROWED FORM</h1>

            <div class="row">

                <div class="col-md-4">
                    <div class="card card-body border-0 shadow-sm rounded-0">
                        <p class="mb-3"><strong>EQUIPMENT INFO</strong></p>

                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <label class="form-label mb-0">EQUIPMENT TYPE:</label>
                            <input type="text" class="form-control form-control-sm input-field border-0" disabled>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <label class="form-label mb-0">BRAND:</label>
                            <input type="text" class="form-control form-control-sm input-field border-0" disabled>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <label class="form-label mb-0">MODEL:</label>
                            <input type="text" class="form-control form-control-sm input-field border-0" disabled>
                        </div>
                    </div>
                </div>

                <div class="col-md-8">
                    <div class="card card-body border-0 shadow-sm rounded-0">
                        <div class="row">
                            <div class="col-md-6">
                                <p class="mb-3"><strong>PERSONAL INFO</strong></p>

                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="form-label mb-0">NAME:</label>
                                    <input type="text" class="form-control form-control-sm input-field rounded-0"/>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="form-label mb-0">EMAIL:</label>
                                    <input type="text" class="form-control form-control-sm input-field rounded-0">
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="form-label mb-0">MOBILE NUMBER:</label>
                                    <input type="text" class="form-control form-control-sm input-field rounded-0">
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="form-label mb-0">DEPARTMENT:</label>
                                    <input type="text" class="form-control form-control-sm input-field rounded-0">
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <label class="form-label mb-0">POSITION:</label>
                                    <input type="text" class="form-control form-control-sm input-field rounded-0">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <p class="mb-3"><strong>BORROW EQUIPMENT INFO</strong></p>

                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="form-label mb-0">DATE BORROW:</label>
                                    <input type="date" class="form-control form-control-sm input-field rounded-0">
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="form-label mb-0">DATE RETURN:</label>
                                    <input type="date" class="form-control form-control-sm input-field rounded-0">
                                </div>
                                <div class="d-flex justify-content-between">
                                    <label class="form-label mb-0">DESCRIPTION:</label>
                                    <textarea name="" id="" cols="30" rows="5" class="form-control form-control-sm input-field rounded-0"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="text-end mt-3">
                <router-link :to="'/client/equipment'" class="btn btn-primary me-3">CANCEL</router-link>
                <button type="submit" class="btn btn-primary">SUBMIT</button>
            </div>

        </div>

    </form>

</template>

<script>
export default {

}
</script>

<style scoped>
.page-title {
    color: #007bff;
}
.input-field {
    width: 60%;
}
</style>