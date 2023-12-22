<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('initializeStore')
  },
}
</script>

<style>
#app {
  margin-top: 20px;
  background-color: #f9f9f9;
}
</style>
