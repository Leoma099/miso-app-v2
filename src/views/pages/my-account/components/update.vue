<template>
  
    <div class="modal fade" id="updateProfile" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div class="modal-dialog modal-lg modal-dialog-centered">

            <div class="modal-content rounded-0 border-0">

                <div class="modal-body">

                    <form @submit.prevent="submit()">

                        <div class="d-flex justify-content-between align-items-center">
                            <h3 class="mb-0 text-title">ACCOUNT DETAILS</h3>
                            <div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">* ID Number:</label>
                                    <div class="d-flex">
                                        <input
                                            v-for="(digit, index) in idDigits"
                                            :key="index"
                                            type="tel"
                                            maxlength="1"
                                            pattern="\d*"
                                            class="form-control form-control-sm rounded-0 text-center"
                                            v-model="idDigits[index]"
                                            @input="onDigitInput(index, $event)"
                                            @keydown.backspace="onBackspace(index, $event)"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">* Full Name:</label>
                                    <input type="text" class="form-control rounded-0" placeholder="ex. Juan Dela Cruz" v-model="form.full_name" required>
                                </div>
                            </div>

                        </div>

                        <div class="row">

                            <div class="col-md-7">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">* Department / Office Name:</label>
                                    <input
                                        type="text"
                                        class="form-control rounded-0"
                                        placeholder="ex. SBMA"
                                        v-model="form.office_name"
                                        readonly
                                        required
                                    />
                                </div>
                            </div>

                            <div class="col-md-5">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">* Position:</label>
                                    <input type="text" class="form-control rounded-0" placeholder="ex. Accounting and Tax Collector" v-model="form.position" required>
                                </div>
                            </div>

                        </div>

                        <div class="form-group mb-3">
                            <label for="" class="form-label">* Department Address / Office Address:</label>
                            <input
                                type="text"
                                class="form-control rounded-0"
                                placeholder="ex. SBMA"
                                v-model="form.office_address"
                                readonly
                                required
                            />
                        </div>


                        <div class="form-group mb-3">
                            <label for="" class="form-label">* Address:</label>
                            <input type="text" class="form-control rounded-0" placeholder="ex. Olongapo City" v-model="form.address" required>
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
                                    <input type="text" class="form-control rounded-0" placeholder="ex. 09xxxxxxxx" maxlength="11" v-model="form.mobile_number" required>
                                </div>
                            </div>
                        </div>

                        <hr>

                        <h3 class="mb-0 text-title">SYSTEM ACCOUNT</h3>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">Username:</label>
                                    <input type="text" class="form-control rounded-0" placeholder="ex. juandelacruz" v-model="form.username" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">Password:</label>
                                    <input type="text" class="form-control rounded-0" v-model="form.password" placeholder="your password">
                                </div>
                            </div>
                        </div>

                        <div class="text-end">
                            <button
                                type="button"
                                class="btn btn-secondary me-3 rounded-0"
                                data-bs-dismiss="modal">
                                Close
                            </button>
                            <button
                                type="submit"
                                class="btn button-color rounded-0">
                                Submit
                            </button>
                        </div>

                    </form>

                </div>

            </div>

        </div>

    </div>

</template>

<script>
import apiClient from '@/services/index';

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
            },
            idDigits: Array(13).fill(""),
        };
    },

    created()
    {
        this.fetchUserData();
    },

    methods:
    {
        fetchUserData()
        {
            const user = {
                id_number: localStorage.getItem('id_number'),
                full_name: localStorage.getItem('full_name'),
                mobile_number: localStorage.getItem('mobile_number'),
                office_name: localStorage.getItem('office_name'),
                office_address: localStorage.getItem('office_address'),
                position: localStorage.getItem('position'),
                email: localStorage.getItem('email'),
                address: localStorage.getItem('address'),
                username: localStorage.getItem('username')
            };

            if(user.full_name)
            {
                this.form = { ...this.form, ...user };
                this.idDigits = user.id_number?.split("") || this.idDigits;
            }
        },

        onDigitInput(index, event)
        {
            const value = event.target.value.replace(/\D/g, "");
            this.idDigits[index] = value; // FIXED: removed this.$set

            if (value && index < 12)
            {
                this.$nextTick(() =>
                {
                    event.target.nextElementSibling?.focus();
                });
            }

            this.form.id_number = this.idDigits.join('');
        },

        onBackspace(index, event)
        {
            if (event.key === "Backspace" && !this.idDigits[index] && index > 0)
            {
                this.$nextTick(() =>
                {
                    event.target.previousElementSibling?.focus();
                });
            }
        },

        async submit()
        {
            try
            {
                if (this.form.old_password)
                {
                    const isPasswordCorrect = await this.validateOldPassword(this.form.old_password);
                    if (!isPasswordCorrect) {
                        alert('Incorrect current password');
                        return;
                    }
                }

                const response = await apiClient.put('/accountUpdate',
                {
                    full_name: this.form.full_name,
                    email: this.form.email,
                    mobile_number: this.form.mobile_number,
                    address: this.form.address,
                    username: this.form.username,
                    password: this.form.password, // optional
                    id_number: this.form.id_number,
                    office_name: this.form.office_name,
                    office_address: this.form.office_address,
                    position: this.form.position,
                });

                console.log("Successfully updated:", response.data);

                localStorage.setItem('full_name', this.form.full_name);
                localStorage.setItem('email', this.form.email);
                localStorage.setItem('mobile_number', this.form.mobile_number);
                localStorage.setItem('address', this.form.address);
                localStorage.setItem('username', this.form.username);
                localStorage.setItem('id_number', this.form.id_number);
                localStorage.setItem('office_name', this.form.office_name);
                localStorage.setItem('office_address', this.form.office_address);
                localStorage.setItem('position', this.form.position);

                window.location.href = '/my-account';
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