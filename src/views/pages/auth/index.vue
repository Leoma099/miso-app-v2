<template>

    <div class="animation animation-fade-in">

        <div :style="{
            'height': '100vh',
            'background-image': 'url(/assets/image/it-equipment.jpg)',
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
            'background-position': 'center',

            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
        }">

            <div class="container">

                <div class="login-image mb-3">
                    <img src="@/assets/images/sbma.png" class="img-fluid">
                </div>

                <div class="align-items-center box-area">

                    <div class="row border-0 rounded-5 p-3 bg-white shadow-sm">

                        <div class="col-md-6 rounded-5 left-box">
                            <div class="featured-image d-flex justify-content-center align-items-center">
                                <img src="@/assets/images/equipment-picture.png" class="img-fluid">
                            </div>
                        </div>

                        <div class="col-md-6 rounded-4 right-box" style="background: #007bff;">
                            <div class="mb-3">
                                <h2 class="text-center text-white">Welcome to e-MISO APP</h2>
                                <p class="text-center text-white">Please sign in to continue</p>
                            </div>
                            <div class="row align-items-center">
                                <div class="header-text mb-4">

                                    <form @submit.prevent="submit()">
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control box-input" placeholder="Username" v-model="form.username" required>
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="password" class="form-control box-input" placeholder="Password" v-model="form.password" required>
                                        </div>
                                        <div class="input-group">
                                            <button
                                                type="submit"
                                                class="btn button-signin w-100"
                                                :disabled="isLoading">
                                                <span v-if="!isLoading">Sign In</span>
                                                <span v-else>Sign in...</span>
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>

<script>
import axios from "axios";
export default
{
    data()
    {
        return {

            form:
            {
                username: "",
                password: "",
            },

            isLoading: false,

        }
    },

    methods:
    {
        async submit()
        {
            this.isLoading = true;

            try
            {
                const response = await axios.post('http://127.0.0.1:8000/api/login', this.form);
                
                localStorage.setItem('access_token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('name', response.data.name); // Now correctly stored
                localStorage.setItem("user_id", response.data.id); // Now correctly stored
                
                window.location.href = '/';
            }
            catch (error)
            {
                console.error('Login failed:', error);
                this.isLoading = false;
            }
        }
    }
}
</script>

<style scoped>
.animation
{
    animation-duration: 1s;
    animation-fill-mode: none;
}
.animation-fade-in
{
    animation-name: fadeIn;
}

@keyframes fadeIn{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; /* Stack the logo and form */
}
.box-area {
    width: 930px;
}
.right-box {
    padding: 40px;
}
.button-signin {
    border: 2px solid #ffffff;
    color: #ffffff;
    transition: all 0.2s ease-in-out;
}
.button-signin:hover {
    background: #ffffff;
    color: #007bff;
    font-weight: 600;
}
.login-image {
    width: 400px;
    overflow: hidden;
    text-align: center;
    margin: 0 auto; /* Centers the div */
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-image img {
    width: 100%;
    object-fit: cover;
}
</style>