<template>
  <div class="home">
    <img src="@/assets/pikachu.png" alt="Pikachu" class="pikachu-image" />
    <h1 class="welcome-text">Welcome to Pokédex</h1>
    <p class="description-text">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </p>
    <router-link to="/pokemon-list" class="get-started-button"
      >Get started</router-link
    >
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.pikachu-image {
  width: 200px;
  height: 200px;
}

.welcome-text {
  font-weight: bold;
  font-size: 24px;
  margin-top: 20px;
}

.description-text {
  font-size: 16px;
  margin-top: 10px;
}

.get-started-button {
  margin-top: 20px;
  background-color: red;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
}
</style>
