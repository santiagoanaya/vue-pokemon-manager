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
          <v-icon @click="toggleFavorite(pokemon)">
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
    pokemons: {
      type: Array,
      required: true,
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
    ...mapGetters(['isLoading']),
    filteredPokemons() {
      let filtered = this.pokemons

      if (this.searchTerm) {
        filtered = filtered.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      }

      if (this.showOnlyFavorites) {
        filtered = filtered.filter((pokemon) => this.isFavorite(pokemon.id))
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
  },
}
</script>
