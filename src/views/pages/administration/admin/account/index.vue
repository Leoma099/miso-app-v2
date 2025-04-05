<template>

    <div class="animate animate-fade-in">

        <list-component v-if="$route.meta.page === 'list'" />

    </div>

</template>

<script>
import ListComponent from "./list";
export default
{
    components:
    {
        ListComponent,
    }
}
</script>

<style>

</style>