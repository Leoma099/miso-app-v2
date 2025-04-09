<template>
    <div class="container py-4">
  
      <h1 class="mb-3">My Account</h1>
  
      <!-- Back Button (unchanged as requested) -->
      <router-link :to="'/'" class="btn btn-sm btn-secondary mb-4">
        ← Go back to homepage
      </router-link>
  
      <div class="col-12 col-md-8 mx-auto">
        <div class="card card-body shadow-sm border-0 rounded-4 p-3">
          <template v-if="user">
            <!-- Compact user info boxes -->
            <div
              v-for="(value, key) in displayFields"
              :key="key"
              class="info-box mb-2"
            >
              <label class="info-label">{{ key }}</label>
              <div class="info-value">{{ value || 'Not Provided' }}</div>
            </div>
  
            <button class="btn btn-outline-warning mt-3 w-100 btn-sm">
              Update Profile
            </button>
          </template>
  
          <div v-else class="text-center text-muted py-4">
            <div class="spinner-border text-warning mb-3" role="status"></div>
            <p>Loading your information. Please wait...</p>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: null
      };
    },
    computed: {
      displayFields() {
        if (!this.user) return {};
        return {
          "ID Number": this.user.id_number,
          "Full Name": this.user.full_name,
          "Mobile Number": this.user.mobile_number,
          "Department": this.user.office_name,
          "Office Address": this.user.office_address,
          "Position": this.user.position
        };
      }
    },
    created() {
      this.fetchUserData();
    },
    methods: {
      fetchUserData() {
        const user = {
          id_number: localStorage.getItem("id_number"),
          full_name: localStorage.getItem("full_name"),
          mobile_number: localStorage.getItem("mobile_number"),
          office_name: localStorage.getItem("office_name"),
          office_address: localStorage.getItem("office_address"),
          position: localStorage.getItem("position")
        };
  
        if (user.full_name) {
          this.user = user;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  
  .info-box {
    background: #f9f9f9;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 8px 12px;
  }
  
  .info-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: #d3dbe2;
    text-transform: uppercase;
    margin-bottom: 2px;
    display: block;
  }
  
  .info-value {
    font-size: 0.9rem;
    font-weight: 500;
    color: #212529;
  }
  
  .btn-sm {
    font-size: 0.875rem;
    padding: 4px 12px;
  }
  </style>
  