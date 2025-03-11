<template>

    <h1 class="page-title mb-0">View User Account</h1>
    <router-link :to="'/administration/account'">Go back to page</router-link>

    <form @submit.prevent="submit()" class="mt-4">

        <div class="card card-body shadow-sm border-0 rounded-0 col-6 mx-auto">

            <div class="row">

                <div class="col-md-4">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* ID Number:</label>
                        <input type="text" name="" id="" class="form-control form-control-sm rounded-0" placeholder="ex. 123456789" disabled>
                    </div>
                </div>

                <div class="col-md-8">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Full Name:</label>
                        <input type="text" name="" id="" class="form-control form-control-sm rounded-0" placeholder="ex. Juan Dela Cruz" disabled>
                    </div>
                </div>

            </div>

            <div class="row">

                <div class="col-md-7">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Department / Office Name:</label>
                        <select name="" id="" class="form-control form-control-sm roundeo-0" disabled>
                            <option value="0" disabled selected>-- Select Department --</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-5">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Postion:</label>
                        <input type="text" name="" id="" class="form-control form-control-sm rounded-0" placeholder="ex. HR Manager" disabled>
                    </div>
                </div>

            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">* Office Address:</label>
                <input type="text" name="" id="" class="form-control form-control-sm rounded-0" placeholder="ex. Subic Bay Freeport Zone" disabled>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">* Your Address:</label>
                <input type="text" name="" id="" class="form-control form-control-sm rounded-0" placeholder="ex. #123 Apartment Stree" disabled>
            </div>

            <div class="row">

                <div class="col-md-7">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Email:</label>
                        <input type="text" name="" id="" class="form-control form-control-sm rounded-0" placeholder="ex. example123@gmail.com" disabled>
                    </div>
                </div>

                <div class="col-md-5">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Mobile Number:</label>
                        <input type="text" name="" id="" class="form-control form-control-sm rounded-0" placeholder="ex. +123456789" disabled>
                    </div>
                </div>

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
.button-color {
    background-color: #007bff;
    color: #ffffff;
}
.button-color:hover {
    background-color: #3798ff;
    color: #ffffff;
}
.text-title {
    color: #007bff;
}
</style>