<template>

    <form @submit.prevent="submit()" class="mt-4">
        <div class="card card-body shadow-sm border-0 rounded-0">

            <div class="form-group mb-3">
                <label for="" class="form-label">Borrower Name:</label>
                <input type="text" class="form-control rounded-0" placeholder="ex. PROJECTOR" v-model="form.full_name">
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">Department:</label>
                <select class="form-select rounded-0" v-model="form.department">
                    <option disabled selected>-select department-</option>
                </select>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">Equipment Type:</label>
                <select class="form-select rounded-0" v-model="form.equipment_type">
                    <option disabled selected>-select equipment type-</option>
                </select>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">Brand:</label>
                <select class="form-select rounded-0" v-model="form.brand">
                    <option disabled selected>-select equipment type-</option>
                </select>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">Model:</label>
                <select class="form-select rounded-0" v-model="form.model">
                    <option disabled selected>-select model-</option>
                </select>
            </div>

            <div class="text-end">
                <router-link :to="'/management/borrow'" class="btn rounded-0 button-color me-3">Cancel</router-link>
                <button type="submit" class="btn rounded-0 button-color">Submit</button>
            </div>
        </div>
    </form>

</template>

<script>
import axios from "axios";
export default
{
    data()
    {
        return{
            form:
            {
                // NON EXIST USER
                borrower_name: "",
                department: "",
                position: "",
                contact_no: "",

                // EQUIPMENT ITEM
                equipment_type: "",
                brand: "",
                model: "",

                registered_date: this.getCurrentDate(),

            }
        }
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

        async submit()
        {
            axios.post('http://127.0.0.1:8000/api/borrow', this.form)
            .then(response => {
                console.log(response.data);
                this.$router.push('/administration/borrow');
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