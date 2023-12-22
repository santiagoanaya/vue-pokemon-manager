<template>
  <div class="no-matches">
    <h1 class="font-lato">Uh-oh!</h1>
    <p class="text-h6 font-lato">You look lost on your journey!</p>
    <v-chip
      text
      class="bottom-nav-button"
      color="red lighten-1"
      text-color="white"
      @click="goBackHome"
      >Go back home</v-chip
    >
  </div>
</template>

<script>
export default {
  methods: {
    goBackHome() {
      this.$emit('go-back-home')
    },
  },
}
</script>

<style>
.no-matches {
  text-align: center;
}
.bottom-nav-button {
  margin-right: 8px;
  font-size: 18px !important;
  font-family: 'Lato', sans-serif;
  color: white;
  padding: 10px 20px !important;
}
</style>
