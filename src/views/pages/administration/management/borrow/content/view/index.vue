<template>

    <h1 class="page-title mb-0">View Borrow Equipment</h1>
    <router-link
        :to="'/management/borrow'">
        Back to page
    </router-link>

    <div class="col-5 mx-auto">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <form @submit.prevent="submit()">

                <h5 class="page-title">ACCOUNT INFO</h5>

                <div class="row mb-3">
                    
                    <div class="col-md-4">
                        <label class="form-label"><strong>* Id Number:</strong></label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.id_number"
                            disabled>
                    </div>

                    <div class="col-md-8">
                        <label class="form-label">* Full Name:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.full_name"
                            disabled>
                    </div>

                </div>

                <div class="row mb-3">

                    <div class="col-md-8">
                        <label class="form-label">* Office Name:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.office_name"
                            disabled>
                    </div>
                    
                    <div class="col-md-4">
                        <label class="form-label">* Position:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.position"
                            disabled>
                    </div>

                </div>

                <div class="row mb-3">

                    <div class="col-md-8">
                        <div class="form-group mb-3">
                            <label class="form-label">* Office Address:</label>
                            <input
                                type="text"
                                class="form-control form-control-sm rounded-0"
                                v-model="form.office_address"
                                disabled>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-group mb-3">
                            <label class="form-label">* Mobile Number:</label>
                            <input
                                type="text"
                                class="form-control form-control-sm rounded-0"
                                v-model="form.mobile_number"
                                disabled>
                        </div>
                    </div>

                </div>

                <hr>

                <h5 class="page-title">EQUIPMENT INFO</h5>

                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group mb-3">
                            <label class="form-label">* Equipment Type:</label>
                            <input
                                type="text"
                                class="form-control form-control-sm rounded-0"
                                v-model="form.type"
                                disabled>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group mb-3">
                            <label class="form-label">* Status:</label>
                            <select
                                class="form-control form-control-sm rounded-0"
                                v-model="form.status"
                                disabled>
                                <option value="1">Pending</option>
                                <option value="2">Approved</option>
                                <option value="3">Returned</option>
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
                            disabled>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">* Model:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.model"
                            disabled>
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
                            v-model="form.date_borrow"
                            disabled>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">* Date Return:</label>
                        <input
                            type="date"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.date_return"
                            disabled>
                    </div>

                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Purpose to borrow:</label>
                    <textarea
                        class="form-control form-control-sm rounded-0"
                        rows="5"
                        placeholder="Type your reason here..."
                        v-model="form.purpose"
                        disabled></textarea>
                </div>

                <div class="text-end">
                    <router-link
                        :to="'/management/borrow'"
                        class="btn btn-sm button-color rounded-0">
                        Back to page
                    </router-link>
                </div>

            </form>

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

                // OTHER INFO
                date_borrow: this.getCurrentDate(),
                date_return: "",
                purpose: "",
                status: "1",
            },
        }
    },

    mounted()
    {
        console.log("Route ID:", this.$route.params.id);
        this.fetchBorrowData();
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

        async fetchBorrowData()
        {
            try
            {
                const borrowResponse = await apiClient.get(`/borrow/${this.$route.params.id}`);
                this.form = borrowResponse.data;
                console.log("Fetched borrow:", borrowResponse.data);
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        },

        async submit()
        {
            try
            {
                const response = apiClient.put(`/borrow/${this.$route.params.id}`, this.form)
                console.log("Borrow update successfully:", response.data);
                this.$router.push("/administration/borrow");
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        }
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
.page-title {
    color: #007bff;
}
</style>