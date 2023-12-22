import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PokemonList from '@/components/PokemonList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('PokemonList.vue', () => {
  let store
  let getters

  beforeEach(() => {
    getters = {
      getPokemons: () => [
        {
          name: 'Pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon/25/',
          id: 1,
        },
      ],
      getFavorites: () => [
        {
          name: 'Charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/6/',
          id: 2,
        },
      ],
      isFavorite: () => jest.fn().mockImplementation((id) => id === 2),
    }

    store = new Vuex.Store({
      getters,
    })
  })

  it('renders pokemon list from store', () => {
    const wrapper = shallowMount(PokemonList, {
      store,
      localVue,
      propsData: { showOnlyFavorites: false },
    })
    expect(wrapper.text()).toContain('Pikachu')
  })

  it('renders only favorite pokemons when showOnlyFavorites is true', () => {
    const wrapper = shallowMount(PokemonList, {
      store,
      localVue,
      propsData: { showOnlyFavorites: true },
    })
    expect(wrapper.text()).toContain('Charizard')
    expect(wrapper.text()).not.toContain('Pikachu')
  })
})
