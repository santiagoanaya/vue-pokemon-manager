<template>
  <v-list class="list-container">
    <v-list-item
      v-for="pokemon in filteredPokemons"
      :key="pokemon.name"
      @click="showDetails(pokemon)"
      class="px-2 pokemon-item"
      two-line
    >
      <v-list-item-content>
        <v-list-item-title class="pokemon-name">{{
          capitalizedName(pokemon.name)
        }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon
          @click.stop="toggleFavorite(pokemon)"
          :color="isFavorite(pokemon.id) ? 'orange' : 'grey'"
          size="44"
          class="grey lighten-2 rounded-circle"
        >
          mdi-star
        </v-icon>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
import '@mdi/font/css/materialdesignicons.css'

export default {
  props: {
    searchTerm: {
      type: String,
      default: '',
    },
    showOnlyFavorites: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isLoading', 'getPokemons', 'getFavorites']),
    searchTermLowercased() {
      return this.searchTerm.toLowerCase()
    },
    filteredBySearchTerm() {
      if (!this.searchTerm) return this.getPokemons
      return this.getPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchTermLowercased)
      )
    },
    filteredPokemons() {
      let filtered = this.filteredBySearchTerm

      if (this.searchTerm) {
        filtered = filtered.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      }

      if (this.showOnlyFavorites) {
        const favoriteIds = this.getFavorites.map((fav) => fav.id)
        filtered = filtered.filter((pokemon) =>
          favoriteIds.includes(pokemon.id)
        )
      }

      if (filtered.length === 0 && this.searchTerm) {
        this.$emit('no-matches-found')
      } else {
        this.$emit('matches-found')
      }
      return filtered
    },
  },
  methods: {
    toggleFavorite(pokemon) {
      this.$store.commit('toggleFavorite', pokemon)
    },
    isFavorite(pokemonId) {
      return this.$store.getters.isFavorite(pokemonId)
    },
    showDetails(pokemon) {
      this.$emit('show-details', pokemon)
    },
    capitalizedName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
  },
  watch: {
    filteredPokemons(newVal) {
      if (newVal.length === 0 && this.searchTerm) {
        this.$emit('no-matches-found')
      } else {
        this.$emit('matches-found')
      }
    },
  },
}
</script>

<style scoped>
.list-container {
  background-color: #f9f9f9 !important;
}
.pokemon-item {
  padding-left: 16px;
  padding-right: 16px;
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.pokemon-name {
  text-align: left;
  font-family: 'Lato', sans-serif;
  font-size: 22px;
}

.v-list-item-action {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
