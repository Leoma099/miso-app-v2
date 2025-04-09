<template>

    <form @submit.prevent="submit()" class="mt-4">

        <div class="card card-body shadow-sm border-0 rounded-0 col-6 mx-auto">

            <div class="row">

                <div class="col-md-4">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* ID Number:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            placeholder="ex. 123456789"
                            v-model="form.id_number">
                    </div>
                </div>

                <div class="col-md-8">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Full Name:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            placeholder="ex. Juan Dela Cruz"
                            v-model="form.full_name">
                    </div>
                </div>

            </div>

            <div class="row">

                <div class="col-md-7">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Department / Office Name:</label>
                        <select
                            v-model="form.office_name"
                            class="form-select form-select-sm roundeo-0">
                            <option
                                value=""
                                disabled selected>-- Select Department --
                            </option>
                            <option
                                :value="department.office_name"
                                v-for="(department, index) in departments"
                                :key="index">
                                {{ department.office_name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-md-5">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Postion:</label>
                        <input
                            v-model="form.position"
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            placeholder="ex. HR Manager">
                    </div>
                </div>

            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">* Office Address:</label>
                <select
                    v-model="form.office_address"
                    class="form-select form-select-sm rounded-0">
                    <option
                        value=""
                        disabled
                        selected>-- Select Department Address --
                    </option>
                    <option
                        :value="department.office_address"
                        v-for="(department, index) in departments"
                        :key="index">
                        {{ department.office_address }}
                    </option>
                </select>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">* Your Address:</label>
                <input
                    v-model="form.address"
                    type="text"
                    class="form-control form-control-sm rounded-0"
                    placeholder="ex. #123 Apartment Stree">
            </div>

            <div class="row">

                <div class="col-md-7">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Email:</label>
                        <input
                            v-model="form.email"
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            placeholder="ex. example123@gmail.com">
                    </div>
                </div>

                <div class="col-md-5">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* Mobile Number:</label>
                        <input
                            v-model="form.mobile_number"
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            placeholder="ex. +123456789">
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
import apiClient from '@/services';

export default
{
    name: "Edit User Account",

    data()
    {
        return{
            form:
            {
                id_number: "",
                full_name: "",
                office_name: "",
                position: "",
                office_address: "",
                address: "",
                email: "",
                mobile_number: "",
                username: "",
                password: "",
                role: "",
            },
            departments: [],
        }
    },

    mounted()
    {
        this.fetchAccountData();
        this.fetchDepartmentData();
    },

    methods:
    {
        async fetchAccountData()
        {
            try
            {
                const response = await apiClient.get(`/account/${this.$route.params.id}`);
                this.form = response.data;
                console.log("Fetch account:", response.data);
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        },

        async fetchDepartmentData()
        {
            try
            {
                const response = await apiClient.get(`/department`)
                this.departments = response.data;
                console.log("Fetched department:", response.data);
            }
            catch(error)
            {
                console.error(error);
            }
        },

        async submit()
        {
            try
            {
                const response = await apiClient.put(`/account/${this.$route.params.id}`, this.form);
                console.log("Account update successfully:", response.data);
                this.$router.push("/management/account");
                alert("Account update successfully");
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
.page-title {
    color: #007bff;
}
.button-color {
    background-color: #007bff;
    color: #ffffff;
}
.button-color:hover {
    background-color: #3798ff;
    color: #ffffff;
}
.text-title {
    color: #007bff;
}
</style>