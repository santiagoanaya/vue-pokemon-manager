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
.pokeball-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.8);
}

.loader {
  animation: spin 2s linear infinite;
  width: 100px;
  height: 100px;
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
