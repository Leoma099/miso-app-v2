<template>
  
    <div class="col-md-4 mx-auto">

        <div class="card card-body shadow-sm rounded-0 border-0">

            <form @submit.prevent="submit()">

                <div class="form-group mb-3">
                    <label class="form-label">* Full Name:</label>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        placeholder="ex. Juan Dela Cruz"
                        v-model="form.agent"
                        required>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Email Address:</label>
                    <input
                        type="email"
                        class="form-control form-control-sm rounded-0"
                        placeholder="ex. juandelacruz@gmail.com"
                        v-model="form.email"
                        required>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Address:</label>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        placeholder="ex. SBMA"
                        v-model="form.address"
                        required>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Mobile Number:</label>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        placeholder="ex. 09XXXXXXXXX"
                        v-model="form.mobile_number"
                        maxlength="11"
                        required>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Date of Birth:</label>
                    <input
                        type="date"
                        class="form-control form-control-sm rounded-0"
                        v-model="form.date_of_birth"
                        required>
                </div>

                <div class="text-end">
                    <button
                        type="submit"
                        class="btn btn-sm button-color rounded-0">
                        Submit
                    </button>
                </div>

            </form>

        </div>

    </div>

</template>

<script>
import apiClient from '@/services';
export default
{
    data()
    {
        return{
            form:
            {
                agent: "",
                email: "",
                mobile_number: "",
                date_of_birth: "",
                address: "",
            }
        }
    },

    methods:
    {
        async submit()
        {
            try
            {
                const response = await apiClient.post("/deliver-rider", this.form);
                console.log("Delivery fetch successfully:", response.data);
                alert("New delivery has been added successfully");
                this.$router.push("/administration/delivery");
            }
            catch(error)
            {
                alert("New delivery has been added unsuccessfully");
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