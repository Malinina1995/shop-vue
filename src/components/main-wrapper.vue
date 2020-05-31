<template>
    <div class="main-wrapper">
        <v-header/>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import vHeader from "./layouts/header";

    export default {
        name: "main-wrapper",
        components: {
            vHeader
        },
    }
</script>

<style>
    .main-wrapper {
        max-width: 900px;
        margin: 0 auto;
    }
</style>
