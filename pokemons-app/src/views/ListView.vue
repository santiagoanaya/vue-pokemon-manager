<template>
  <div>
    <SearchBar @search="updateSearchTerm" />
    <PokemonList
      :searchTerm="searchTerm"
      :showOnlyFavorites="showOnlyFavorites"
      @show-details="handleShowDetails"
    />
    <v-dialog v-model="isModalOpen" persistent max-width="290">
      <DetailView @close="isModalOpen = false" />
    </v-dialog>
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
import DetailView from '@/components/DetailView.vue'

export default {
  data() {
    return {
      searchTerm: '',
      showOnlyFavorites: false,
      isModalOpen: false,
      selectedPokemonId: null,
    }
  },
  created() {
    this.$store.dispatch('fetchPokemons')
  },
  components: {
    SearchBar,
    PokemonList,
    DetailView,
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
    handleShowDetails(pokemon) {
      this.$store.dispatch('fetchPokemonDetails', pokemon)
      this.isModalOpen = true
    },
  },
}
</script>

<style>
.buttons {
  margin-top: 20px;
}
</style>
