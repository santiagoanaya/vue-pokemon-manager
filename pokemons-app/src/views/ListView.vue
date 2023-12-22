<template>
  <div>
    <v-container class="list-container">
      <v-row>
        <v-col>
          <SearchBar @search="updateSearchTerm" v-show="!isLoading" />
          <PokeballLoader v-if="isLoading" />
          <PokemonList
            v-show="showContent"
            :searchTerm="searchTerm"
            :showOnlyFavorites="showOnlyFavorites"
            @show-details="handleShowDetails"
            @no-matches-found="showNoMatchesMessage = true"
            @matches-found="showNoMatchesMessage = false"
          />
          <NoMatchesMessage
            v-show="showNoMatchesMessage"
            @go-back-home="goBackHome"
          />
        </v-col>
      </v-row>
    </v-container>
    <div class="bottom-navigation-container">
      <v-bottom-navigation v-show="showContent" class="bottom-navigation">
        <v-chip
          class="bottom-nav-button"
          :color="allPokemonsButtonColor"
          text-color="white"
          @click="showAllPokemons"
        >
          <v-icon left size="24" color="white"
            >mdi-format-list-bulleted-square</v-icon
          >
          All
        </v-chip>
        <v-chip
          class="bottom-nav-button"
          :color="favoritesButtonColor"
          text-color="white"
          @click="showFavorites"
        >
          <v-icon left size="24" color="white">mdi-star</v-icon>
          Favorites
        </v-chip>
      </v-bottom-navigation>
    </div>
    <v-dialog v-model="isModalOpen" max-width="290">
      <DetailView @close="isModalOpen = false" />
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import SearchBar from '@/components/SearchBar.vue'
import PokemonList from '@/components/PokemonList.vue'
import DetailView from '@/components/DetailModal.vue'
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
  components: {
    SearchBar,
    PokemonList,
    DetailView,
    NoMatchesMessage,
    PokeballLoader,
  },
  computed: {
    ...mapGetters(['isLoading', 'getPokemons', 'getFavorites']),
    filteredPokemons() {
      return this.showOnlyFavorites ? this.getFavorites : this.getPokemons
    },
    showContent() {
      return !this.showNoMatchesMessage && !this.isLoading
    },
    allPokemonsButtonColor() {
      return this.showOnlyFavorites ? 'grey lighten-1' : 'red lighten-1'
    },
    favoritesButtonColor() {
      return this.showOnlyFavorites ? 'red lighten-1' : 'grey lighten-1'
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
.bottom-navigation-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.bottom-navigation {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}

.bottom-nav-button {
  margin-right: 8px;
  font-size: 18px !important;
  font-family: 'Lato', sans-serif;
  color: white;
  padding: 10px 20px !important;
}

.list-container {
  padding-bottom: 30px !important;
}
</style>
