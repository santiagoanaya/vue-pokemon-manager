import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    pokemons: [
      { id: 1, name: 'Pikachu' },
      { id: 2, name: 'Charizard' },
      { id: 3, name: 'Bulbasaur' },
      // pokemons
    ],
    favorites: [],
  },
  getters: {
    isLoading(state) {
      return state.loading
    },
    isFavorite: (state) => (pokemonId) => {
      return state.favorites.some((pokemon) => pokemon.id === pokemonId)
    },
    getPokemons: (state) => state.pokemons,
    getFavorites: (state) => state.favorites,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setFavorite(state, payload) {
      state.favorites.push(payload)
    },
    toggleFavorite(state, pokemon) {
      const index = state.favorites.findIndex((p) => p.id === pokemon.id)
      if (index >= 0) {
        state.favorites.splice(index, 1)
      } else {
        state.favorites.push(pokemon)
      }
    },
  },
  actions: {},
  modules: {},
})
