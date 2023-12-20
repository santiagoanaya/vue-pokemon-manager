<template>
  <div>
    <v-list>
      <v-list-item v-for="pokemon in filteredPokemons" :key="pokemon.id">
        <v-list-item-content>
          <v-list-item-title>{{ pokemon.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click="toggleFavorite(pokemon)">
            {{ isFavorite(pokemon) ? 'mdi-star' : 'mdi-star-outline' }}
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
  },
  data() {
    return {
      pokemons: [
        { id: 1, name: 'Pikachu' },
        { id: 2, name: 'Charizard' },
        { id: 3, name: 'Bulbasaur' },
        // pokemones
      ],
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    filteredPokemons() {
      return this.searchTerm
        ? this.pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        : this.pokemons
    },
  },
  methods: {
    toggleFavorite(pokemon) {
      this.$store.commit('toggleFavorite', pokemon)
    },
    isFavorite(pokemon) {
      return this.$store.getters.isFavorite(pokemon)
    },
  },
}
</script>
