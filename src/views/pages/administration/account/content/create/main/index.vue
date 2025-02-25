<template>
    <form @submit.prevent="submit()" class="mt-4">
        <div class="card card-body shadow-sm border-0 rounded-0 col-6 mx-auto">
            <h4 class="mb-5">Fill out the field approximately.</h4>
            <h3 class="mb-0 text-title">ACCOUNT DETAILS</h3>

            <div class="form-group mb-3">
                <label for="" class="form-label">* Full Name:</label>
                <input type="text" class="form-control rounded-0" placeholder="ex. Juan Dela Cruz" v-model="form.name">
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">* Address:</label>
                <input type="text" class="form-control rounded-0" placeholder="ex. SBMA" v-model="form.address">
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">* E-mail:</label>
                        <input type="text" class="form-control rounded-0" placeholder="ex. juandelacruz@gmail.com" v-model="form.email">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">Mobile Number:</label>
                        <input type="text" class="form-control rounded-0" placeholder="ex. 09xxxxxxxx" v-model="form.mobile_number">
                    </div>
                </div>
            </div>

            <h3 class="mb-0 text-title">SYSTEM ACCOUNT</h3>

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">Username:</label>
                        <input type="text" class="form-control rounded-0" placeholder="ex. juandelacruz" v-model="form.username" @input="updatePassword">
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
                        <select class="form-select rounded-0" v-model="form.role">
                            <option disabled selected>- select role -</option>
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
import axios from "axios";
export default {
    data() {
        return {
            form: {
                name: "",
                email: "",
                mobile_number: "",
                address: "",
                role: "2",
                username: "",
                password: "", // Ensures the password is part of the form data
            }
        };
    },

    computed: {
        // This will create the default password based on the username
        defaultPassword() {
            return this.form.username ? `@${this.form.username}` : '';
        }
    },

    methods: {
        // Updates the password when username changes
        updatePassword() {
            this.form.password = this.defaultPassword;
        },

        async submit() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/account', this.form);
                console.log(response.data);
                this.$router.push('/administration/account');
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
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
.text-title {
    color: #007bff;
}
</style>
