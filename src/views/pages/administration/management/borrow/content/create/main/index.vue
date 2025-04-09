<template>

    <div class="col-md-6 mx-auto">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <form @submit.prevent="submit()">

                <h5 class="page-title">ACCOUNT INFO</h5>

                <div class="row mb-3">
                    
                    <div class="col-md-4">
                        <label class="form-label">* Id Number:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            maxlength="9"
                            v-model="form.id_number"
                            placeholder="ex. 000000001"
                            required>
                    </div>

                    <div class="col-md-8">
                        <label class="form-label">* Full Name:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.full_name"
                            placeholder="ex. Juan Dela Cruz"
                            required>
                    </div>

                </div>

                <div class="row mb-3">

                    <div class="col-md-8">
                        <label class="form-label">* Department:</label>
                        <select
                            class="form-select form-select-sm rounded-0"
                            v-model="form.office_name"
                            required>
                            <option value="" selected disabled>--Select Department--</option>
                            <option
                                v-for="department in departments"
                                :key="department"
                                :value="department.office_name">
                                {{ department.office_name }}
                            </option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label class="form-label">* Position:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.position"
                            placeholder="ex. Accounting and Tax Collector"
                            required>
                    </div>

                </div>

                <div class="row mb-3">

                    <div class="col-md-8">
                        <div class="form-group mb-3">
                            <label class="form-label">* Office Address:</label>
                        <select
                            class="form-select form-select-sm rounded-0"
                            v-model="form.office_address"
                            required>
                            <option value="" selected disabled>--Select Department--</option>
                            <option v-for="(department, index) in departments" :key="index" :value="department.office_name">
                                        {{ department.office_address }}
                                    </option>
                        </select>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-group mb-3">
                            <label class="form-label">* Mobile Number:</label>
                            <input
                                type="text"
                                class="form-control form-control-sm rounded-0"
                                maxlength="11"
                                v-model="form.mobile_number"
                                placeholder="ex. 09XXXXXXXXX"
                                required>
                        </div>
                    </div>

                </div>

                <hr>

                <h5 class="page-title">EQUIPMENT INFO</h5>

                <div class="fom-group mb-3">

                    <label class="form-label">* Property Number:</label>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        v-model="form.property_number"
                        placeholder="ex. AB123456789"
                        required>

                </div>

                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group mb-3">
                            <label class="form-label">* Equipment Type:</label>
                            <input
                                type="text"
                                class="form-control form-control-sm rounded-0"
                                v-model="form.type"
                                placeholder="ex. Laptop"
                                required>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group mb-3">
                            <label class="form-label">* Status:</label>
                            <select
                                class="form-select form-select-sm"
                                v-model="form.status"
                                required>
                                <option value="0" selected disabled>--Select Status--</option>
                                <option value="1" >Pending</option>
                                <option value="2" >Approved</option>
                                <option value="3" >Returned</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">

                    <div class="col-md-6">
                        <label class="form-label">* Brand:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.brand"
                            placeholder="ex. SAMSUNG"
                            required>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">* Model:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.model"
                            placeholder="ex. SAMSUNG A12"
                            required>
                    </div>

                </div>

                <hr>

                <h5 class="page-title">BORROW INFO</h5>

                <div class="row mb-3">

                    <div class="col-md-6">
                        <label class="form-label">* Date Borrow:</label>
                        <input
                            type="date"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.date_borrow">
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">* Date Return:</label>
                        <input
                            type="date"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.date_return">
                    </div>

                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Purpose to borrow:</label>
                    <textarea
                        class="form-control form-control-sm rounded-0"
                        rows="5"
                        placeholder="Type your reason here..."
                        v-model="form.purpose"></textarea>
                </div>

                <div class="text-end">
                    <router-link :to="'/management/borrow'" class="btn btn-secondary btn-sm rounded-0 me-3">Cancel</router-link>
                    <button type="submit"  class="btn button-color btn-sm rounded-0">Submit</button>
                </div>

            </form>

        </div>

    </div>

</template>

<script>
import apiClient from "@/services"
export default
{
    data()
    {
        return{
            form:
            {
                // ACCOUNT INFO
                full_name: "",
                id_number: "",
                office_name: "",
                office_address: "",
                position: "",
                mobile_number: "",

                // EQUIPMENT INFO
                type: "",
                brand: "",
                model: "",
                property_number: "",

                // OTHER INFO
                date_borrow: this.getCurrentDate(),
                date_return: "",
                purpose: "",
                status: "1",
            },
            departments: [],
        }
    },

    mounted()
    {
        this.fetchDepartment();
    },

    methods:
    {
        getCurrentDate()
        {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },

        async submit()
        {
            try
            {
                const response = await apiClient.post('/borrow', this.form)
                console.log("Borrow created successfully:", response.data);
                alert("Added borrow successfully");
                this.$router.push("/management/borrow");
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        },

        async fetchDepartment()
        {
            try
            {
                const response = await apiClient.get("/department");
                this.departments = response.data;
                console.log("Department fetched successfully:", response.data);
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        },
    }
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