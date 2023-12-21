<template>
  <div>
    <v-list>
      <v-list-item
        v-for="pokemon in filteredPokemons"
        :key="pokemon.name"
        @click="showDetails(pokemon)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ pokemon.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click.stop="toggleFavorite(pokemon)">
            {{ isFavorite(pokemon.id) ? 'mdi-star' : 'mdi-star-outline' }}
          </v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
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
    filteredPokemons() {
      let filtered = this.getPokemons

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

      return filtered
    },
  },
  methods: {
    toggleFavorite(pokemon) {
      this.$store.commit('toggleFavorite', pokemon)
      // this.$toast.success(
      //   `${this.isFavorite(pokemon) ? 'Added to' : 'Removed from'} favorites!`
      // )
    },
    isFavorite(pokemonId) {
      return this.$store.getters.isFavorite(pokemonId)
    },
    showDetails(pokemon) {
      this.$emit('show-details', pokemon)
    },
  },
}
</script>
