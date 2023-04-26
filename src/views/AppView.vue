<template>
    <div>
        <AppHeader :userAddress="userAddress"  v-on:connected="userAddress = $event" />
        <RouterView :userAddress="userAddress" />

        <SnackBar />
    </div>
</template>

<script setup>
import SnackBar from '../components/SnackBar.vue';
import AppHeader from '../components/app/AppHeader.vue';
</script>

<script>
export default {
    data() {
        return {
            userAddress: null
        };
    },
    components: { SnackBar }
}
</script>