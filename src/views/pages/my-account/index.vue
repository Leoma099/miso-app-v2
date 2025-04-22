<template>

    <h1>My Account</h1>

    <router-link :to="'/'">Go back to page</router-link>

    <div class="mt-3">

        <div class="col-6 mx-auto">

            <div class="card card-body shadow-sm border-0">
                <h3 class="page-title">Account Info</h3>
                <div>
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 me-3">ID NUMBER:</h5>
                        <p class="mb-0">{{ user.id_number }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 me-3">FULL NAME:</h5>
                        <p class="mb-0">{{ user.full_name }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 me-3">DEPARTMENT:</h5>
                        <p class="mb-0">{{ user.office_name }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 me-3">POSITION:</h5>
                        <p class="mb-0">{{ user.position }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 me-3">OFFICE ADDRESS:</h5>
                        <p class="mb-0">{{ user.office_address }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 me-3">ADDRESS:</h5>
                        <p class="mb-0">{{ user.address }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 me-3">EMAIL:</h5>
                        <p class="mb-0">{{ user.email }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 me-3">MOBILE NUMBER:</h5>
                        <p class="mb-0">{{ user.mobile_number }}</p>
                    </div>
                </div>
                <hr>
                <h3 class="page-title">System Info</h3>
                <div>
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 me-3">USERNAME:</h5>
                        <p class="mb-0">{{ user.username }}</p>
                    </div>
                </div>

                <button
                    class="btn btn-outline-warning mt-3 rounded-0"
                    data-bs-toggle="modal"
                    data-bs-target="#updateProfile">
                    Update Profile
                </button>
            </div>

        </div>

    </div>

    <update-modal />

</template>
<script>
import UpdateModal from "./components/update.vue";
export default
{
    data()
    {
        return{
            user: null
        }
    },

    components:
    {
        UpdateModal
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
                username: localStorage.getItem('username'),
                address: localStorage.getItem('address'),
            };

            if(user.full_name)
            {
                this.user = user
            }
        }
    }

}
</script>

<style scoped>
.page-title
{
    color: #007bff;
}
</style>