<template>

    <div class="col-md-5 mx-auto">

        <form @submit.prevent="submit()" class="mt-4">

            <div class="card card-body shadow-sm border-0 rounded-0">

                <div class="row">

                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label for="" class="form-label">* Property Number:</label>
                            <div class="d-flex">
                                <template v-for="(digit, index) in 8">
                                <input
                                    v-if="index !== 3"
                                    :key="'input-' + index"
                                    type="tel"
                                    maxlength="1"
                                    pattern="\d*"
                                    class="form-control rounded-0 text-center"
                                    v-model="propertyDigits[index > 3 ? index - 1 : index]"
                                    @input="onPropertyDigitInput(index, $event)"
                                    @keydown.backspace="onPropertyBackspace(index, $event)"
                                    required
                                />
                                <span v-else :key="'dash-' + index" class="px-2">-</span>
                                </template>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group mb-3">
                            <label for="" class="form-label">* Photo:</label>
                            <input
                                type="file"
                                class="form-control rounded-0"
                                placeholder="ex. PROJECTOR"
                                @change="handleFilePhoto">
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
                            <select
                                class="form-select rounded-0"
                                v-model="form.brand">
                                <option value="" selected disabled>--Select Brand--</option>
                                <option
                                    v-for="(brand, index) in brands"
                                    :key="index"
                                    :value="brand.brand">
                                    {{ brand.brand }}
                                </option>
                            </select>
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
                            <label for="" class="form-label">* Quantity:</label>
                            <input
                                type="text"
                                class="form-control rounded-0"
                                v-model="form.quantity"
                                required>
                        </div>
                    </div>

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
            brands: [],
            propertyDigits: Array(7).fill(""),
            form:
            {
                type: "",
                brand: "",
                model: "",
                quantity: 0,
                equipmentStatus: "",
                photo: "",
                property_number: "",
                serial_number: "",

            }
        }
    },

    mounted()
    {
        this.fetchBrand();
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
                formData.append("quantity", quantity);

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
        },

        async fetchBrand()
        {
            try
            {
                const response = await apiClient.get('/brand');
                this.brands = response.data;
                console.log("Brand fetched successfully:", response.data);
            }
            catch(error)
            {
                console.error("Error occurred:", error);
            }
        },

        onPropertyDigitInput(index, event)
        {
            const actualIndex = index > 3 ? index - 1 : index;
            const value = event.target.value.replace(/\D/g, "");
            this.propertyDigits[actualIndex] = value;

            if (value && index < 7) {
                this.$nextTick(() => {
                const nextInput = event.target.parentElement.querySelectorAll("input")[index + 1 - (index >= 3 ? 1 : 0)];
                nextInput?.focus();
                });
            }

            this.form.property_number = this.propertyDigits.slice(0, 3).join("") + "-" + this.propertyDigits.slice(3).join("");
        },

        onPropertyBackspace(index, event)
        {
            const actualIndex = index > 3 ? index - 1 : index;
            if (event.key === "Backspace" && !this.propertyDigits[actualIndex] && actualIndex > 0) {
                this.$nextTick(() => {
                const inputs = event.target.parentElement.querySelectorAll("input");
                const prevInput = inputs[index - 1 - (index > 4 ? 1 : 0)];
                prevInput?.focus();
                });
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
</style>