<template>

    <div class="col-5 mx-auto">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <h3>Fill-out the form appropriately.</h3>

            <form @submit.prevent="submit()">

                <h5 class="page-title">ACCOUNT INFO</h5>

                <div class="row mb-3">
                    
                    <div class="col-md-4">
                        <label class="form-label">* Id Number:</label>
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
                            <label class="form-label">* Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                class="form-control form-control-sm rounded-0"
                                v-model="form.quantity">
                        </div>
                    </div>

                </div>

                <div class="row mb-3">

                    <div class="col-md-4">
                        <label class="form-label">* Brand:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.brand"
                            disabled>
                    </div>

                    <div class="col-md-4">
                        <label class="form-label">* Model:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.model"
                            disabled>
                    </div>

                    <div class="col-md-4">
                        <label class="form-label">* Property Number:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="form.property_number"
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
                    <router-link :to="'/client/equipment'" class="btn btn-secondary btn-sm rounded-0 me-3">Cancel</router-link>
                    <button type="submit"  class="btn button-color btn-sm rounded-0">Submit</button>
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
                equipment_id: this.$route.query.id, // Get from URL
                property_number: "",

                // OTHER INFO
                date_borrow: this.getCurrentDate(),
                date_return: "",
                purpose: "",
                quantity: 1,
            },
        };
    },

    mounted()
    {
        console.log("Equipment ID:", this.form.equipment_id); // Debugging
        this.fetchEquipmentData();
        this.fetchUserDetails();
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

        fetchUserDetails()
        {
            this.form.full_name = localStorage.getItem("full_name") || "";
            this.form.id_number = localStorage.getItem("id_number") || "";
            this.form.office_name = localStorage.getItem("office_name") || "";
            this.form.office_address = localStorage.getItem("office_address") || "";
            this.form.position = localStorage.getItem("position") || "";
            this.form.mobile_number = localStorage.getItem("mobile_number") || "";
        },

        async fetchEquipmentData()
        {
            try
            {
                const response = await apiClient.get(`/equipment/${this.form.equipment_id}`);
                const equipment = response.data;

                this.form.type = equipment.type;
                this.form.brand = equipment.brand;
                this.form.model = equipment.model;
                this.form.property_number = equipment.property_number;
            }
            catch (error)
            {
                console.error("Failed to fetch equipment data:", error.response?.data || error.message);
            }
        },

        async submit()
        {
            if (!this.form.purpose || !this.form.date_borrow || !this.form.date_return)
            {
                alert("Please complete the borrow info fields.");
                return;
            }

            if (this.form.quantity <= 0)
            {
                alert("Quantity must be greater than 0.");
                return;
            }

            try
            {
                const response = await apiClient.post("/borrow", this.form);
                console.log(response.data);
                alert("Request borrow submitted. Please wait for the approval. Thank you!");
                this.$router.push("/client/borrow");
            }
            catch (error)
            {
                console.error("Error submitting borrow request:", error.response?.data || error.message);
                alert("Something went wrong: " + (error.response?.data?.message || "Unknown error"));
            }
        }
    }
};
</script>

<style scoped>
.button-color
{
    background-color: #007bff;
    color: #ffffff;
}
.button-color:hover
{
    background-color: #3798ff;
    color: #ffffff;
}
.page-title
{
    color: #007bff;
}
</style>