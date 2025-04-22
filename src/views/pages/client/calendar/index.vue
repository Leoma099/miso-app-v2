<template>

    <div class="animation animation-fade-in">

        <list-component v-if="$route.meta.page === 'list'"/>
        <view-component v-if="$route.meta.page === 'view'"/>

    </div>

</template>

<script>
import ListComponent from "./content/list";
import ViewComponent from "./content/view";
export default
{
    components:
    {
        ListComponent,
        ViewComponent
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
</style>