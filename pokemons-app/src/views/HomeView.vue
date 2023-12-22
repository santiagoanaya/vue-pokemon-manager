<template>
  <div class="home">
    <img src="@/assets/logo.png" alt="Pikachu" class="pikachu-image" />
    <h1 class="font-weight-bold font-lato mt-6">Welcome to Pokédex</h1>
    <p class="text-h6 font-lato mt-4">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </p>
    <v-chip
      class="bottom-nav-button"
      color="red lighten-1"
      text-color="white"
      @click="goToPokemonList"
      >Get started</v-chip
    >
  </div>
</template>

<script>
export default {
  methods: {
    goToPokemonList() {
      this.$router.push('/pokemon-list')
    },
  },
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.bottom-nav-button {
  margin-right: 8px;
  font-size: 18px !important;
  font-family: 'Lato', sans-serif;
  color: white;
  padding: 10px 20px !important;
}

.pikachu-image {
  width: 200px;
  height: 200px;
}
</style>
