<template>

    <h1>My Account</h1>

    <router-link :to="'/'">Go back to page</router-link>

    <div class="mt-3">

        <!-- <div class="row">

            <div class="col-md-4">



            </div>

            <div class="col-md-8">

                <div class="card card-body shadow-sm rounded-0 border-0">
                    <h3>Activity</h3>

                    <div class="mt-3">
                        <d class="text-center">
                            <p>No activity</p>
                        </d>
                    </div>
                </div>

            </div>

        </div> -->

        <div class="col-6 mx-auto">

            <div class="card card-body shadow-sm border-0">
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
                        <h5 class="mb-0 me-3">MOBILE NUMBER:</h5>
                        <p class="mb-0">{{ user.mobile_number }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 me-3">DEPARTMENT:</h5>
                        <p class="mb-0">{{ user.office_name }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 me-3">OFFICE ADDRESS:</h5>
                        <p class="mb-0">{{ user.office_address }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 me-3">POSITION:</h5>
                        <p class="mb-0">{{ user.position }}</p>
                    </div>
                </div>

                <button
                    class="btn btn-outline-warning mt-3">
                    Update Profile
                </button>
            </div>

        </div>

    </div>

</template>
<script>
export default
{
    data()
    {
        return{
            user: null
        }
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
                position: localStorage.getItem('position')
            };

            if(user.full_name)
            {
                this.user = user
            }
        }
    }

}
</script>