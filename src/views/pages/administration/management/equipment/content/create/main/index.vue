<template>

    <div class="col-4 mx-auto">

        <form @submit.prevent="submit()" class="mt-4">

            <div class="card card-body shadow-sm border-0 rounded-0">

                <div class="row">

                    <div class="col-md-8">
                        <div class="form-group mb-3">
                            <label for="" class="form-label">* Type:</label>
                            <input
                                type="text"
                                class="form-control rounded-0"
                                placeholder="ex. Laptop"
                                v-model="form.type"
                                required>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-group mb-3">
                            <label for="" class="form-label">* Photo:</label>
                            <input
                                type="file"
                                class="form-control rounded-0"
                                placeholder="ex. PROJECTOR"
                                @change="handleFilePhoto"
                                required>
                        </div>
                    </div>

                </div>

                <div class="row">

                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label for="" class="form-label">* Status:</label>
                            <input
                                type="type"
                                class="form-control rounded-0"
                                placeholder="Depleted Battery"
                                v-model="form.equipmentStatus"
                                required>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label for="" class="form-label">* Serial Number:</label>
                            <input
                                type="text"
                                class="form-control rounded-0"
                                placeholder="ex. MYL12345678"
                                v-model="form.serial_number"
                                required>
                        </div>
                    </div>

                </div>

                <div class="row">

                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label for="" class="form-label">Brand:</label>
                            <input
                                type="text"
                                class="form-control rounded-0"
                                placeholder="ex. HP"
                                v-model="form.brand"
                                required>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label for="" class="form-label">Model:</label>
                            <input
                                type="text"
                                class="form-control rounded-0"
                                placeholder="ex. Pavillion p2 Series"
                                v-model="form.model"
                                required>
                        </div>
                    </div>

                </div>

                <div class="form-group mb-3">
                    <label for="" class="form-label">* Property Number:</label>
                    <input
                        type="text"
                        class="form-control rounded-0"
                        placeholder="ex. QP812AA#ABA" 
                        v-model="form.property_number"
                        required>
                </div>

                <div class="text-end">
                    <router-link :to="'/management/equipment'"
                        class="btn rounded-0 btn-secondary me-3">Cancel</router-link>
                    <button type="submit" class="btn rounded-0 button-color">Submit</button>
                </div>
            </div>
        </form>

    </div>

</template>

<script>
import apiClient from "@/services/index";
export default
{
    name: 'Create Account',
    
    data() {
        return {
            form:
            {
                type: "",
                brand: "",
                model: "",
                equipmentStatus: "",
                photo: null,
                property_number: "",
                serial_number: "",

            }
        }
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
                let formData = new FormData();

                if (this.form.photo)
                {
                    formData.append("photo", this.form.photo);
                }

                formData.append("type", this.form.type);
                formData.append("brand", this.form.brand);
                formData.append("model", this.form.model);
                formData.append("equipmentStatus", this.form.equipmentStatus);
                formData.append("property_number", this.form.property_number);
                formData.append("serial_number", this.form.serial_number);

                const response = await apiClient.post("/equipment", formData, {
                    headers: { "Content-Type": "multipart/form-data" } // ✅ Important for file upload
                });
                this.$router.push("/management/equipment");
                alert("New Equipment has been added to database.");
                console.log("Equipment created successfully", response.data);
            }
            catch(error)
            {
                console.error("Error occured:", error)
            }
        },

        handleFilePhoto(event)
        {
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