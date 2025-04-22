<template>

    <div class="col-5 mx-auto">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <form @submit.prevent="submit()">

                <div class="form-group mb-3">
                    <label class="form-label">* Full Name:</label>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        v-model="form.full_name">
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Equipment Type:</label>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        v-model="form.type">
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Office Name:</label>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        v-model="form.office_name">

                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Date Released:</label>
                    <input
                        type="date"
                        class="form-control form-control-sm rounded-0"
                        v-model="form.date">
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Released by:</label>
                    <select
                        class="form-select form-select-sm rounded-0"
                        v-model="form.agent">
                        <option value="" selected disabled>--Select Agent--</option>
                        <option
                            v-for="deliver in delivers"
                            :key="deliver"
                            :value="deliver.agent">
                            {{ deliver.agent }}s
                        </option>
                    </select>
                </div>

                <div class="text-end">
                    <router-link :to="'/administration/equipment-release'" class="btn btn-secondary btn-sm rounded-0 me-3">Cancel</router-link>
                    <button type="submit"  class="btn button-color btn-sm rounded-0">Submit</button>
                </div>

            </form>

        </div>

    </div>

</template>
<script>
import apiClient from "@/services/index";
export default
{
    data()
    {
        return{
            form:
            {
                type: "",
                agent: "",
                office_name: "",
                date: "",
                full_name: "",
            },
            departments: [],
            delivers: [],
        }
    },

    mounted()
    {
        console.log("Route ID:", this.$route.params.id);
        this.fetchBorrowData();
        this.fetchDeliver();
    },

    methods:
    {

        async fetchBorrowData()
        {
            try
            {
                const borrowResponse = await apiClient.get(`/borrow/${this.$route.params.id}`);
                this.form = borrowResponse.data;
                console.log("Fetched borrow:", borrowResponse.data);
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        },

        async fetchDeliver()
        {
            try
            {
                const response = await apiClient.get('/deliver-rider');
                this.delivers = response.data;
                console.log("Fetched deliver rider:", response.data);
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        },

        async submit()
        {
            try
            {
                const response = apiClient.put(`/borrow/${this.$route.params.id}`, this.form)
                console.log("Borrow update successfully:", response.data);
                this.$router.push("/administration/equipment-release");
                alert("Equipment release update successfully");
            }
            catch(error)
            {
                console.error("Error occured:", error);
                alert("Equipment release update unsuccessfully");
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