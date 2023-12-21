<template>
  <div class="pokeball-loader" v-if="isLoading">
    <img src="@/assets/pokeball.png" alt="Loading" class="loader" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoading']),
  },
}
</script>

<style>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  animation: spin 2s linear infinite;
  width: 50px;
  height: 50px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
