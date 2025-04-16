<template>
    <form @submit.prevent="submit()">
        <div>
            <h1 class="page-title mb-3">BORROWED FORM</h1>

            <div class="row">

                <div class="col-md-4">

                    <div class="card card-body border-0 shadow-sm rounded-0">

                        <p class="mb-3"><strong>EQUIPMENT INFO</strong></p>

                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <label class="form-label mb-0">EQUIPMENT TYPE:</label>
                            <input type="text" class="form-control form-control-sm input-field border-0" v-model="form.type" disabled>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <label class="form-label mb-0">BRAND:</label>
                            <input type="text" class="form-control form-control-sm input-field border-0" v-model="form.brand" disabled>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <label class="form-label mb-0">MODEL:</label>
                            <input type="text" class="form-control form-control-sm input-field border-0" v-model="form.model" disabled>
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
                                    <input type="text" class="form-control form-control-sm input-field rounded-0" v-model="form.full_name" disabled />
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="form-label mb-0">EMAIL:</label>
                                    <input type="text" class="form-control form-control-sm input-field rounded-0" v-model="form.email" disabled>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="form-label mb-0">MOBILE NUMBER:</label>
                                    <input type="text" class="form-control form-control-sm input-field rounded-0" v-model="form.mobile_number">
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="form-label mb-0">DEPARTMENT:</label>
                                    <input type="text" class="form-control form-control-sm input-field rounded-0" v-model="form.office_name">
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <label class="form-label mb-0">POSITION:</label>
                                    <input type="text" class="form-control form-control-sm input-field rounded-0" v-model="form.position">
                                </div>
                                
                            </div>

                            <div class="col-md-6">

                                <p class="mb-3"><strong>BORROW EQUIPMENT INFO</strong></p>

                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="form-label mb-0">DATE BORROW:</label>
                                    <input type="date" class="form-control form-control-sm input-field rounded-0" v-model="form.date_borrow">
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="form-label mb-0">DATE RETURN:</label>
                                    <input type="date" class="form-control form-control-sm input-field rounded-0" v-model="form.date_return">
                                </div>
                                <div class="d-flex justify-content-between">
                                    <label class="form-label mb-0">DESCRIPTION:</label>
                                    <textarea cols="30" rows="5" class="form-control form-control-sm input-field rounded-0" v-model="form.purpose"></textarea>
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
import apiClient from "@/services/index";

export default {
    data() {
        return {
            form: {
                full_name: "",
                email: "",
                office_name: "",
                office_address: "",
                type: "",
                brand: "",
                model: "",
                position: "",
                mobile_number: "",
                purpose: "",
                date_borrow: this.getCurrentDate(),
                date_return: "",
                status: "pending",
                equipment_id: this.$route.params.id || "", // Get equipment ID from URL
            }
        };
    },

    created() {
        this.getUserInfo();
        if (this.form.equipment_id) {
            this.getEquipmentInfo();
        }
    },

    methods: {
        getCurrentDate() {
            return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        },

        async getUserInfo() {
            try {
                const response = await apiClient.get("/account");
                const user = response.data.data;

                this.form.full_name = user.full_name;
                this.form.email = user.email;
                this.form.office_name = user.office_name;
                this.form.office_address = user.office_address;
                this.form.position = user.position;
                this.form.mobile_number = user.mobile_number;
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        },

        async getEquipmentInfo() {
            try {
                const response = await apiClient.get(`/equipment/${this.form.equipment_id}`);
                const equipment = response.data.data;

                this.form.type = equipment.type;
                this.form.brand = equipment.brand;
                this.form.model = equipment.model;
            } catch (error) {
                console.error("Error fetching equipment data:", error);
            }
        },

        async submit() {
            try {
                const response = await apiClient.post("/borrow", this.form);
                console.log("Borrow request submitted:", response.data);
                
                this.$router.push("/client/borrow");
            } catch (error) {
                console.error("Error submitting borrow request:", error);
            }
        }
    }
};
</script>

<style scoped>
.page-title {
    color: #007bff;
}
.input-field {
    width: 60%;
}
</style>
