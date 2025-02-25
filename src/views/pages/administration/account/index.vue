<template>

    <div class="animate animate-fade-in">

        <list-component v-if="$route.meta.page === 'list'" />
        <view-component v-if="$route.meta.page === 'view'"/>
        <create-component v-if="$route.meta.page === 'create'"/>
        <edit-component v-if="$route.meta.page === 'edit'"/>

    </div>

</template>

<script>
import ListComponent from "./content/list";
import CreateComponent from "./content/create";
export default
{
    components:
    {
        ListComponent,
        CreateComponent
    }
}
</script>

<style>

</style>