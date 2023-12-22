import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import storeConfig from '@/store'
import axios from 'axios'

jest.mock('axios')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store', () => {
  it('fetchPokemons action fetches data when store is empty', async () => {
    const data = {
      results: [
        { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
      ],
    }
    axios.get.mockResolvedValue({ data })

    const store = new Vuex.Store(storeConfig)
    await store.dispatch('fetchPokemons')

    expect(store.state.pokemons).toEqual(data.results)
  })

  it('fetchPokemons action does not fetch data if store already has data', async () => {
    const existingData = [
      { name: 'Eevee', url: 'https://pokeapi.co/api/v2/pokemon/133/' },
    ]
    const store = new Vuex.Store({
      ...storeConfig,
      state: { pokemons: existingData },
    })
    await store.dispatch('fetchPokemons')

    expect(store.state.pokemons).toEqual(existingData)
    expect(axios.get).not.toHaveBeenCalled()
  })

  it('fetchPokemons action handles API call failure', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'))

    const store = new Vuex.Store(storeConfig)
    await store.dispatch('fetchPokemons')

    expect(store.state.pokemons).toEqual([])
  })
})
