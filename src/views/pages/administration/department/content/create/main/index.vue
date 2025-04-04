<template>

    <div class="col-4 mx-auto">

        <div class="card card-body shadow-sm rounded-0 border-0">

            <form @submit.prevent="submit()">

                <div class="form-group mb-3">
                    <h4>Department / Office Name:</h4>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        placeholder="Enter department"
                        v-model="form.office_name"
                        required>
                </div>

                <div class="form-group mb-3">
                    <h4>Office Address:</h4>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        placeholder="Enter department address"
                        v-model="form.office_address"
                        required>
                </div>

                <div class="form-group mb-3">
                    <h4>Tell No. (If applicable):</h4>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        placeholder="Enter tell number"
                        v-model="form.tell_number">
                </div>

                <div class="form-group mb-3">
                    <h4>Fax No. (If applicable):</h4>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        placeholder="Enter fax number"
                        v-model="form.fax_number">
                </div>

                <div class="text-end">
                    <button
                        type="submit"
                        class="btn button-color rounded-0">
                        Submit
                    </button>
                </div>

            </form>

        </div>

    </div>

</template>

<script>
import apiClient from "@/services/index"
export default
{
    data()
    {
        return{
            form:
            {
                office_name: "",
                office_address: "",
                tell_number: "",
                fax_number: "",
            }
        }
    },

    methods:
    {
        async submit()
        {
            try
            {
                const response = await apiClient.post("/department", this.form);
                console.log("Department created successfully:", response.data);
                this.$router.push("/administration/department");
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
</style>