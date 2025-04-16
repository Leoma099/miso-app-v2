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
                                        
                                        <!-- PASSWORD FIELD WITH SHOW PASSWORD -->
                                        <div class="input-group mb-3">
                                            <input 
                                                :type="showPassword ? 'text' : 'password'" 
                                                class="form-control box-input" 
                                                placeholder="Password" 
                                                v-model="form.password"
                                                autocomplete="on"
                                                required>
                                            <button 
                                                type="button" 
                                                class="btn btn-secondary" 
                                                @click="showPassword = !showPassword">
                                                <i :class="showPassword ? 'bx bx-low-vision' : 'bx bx-show'"></i>
                                            </button>
                                        </div>

                                        <div class="input-group">
                                            <button
                                                type="submit"
                                                class="btn button-signin w-100"
                                                :disabled="isLoading">
                                                <span v-if="!isLoading">Sign In</span>
                                                <span v-else>Signing in...</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> <!-- col-md-6 -->
                    </div> <!-- row -->
                </div> <!-- box-area -->
            </div> <!-- container -->
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/index";
export default {
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            isLoading: false,
            showPassword: false, // ✅ Added for toggling password visibility
        };
    },
    methods: {
        async submit() {
            this.isLoading = true;
            try {
                const response = await apiClient.post('/login', this.form);
                localStorage.setItem('access_token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem("user_id", response.data.id);

                // ACCOUNT INFO
                localStorage.setItem("account", response.data.account ? response.data.account.id : "");
                localStorage.setItem('full_name', response.data.full_name);
                localStorage.setItem('id_number', response.data.id_number);
                localStorage.setItem('office_name', response.data.office_name);
                localStorage.setItem('office_address', response.data.office_address);
                localStorage.setItem('position', response.data.position);
                localStorage.setItem('mobile_number', response.data.mobile_number);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('address', response.data.address);
                window.location.href = '/';
            } catch (error) {
                console.error('Login failed:', error);
                this.isLoading = false;
            }
        }
    }
};
</script>

<style scoped>
.animation {
    animation-duration: 1s;
    animation-fill-mode: none;
}
.animation-fade-in {
    animation-name: fadeIn;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-image img {
    width: 100%;
    object-fit: cover;
}
</style>
