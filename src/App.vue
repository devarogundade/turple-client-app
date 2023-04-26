<template>
  <RouterView />
</template>


<script>
import Authentication from './scripts/Authentication';

export default {
  created() {
    Authentication.initialize()
  }
}
</script>