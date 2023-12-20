<template>
  <div>
    <SearchBar @search="updateSearchTerm" />
    <PokemonList :searchTerm="searchTerm" />
    <div class="buttons">
      <v-btn @click="showAllPokemons">Show All Pokemons</v-btn>
      <v-btn @click="showFavorites">Show Favorites</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SearchBar from '@/components/SearchBar.vue'
import PokemonList from '@/components/PokemonList.vue'

export default {
  data() {
    return {
      searchTerm: '',
    }
  },
  components: {
    SearchBar,
    PokemonList,
  },
  methods: {
    ...mapActions(['showAllPokemons', 'showFavorites']),
    updateSearchTerm(term) {
      this.searchTerm = term
    },
  },
}
</script>

<style>
.buttons {
  margin-top: 20px;
}
</style>
