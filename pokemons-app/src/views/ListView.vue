<template>
  <div>
    <SearchBar @search="updateSearchTerm" />
    <PokemonList
      :searchTerm="searchTerm"
      :pokemons="filteredPokemons"
      :showOnlyFavorites="showOnlyFavorites"
    />
    <div class="buttons">
      <v-btn @click="showAllPokemons">Show All Pokemons</v-btn>
      <v-btn @click="showFavorites">Show Favorites</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import SearchBar from '@/components/SearchBar.vue'
import PokemonList from '@/components/PokemonList.vue'

export default {
  data() {
    return {
      searchTerm: '',
      showOnlyFavorites: false,
    }
  },
  components: {
    SearchBar,
    PokemonList,
  },
  computed: {
    ...mapGetters(['getPokemons', 'getFavorites']),
    filteredPokemons() {
      return this.showOnlyFavorites ? this.getFavorites : this.getPokemons
    },
  },
  methods: {
    ...mapActions(['showAllPokemons', 'showFavorites']),
    updateSearchTerm(term) {
      this.searchTerm = term
    },
    showAllPokemons() {
      this.showOnlyFavorites = false
    },
    showFavorites() {
      this.showOnlyFavorites = true
    },
  },
}
</script>

<style>
.buttons {
  margin-top: 20px;
}
</style>
