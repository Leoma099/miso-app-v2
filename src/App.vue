<template>
    <div v-if="!isActive">

        <sidebar-component />

        <div class="main-wrapper">

            <header-component />

            <div class="main">
                <router-view />
            </div>
            
        </div>

    </div>

    <div v-else>

      <signin-component />

    </div>
</template>

<script>
import SidebarComponent from "@/views/layouts/sidebar";
import HeaderComponent from "@/views/layouts/header";

import SigninComponent from "@/views/pages/auth";

export default {
  components: {
    SidebarComponent,
    HeaderComponent,
    SigninComponent
  },
  data()
  {
    return{
      isActive: !localStorage.getItem('access_token'),
    }
  }
};
</script>
