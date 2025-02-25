<template>

    <h1 class="page-title mb-0">PROFILE</h1>

    <div class="mt-4">

        <div class="row">

            <profile-component />

            <activity-component />

        </div>

    </div>

</template>
  
<script>
import ProfileComponent from "./content/profile.vue";
import ActivityComponent from "./content/activity.vue";
export default
{
    components:
    {
        ProfileComponent,
        ActivityComponent
    }
};
</script>

<style scoped>
.page-title {
    color: #007bff;
}
</style>
  