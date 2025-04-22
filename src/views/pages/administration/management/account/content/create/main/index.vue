<template>
    <form @submit.prevent="submit()" class="mt-4">
        <div class="card card-body shadow-sm border-0 rounded-0 col-6 mx-auto">
            <h4 class="mb-3">Fill out the field approximately.</h4>
            <h3 class="mb-3 text-title">ACCOUNT DETAILS</h3>

            <div class="row">

                <div class="col-md-6">
                    <div class="form-group mb-3">
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
                </div>

                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Full Name:</label>
                        <input type="text" class="form-control rounded-0" placeholder="ex. Juan Dela Cruz" v-model="form.full_name" required>
                    </div>
                </div>

            </div>

            <div class="row">

                <div class="col-md-7">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Department Name / Office Name:</label>
                        <select class="form-select rounded-0" v-model="form.office_name" required>
                            <option value="" disabled selected>--Select Department--</option>
                            <option v-for="(department, index) in departments" :key="index" :value="department.office_name">
                                {{ department.office_name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-md-5">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Position:</label>
                        <input type="text" class="form-control rounded-0" placeholder="ex. Accounting and Tax Collector" v-model="form.position" required>
                    </div>
                </div>

            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">* Department Address / Office Address:</label>
                <input
                    type="text"
                    class="form-control rounded-0"
                    placeholder="ex. SBMA"
                    v-model="form.office_address"
                    readonly
                    required
                />
            </div>


            <div class="form-group mb-3">
                <label for="" class="form-label">* Address:</label>
                <input type="text" class="form-control rounded-0" placeholder="ex. Olongapo City" v-model="form.address" required>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* E-mail:</label>
                        <input type="text" class="form-control rounded-0" placeholder="ex. juandelacruz@gmail.com" v-model="form.email" required>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">Mobile Number:</label>
                        <input type="text" class="form-control rounded-0" placeholder="ex. 09xxxxxxxx" v-model="form.mobile_number" required>
                    </div>
                </div>
            </div>

            <h3 class="mb-0 text-title">SYSTEM ACCOUNT</h3>

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">Username:</label>
                        <input type="text" class="form-control rounded-0" placeholder="ex. juandelacruz" v-model="form.username" @input="updatePassword" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">Default Password:</label>
                        <input type="text" class="form-control rounded-0" v-model="form.password" placeholder="ex. @juandelacruz" disabled>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">Role:</label>
                        <select class="form-select rounded-0" v-model="form.role" required>
                            <option value="0" disabled selected>- select role -</option>
                            <option value="1">Admin</option>
                            <option value="2">Client</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="text-end">
                <router-link :to="'/management/account'" class="btn rounded-0 button-color me-3">Cancel</router-link>
                <button type="submit" class="btn rounded-0 button-color">Submit</button>
            </div>
        </div>
    </form>
</template>

<script>
import apiClient from "@/services/index";
export default
{
    data()
    {
        return{
            departments: [],
            form: {
                full_name: "",
                email: "",
                mobile_number: "",
                address: "",
                role: "0",
                username: "",
                password: "",
                id_number: "",
                office_address: "",
                office_name: "",
                position: "",
            },
            idDigits: Array(13).fill(""),
        };
    },

    computed:
    {
        defaultPassword()
        {
            return this.form.username ? `@${this.form.username}` : '';
        }
    },

    mounted()
    {
        this.fetchDepartment();
    },

    methods:
    {
        updatePassword()
        {
            this.form.password = this.defaultPassword;
        },

        async submit()
        {
            try
            {
                if (!this.form.office_name)
                {
                    throw new Error("Office Name field is required.");
                }
                const response = await apiClient.post('/account', this.form);
                console.log(response.data);
                this.$router.push('/management/account');
            }
            catch (error)
            {
                console.error("Error:", error.response?.data || error.message);
            }
        },

        async fetchDepartment()
        {
            try
            {
                const response = await apiClient.get('/department');
                this.departments = response.data;
                console.log("Department fetched successfully:", response.data);
            }
            catch (error)
            {
                console.error("Error occurred:", error);
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
        }
    },

    watch:
    {
        'form.office_name'(newVal) {
            const selected = this.departments.find(d => d.office_name === newVal);
            this.form.office_address = selected ? selected.office_address : "";
        }
    }
}
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
.text-title
{
    color: #007bff;
}
</style>
