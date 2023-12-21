import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    pokemons: [],
    favorites: [],
    selectedPokemon: null,
    pokemonDetails: {}, // cache for pokemon details
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
    setPokemons(state, pokemons) {
      state.pokemons = pokemons
    },
    setSelectedPokemon(state, pokemon) {
      state.selectedPokemon = pokemon
    },
    setPokemonDetail(state, { id, detail }) {
      Vue.set(state.pokemonDetails, id, detail)
    },
  },
  actions: {
    async fetchPokemons({ commit, state }) {
      if (state.pokemons.length > 0) {
        return
      }
      try {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        let data = await response.json()
        commit('setPokemons', data.results)
      } catch (error) {
        console.error('Error fetching Pokémon data:', error)
      }
    },
    async fetchPokemonDetails({ commit, state }, pokemon) {
      if (state.pokemonDetails[pokemon.name]) {
        // check if the pokemon was already fetched
        commit('setSelectedPokemon', state.pokemonDetails[pokemon.name])
        return
      }

      commit('setLoading', true)
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        )
        const data = await response.json()
        commit('setPokemonDetail', { name: pokemon.name, detail: data })
        commit('setSelectedPokemon', data)
      } catch (error) {
        console.error('Error fetching Pokémon details:', error)
      } finally {
        commit('setLoading', false)
      }
    },
  },
  modules: {},
})
