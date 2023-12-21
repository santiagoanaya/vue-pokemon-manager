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
    async fetchPokemons({ commit, state }) {
      if (state.pokemons.length > 0) {
        return
      }
      commit('setLoading', true)
      console.log(state.loading)
      try {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5')
        let data = await response.json()
        let pokemonsWithId = data.results.map((pokemon) => ({
          ...pokemon,
          id: Number(pokemon.url.split('/').filter(Boolean).pop()), // id from url
        }))
        commit('setPokemons', pokemonsWithId)
      } catch (error) {
        this.$toast.error('Error fetching Pokémon data:', error)
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchPokemonDetails({ commit, state }, pokemon) {
      const pokemonName = pokemon.name
      if (state.pokemonDetails[pokemonName]) {
        commit('setSelectedPokemon', state.pokemonDetails[pokemonName])
        return
      }

      commit('setLoading', true)
      console.log(state.loading)
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        )
        const data = await response.json()
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
