<template>

    <div class="animation animation-fade-in">

        <h1 class="mb-0">USER</h1>

    </div>

</template>

<script>
export default
{
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
</style>