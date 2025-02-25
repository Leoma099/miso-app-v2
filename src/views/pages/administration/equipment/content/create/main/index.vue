<template>

    <div class="col-4 mx-auto">

        <form @submit.prevent="submit()" class="mt-4">
            <div class="card card-body shadow-sm border-0 rounded-0">

                <div class="form-group mb-3">
                    <label for="" class="form-label">Equipment Type:</label>
                    <input type="text" class="form-control rounded-0" placeholder="ex. PROJECTOR"
                        v-model="form.equipment_type">
                </div>

                <div class="form-group mb-3">
                    <label for="" class="form-label">Brand:</label>
                    <input type="text" class="form-control rounded-0" placeholder="ex. EPSON" v-model="form.brand">
                </div>

                <div class="form-group mb-3">
                    <label for="" class="form-label">Model:</label>
                    <input type="text" class="form-control rounded-0" placeholder="ex. EPSON1235" v-model="form.model">
                </div>

                <div class="form-group mb-3">
                    <label for="" class="form-label">Condition:</label>
                    <select class="form-select rounded-0" v-model="form.condition">
                        <option value="1">Good</option>
                        <option value="2">Damage</option>
                        <option value="2">Lost</option>
                    </select>
                </div>

                <div class="form-group mb-3">
                    <label for="" class="form-label">Availability:</label>
                    <select class="form-select rounded-0" v-model="form.availability">
                        <option value="1">Available</option>
                        <option value="2">Not Available</option>
                    </select>
                </div>

                <div class="form-group mb-3">
                    <label for="" class="form-label">Status:</label>
                    <select class="form-select rounded-0" v-model="form.status">
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                    </select>
                </div>

                <div class="form-group mb-3">
                    <label for="" class="form-label">Registered Date:</label>
                    <input type="date" class="form-control rounded-0" placeholder="ex. Juan Dela Cruz"
                        v-model="form.registered_date">
                </div>

                <div class="text-end">
                    <router-link :to="'/administration/equipment'"
                        class="btn rounded-0 button-color me-3">Cancel</router-link>
                    <button type="submit" class="btn rounded-0 button-color">Submit</button>
                </div>
            </div>
        </form>

    </div>

</template>

<script>
import axios from "axios";
export default
    {
        data() {
            return {
                form:
                {
                    equipment_type: "",
                    brand: "",
                    model: "",
                    condition: "1",
                    availability: "1",
                    status: "1",
                    registered_date: this.getCurrentDate(),

                }
            }
        },

        methods:
        {
            getCurrentDate() {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, "0");
                const day = String(today.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            },

            async submit() {
                axios.post('http://127.0.0.1:8000/api/equipment', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.$router.push('/administration/equipment');
                    })
                    .catch(error => {
                        console.error("Error:", error.response?.data || error.message);
                    });
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