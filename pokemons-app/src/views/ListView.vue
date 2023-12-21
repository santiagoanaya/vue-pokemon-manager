<template>
  <div>
    <SearchBar @search="updateSearchTerm" />
    <PokeballLoader />
    <PokemonList
      v-if="!showNoMatchesMessage"
      :searchTerm="searchTerm"
      :showOnlyFavorites="showOnlyFavorites"
      @show-details="handleShowDetails"
      @no-matches-found="showNoMatchesMessage = true"
      @matches-found="showNoMatchesMessage = false"
    />
    <NoMatchesMessage v-if="showNoMatchesMessage" @go-back-home="goBackHome" />
    <v-dialog v-model="isModalOpen" persistent max-width="290">
      <DetailView @close="isModalOpen = false" />
    </v-dialog>
    <div class="buttons" v-if="!showNoMatchesMessage">
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
import NoMatchesMessage from '@/components/NoMatchesMessage.vue'
import PokeballLoader from '@/components/PokeballLoader.vue'

export default {
  data() {
    return {
      searchTerm: '',
      showOnlyFavorites: false,
      isModalOpen: false,
      selectedPokemonId: null,
      showNoMatchesMessage: false,
    }
  },
  created() {
    this.$store.dispatch('fetchPokemons')
  },
  components: {
    SearchBar,
    PokemonList,
    DetailView,
    NoMatchesMessage,
    PokeballLoader,
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
      this.showNoMatchesMessage = false
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
    goBackHome() {
      this.showNoMatchesMessage = false
      this.$router.push('/home')
    },
  },
}
</script>

<style>
.buttons {
  margin-top: 20px;
}
</style>
