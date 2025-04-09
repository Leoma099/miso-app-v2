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
                        maxlength="11"
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
                    <router-link
                        :to="'/administration/delivery'"
                        type="button"
                        class="btn btn-sm btn-secondary rounded-0 me-3">
                        Cancel
                    </router-link>
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
                address: "",
                mobile_number: "",
                date_of_birth: "",
            }
        }
    },

    mounted()
    {
        
        this.fetchDeliver();
    },

    methods:
    {
        async submit()
        {
            try
            {
                let formData = new FormData();

                formData.append("full_name", this.form.full_name);
                formData.append("email", this.form.email);
                formData.append("address", this.form.address);
                formData.append("mobile_number", this.form.mobile_number);
                formData.append("date_of_birth", this.form.date_of_birth);

                const response = await apiClient.put(`/deliver-rider/${this.$route.params.id}`, formData);
                console.log("Delivery fetch successfully:", response.data);
                alert("New delivery has been added successfully");
                this.$router.push("/administration/delivery");
            }
            catch(error)
            {
                alert("New delivery has been added unsuccessfully");
                console.error("Error occured:", error);
            }
        },

        async fetchDeliver()
        {
            try
            {
                const response = await apiClient.get(`/deliver-rider/${this.$route.params.id}`);
                    this.form = response.data;
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