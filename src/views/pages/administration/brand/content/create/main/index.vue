<template>
  
    <div class="col-md-4 mx-auto">

        <div class="card card-body shadow-sm rounded-0 border-0">

            <form @submit.prevent="submit()">

                <div class="form-group mb-3">
                    <label class="form-label">* Brand:</label>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        placeholder="ex. HP"
                        v-model="form.brand"
                        required>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Description:</label>
                    <textarea
                        rows="5"
                        class="form-control form-control-sm rounded-0"
                        placeholder="ex. HP Description"
                        v-model="form.description">
                    </textarea>
                </div>

                <div class="text-end">
                    <router-link
                        :to="'/administration/brand'"
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
                brand: "",
                description: "",

            }
        }
    },

    methods:
    {
        async submit()
        {
            try
            {
                const response = await apiClient.post("/brand", this.form);
                console.log("Delivery fetch successfully:", response.data);
                alert("New delivery has been added successfully");
                this.$router.push("/administration/brand");
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