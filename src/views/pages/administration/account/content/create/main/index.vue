<template>
    <form @submit.prevent="submit()" class="mt-4">
        <div class="card card-body shadow-sm border-0 rounded-0 col-6 mx-auto">
            <h4 class="mb-3">Fill out the field approximately.</h4>
            <h3 class="mb-3 text-title">ACCOUNT DETAILS</h3>

            <div class="row">

                <div class="col-md-4">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* ID Number:</label>
                        <input type="text" class="form-control rounded-0" placeholder="ex.1234567" v-model="form.id_number" maxlength="9" required>
                    </div>
                </div>

                <div class="col-md-8">
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
                        <input type="text" class="form-control rounded-0" placeholder="ex. Shooting Guard" v-model="form.position" required>
                    </div>
                </div>

            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">* Department Address / Office Address:</label>
                <select class="form-select rounded-0" v-model="form.office_address" required>
                    <option value="" disabled selected>--Select Department--</option>
                    <option v-for="(department, index) in departments" :key="index" :value="department.office_address">
                        {{ department.office_address }}
                    </option>
                </select>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">* Address:</label>
                <input type="text" class="form-control rounded-0" placeholder="ex. SBMA" v-model="form.address" required>
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
                        <input type="text" class="form-control rounded-0" v-model="form.password" readonly>
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
                <router-link :to="'/administration/account'" class="btn rounded-0 button-color me-3">Cancel</router-link>
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
            }
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
                this.$router.push('/administration/account');
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
