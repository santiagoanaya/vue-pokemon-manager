<template>
  <div class="pokeball-loader" v-if="isLoading">
    <img src="@/assets/pokeball.png" alt="Loading" />
  </div>
</template>

<script>
export default {
  name: 'PokeballLoader',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.pokeball-loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* Style for the loader image (optional) */
.pokeball-loader img {
  width: 50px; /* Adjust size as needed */
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>