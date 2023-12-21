<template>
  <div class="no-matches">
    <h2>Uh-oh!</h2>
    <p>You look lost on your journey!</p>
    <v-btn @click="goBackHome">Go back home</v-btn>
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
</style>
