<template>

    <div class="animate animate-fade-in">

        <h1 class="page-title mb-0">Edit Borrow Equipment</h1>
        <router-link
            :to="'/management/borrow'">
            Back to page
        </router-link>

        <main-component v-if="$route.meta.subPage === 'main'" />

    </div>

</template>

<script>
import MainComponent from "./main";
export default
{
    name: 'Edit',

    components:
    {
        MainComponent
    }
}
</script>

<style scoped>
.animate
{
    animation-duration: 1s;
    animation-fill-mode: none;
}
.animate-fade-in
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
.page-title {
    color: #007bff;
}
</style>