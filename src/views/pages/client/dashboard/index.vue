<template>

    <div class="animation animation-fade-in">

        <div class="d-flex justify-content-between align-items-center">
            <h1 class="page-title mb-0">DASHBOARD</h1>
        </div>

        <div class="mt-3">

            <key-perfomance-indicator />
            
        </div>

    </div>

</template>

<script>
import KeyPerfomanceIndicator from "./content/key-performance-indicator.vue";
export default
{
    components:
    {
        KeyPerfomanceIndicator,
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
.page-title{
    color: #007bff;
}
</style>