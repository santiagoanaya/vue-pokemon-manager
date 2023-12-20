import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    favorites: [],
  },
  getters: {
    isLoading(state) {
      return state.loading
    },
    isFavorite: (state) => (id) => {
      return state.favorites.includes(id)
    },
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setFavorite(state, payload) {
      state.favorites.push(payload)
    },
  },
  actions: {},
  modules: {},
})
