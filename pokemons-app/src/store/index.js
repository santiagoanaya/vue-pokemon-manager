import Vue from 'vue'
import Vuex from 'vuex'
import * as pokemonService from '@/services/pokemonService'

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
    getPokemons: (state) => {
      return state.pokemons
    },
    getFavorites: (state) => {
      return state.favorites
    },
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setFavorite(state, payload) {
      state.favorites.push(payload)
    },
    toggleFavorite(state, pokemon) {
      const index = state.favorites.findIndex((fav) => fav.id === pokemon.id)
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
    setPokemonDetail(state, { name, detail }) {
      Vue.set(state.pokemonDetails, name, detail)
    },
  },
  actions: {
    initializeStore({ dispatch }) {
      dispatch('fetchPokemons')
    },
    async fetchPokemons({ commit, state }) {
      if (state.pokemons.length > 0) {
        // this can be deleted if i make a next button to call more pokemons
        return
      }
      commit('setLoading', true)
      try {
        const pokemonsWithId = await pokemonService.fetchPokemons()
        commit('setPokemons', pokemonsWithId)
      } catch (error) {
        this.$toast.error('Error fetching Pokémon data', error)
      } finally {
        setTimeout(() => {
          commit('setLoading', false)
        }, 10000)
      }
    },
    async fetchPokemonDetails({ commit, state }, pokemon) {
      const pokemonName = pokemon.name
      if (state.pokemonDetails[pokemonName]) {
        commit('setSelectedPokemon', state.pokemonDetails[pokemonName])
        return
      }

      commit('setLoading', true)
      try {
        const data = await pokemonService.fetchPokemonDetails(pokemonName)
        commit('setPokemonDetail', { name: pokemonName, detail: data })
        commit('setSelectedPokemon', data)
      } catch (error) {
        this.$toast.error('Error fetching Pokémon details:', error)
      } finally {
        commit('setLoading', false)
      }
    },
  },
  modules: {},
})
