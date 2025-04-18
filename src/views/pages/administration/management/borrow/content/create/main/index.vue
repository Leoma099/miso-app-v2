<template>

    <div class="col-md-8 mx-auto">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <form @submit.prevent="submit()">

                <h5 class="page-title">ACCOUNT INFO</h5>

                <div class="row mb-3">
                    
                    <div class="col-md-4">
                        <label for="" class="form-label">* ID Number:</label>
                        <div class="d-flex">
                            <input
                                v-for="(digit, index) in idDigits"
                                :key="index"
                                type="tel"
                                maxlength="1"
                                pattern="\d*"
                                class="form-control form-control-sm rounded-0 text-center"
                                v-model="idDigits[index]"
                                @input="onDigitInput(index, $event)"
                                @keydown.backspace="onBackspace(index, $event)"
                                required
                            />
                        </div>
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

                    <label class="form-label">* Equipment Type:</label>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        v-model="form.type"
                        placeholder="ex. Laptop"
                        required>

                </div>

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
                                    class="form-control form-control-sm rounded-0 text-center"
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
                    <div class="col-md-3">
                        <div class="form-group mb-3">
                            <label class="form-label">* Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                class="form-control form-control-sm rounded-0"
                                v-model="form.quantity">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group mb-3">
                            <label class="form-label">* Status:</label>
                            <input
                                type="text"
                                :value="formatStatus(form.status)"
                                class="form-control form-control-sm rounded-0"
                                disabled>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">

                    <div class="col-md-6">
                        <label class="form-label">* Brand:</label>
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
                quantity: 1,

                // OTHER INFO
                date_borrow: this.getCurrentDate(),
                date_return: "",
                purpose: "",
                status: "1",
            },
            departments: [],
            idDigits: Array(13).fill(""),
            propertyDigits: Array(7).fill(""),
            brands: [],
        }
    },

    mounted()
    {
        this.fetchDepartment();
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

        async submit()
        {
            try
            {
                const response = await apiClient.post('/borrowWalkin', this.form)
                console.log("Borrow created successfully:", response.data);
                alert("Added borrow successfully");
                this.$router.push("/management/borrow");
            }
            catch(error)
            {
                alert("Added borrow successfully", error);
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

        formatStatus(status)
        {
            console.log("Item status:", status); // Debugging
            const numStatus = parseInt(status, 10);
            if (numStatus === 1)
            {
                return "Pending";
            }
            else if (numStatus === 2) {
                return "Approved";
            }
            else if (numStatus === 3) {
                return "Returned";
            }
            else {
                return "n/a";
            }
        },

        onDigitInput(index, event)
        {
            const value = event.target.value.replace(/\D/g, "");
            this.idDigits[index] = value; // FIXED: removed this.$set

            if (value && index < 12)
            {
                this.$nextTick(() =>
                {
                    event.target.nextElementSibling?.focus();
                });
            }

            this.form.id_number = this.idDigits.join('');
        },

        onBackspace(index, event)
        {
            if (event.key === "Backspace" && !this.idDigits[index] && index > 0)
            {
                this.$nextTick(() =>
                {
                    event.target.previousElementSibling?.focus();
                });
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