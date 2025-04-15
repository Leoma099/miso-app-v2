<template>
    <div class="col-4 mx-auto">
        <form @submit.prevent="submit()" class="mt-4">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group mb-3">
                            <label class="form-label">* Type:</label>
                            <input type="text" class="form-control rounded-0" v-model="form.type">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group mb-3">
                            <label class="form-label">* Photo:</label>
                            <input type="file" class="form-control rounded-0" @change="handleFilePhoto">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label class="form-label">* Status:</label>
                            <input type="text" class="form-control rounded-0" v-model="form.equipmentStatus">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label class="form-label">* Serial Number:</label>
                            <input type="text" class="form-control rounded-0" v-model="form.serial_number">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label class="form-label">* Brand:</label>
                            <input type="text" class="form-control rounded-0" v-model="form.brand">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label class="form-label">* Model:</label>
                            <input type="text" class="form-control rounded-0" v-model="form.model">
                        </div>
                    </div>
                </div>

                <!-- Property Number (optional / not focused) -->
                <div class="form-group mb-3">
                    <label class="form-label">* Property Number:</label>
                    <input type="text" class="form-control rounded-0" v-model="form.property_number">
                </div>

                <!-- Quantity (important) -->
                <div class="form-group mb-3">
                    <label class="form-label">* Quantity:</label>
                    <input type="text" class="form-control rounded-0" v-model="form.quantity">
                </div>

                <div class="text-end">
                    <router-link :to="'/management/equipment'" class="btn rounded-0 button-color me-3">Cancel</router-link>
                    <button type="submit" class="btn rounded-0 button-color">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import apiClient from "@/services/index";
export default {
    data() {
        return {
            form: {
                type: "",
                brand: "",
                model: "",
                quantity: "",
                equipmentStatus: "",
                photo: null,
                property_number: "",
                serial_number: "",
            }
        }
    },

    mounted() {
        console.log("Route ID:", this.$route.params.id);
        this.fetchEquipmentData();
    },

    methods: {
        async submit() {
            try {
                let formData = new FormData();

                if (this.form.photo) {
                    formData.append("photo", this.form.photo);
                }

                const quantity = parseInt(this.form.quantity);

                if (isNaN(quantity) || quantity <= 0) {
                    alert("Please enter a valid quantity.");
                    return;
                }

                formData.append("type", this.form.type);
                formData.append("brand", this.form.brand);
                formData.append("model", this.form.model);
                formData.append("equipmentStatus", this.form.equipmentStatus);
                formData.append("property_number", this.form.property_number);
                formData.append("serial_number", this.form.serial_number);
                formData.append("quantity", quantity); // quantity as INT

                const response = await apiClient.put(`/equipment/${this.$route.params.id}`, formData);
                this.$router.push("/management/equipment");
                alert("Equipment updated successfully.");
                console.log("Equipment updated successfully", response.data);
            } catch (error) {
                console.error("Error occurred:", error);
            }
        },

        async fetchEquipmentData() {
            try {
                const equipmentResponse = await apiClient.get(`/equipment/${this.$route.params.id}`);
                this.form = equipmentResponse.data;
                console.log("Fetched equipment successfully:", equipmentResponse.data);
            } catch (error) {
                console.error("Error occurred:", error);
            }
        },

        handleFilePhoto(event) {
            this.form.photo = event.target.files[0];
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
</style>
